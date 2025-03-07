# Importación de librerias
import ast
import os
import re
import warnings
from dataclasses import dataclass
from time import sleep

import pandas as pd
from dotenv import dotenv_values, load_dotenv
from groq import Groq
from tqdm import tqdm

load_dotenv()

API_KEY = os.getenv("MY_KEY")


# Inicio de la clase
@dataclass(slots=True)
class getNames:
    """Clase para obtener el string de varios archivos .java y pasarlos a un modelo LLM
    para obtener los mejores nombres de cada código

    Returns:
        None: None
    """

    path: str
    model: str

    def getCode(self) -> pd.DataFrame:
        """Función para acceder a un directorio (repositorio) que contiene codigo java

        Returns:
            pd.DataFrame: DataFrame que contiene el indice y el contenido de los archivos .java
        """
        code_list = list()

        for dirpath, _, files in os.walk(self.path):  # Iteramos el directorio principal
            for file_name in files:
                if "." in file_name:  # se comprueba que no sea un direcotrio
                    extention = file_name.split(".")[
                        -1
                    ]  # Sacamos la extención para ver si es un archivo java
                    if extention == "java":
                        with (
                            open(
                                file=os.path.join(dirpath, file_name),
                                mode="r",
                                encoding="utf-8",
                            ) as java_file
                        ):  # Leemos el archivo java para obtener el texto y lo almacenamos en una lista
                            code_list.append(java_file.read())

        codigo_dict = {key: value for key, value in enumerate(code_list)}

        return pd.DataFrame(
            codigo_dict.items(),
            columns=["Identificador", "Codigo_java"],
        )  # Retornamos el DataFrame

    def cleanDict(self, item: str) -> dict:
        """Función para transformar la respuesta del modelo que viene en formato markdown a un
        diccionario de python con el que se pueda trabajar posteriormente.

        Args:
            item (str): Respuesta del modelo en formato str de python, dentro contiene un
            diccionario en formato markdown

        Returns:
            dict: Diccionario donde la llave es el nombre de la clase, metodo ó variables del
            código y el valor nuevo es el que el modelo propuso.
        """

        r = re.sub(r"```|python|\n", "", item)

        if (
            "=" in r
        ):  # if para comprobar si la respuesta proviene de deepseek ya que retorna el diccionario asignado en una variable
            r = r.split("=")[-1]

        return ast.literal_eval(
            r
        )  # esto transforma una cadena a un typo de dato de python

    def chatGroq(self, df_codigo: pd.DataFrame) -> pd.DataFrame:
        """Función en la que se crea una petición a un modelo especifico de llm
        y la respuesta se almacena en una nueva columna donde se guardan una lista
        de diccionarios con los nombres anteriores y los nuevos

        Args:
            df_codigo (pd.DataFrame): DataFrame que contiene el código leido de un directorio

        Returns:
            pd.DataFrame: Retorna el mismo DataFrame con una columna nueva que es la sugerencia de nombres del modelo
        """
        missing = list()

        client = Groq(api_key=API_KEY)

        warnings.filterwarnings(
            "ignore"
        )  # Ignoramos los futuros warnigns para tener una salida más limpia

        # Asegurar que la columna 'Sugerencias' pueda contener listas
        df_codigo["Sugerencias"] = None
        df_codigo["Sugerencias"] = df_codigo["Sugerencias"].astype(object)

        # Iteramos el dataframe
        for index, _ in tqdm(df_codigo.iterrows(), total=df_codigo.shape[0]):
            aux = list()
            for item in ["la clase", "los metodos", "las variables"]:
                try:
                    completition = client.chat.completions.create(
                        model=self.model,
                        messages=[
                            {
                                "role": "user",
                                "content": f"Dame un diccionario de python donde las claves sean los nombres actuales\
                                    de {item} en el código {df_codigo.loc[index, 'Codigo_java']}, y los valores sean sus mejores nombres. No \
                                    expliques nada, que las variables sigan la convención CammelCase y en ingles.",
                            }
                        ],
                        temperature=0.76,
                        max_completion_tokens=1024,
                        top_p=1,
                        stream=True,
                        stop=None,
                    )

                    response = "".join(
                        chunk.choices[0].delta.content or "" for chunk in completition
                    )

                    if self.model.startswith("deepseek"):
                        # Si el modelo es deepseek quitamos una parte de la respuesta ya que explica su respuesta paso a paso
                        response = re.split(pattern=r"</think>", string=response)[1]

                    response = self.limpiar_dict(response)
                    aux.append(response)

                    sleep(5)

                except Exception as e:
                    print(f"Error en el indice {index} error: {e}")
                    missing.append(
                        index
                    )  # guardamos los indices que por tamaño o algún error al procesar la salida no se guardo
                    pass

            # Guardar la lista de sugerencias en la nueva columna
            df_codigo.at[index, "Sugerencias"] = aux

        return df_codigo, missing

    def mergeCodeAndNames(self, df_code: pd.DataFrame, pathFile: str) -> None:
        """Función que utiliza el DataFrame que retorna la función del chat con Groq
        y modifica el código a raiz del nombre sugerido por el LLM y los almacena en disco
        como archivo final para pasarlo a la red neuronal

        Args:
            df_code (pd.DataFrame): Dataframe que contiene las columnas de codigo, nombres sugeridos
            pathFile (str): Path donde se va a guardar el archivo resultante de esta función
        """
        listNames = [
            "Clase",
            "Métodos",
            "Variables",
        ]  # lista con el typo de nombre que se solicito al modelo

        # Variable para almacenar codigo bueno y malo
        saveDicts = list()

        # Obtención del codigo bueno y malo
        for index, row in df_code.iterrows():
            actual = df_code.loc[index, "Sugerencias"]
            if len(actual) > 0:
                indice = 0  # Indice para recorrer a listNames
                for item in actual:
                    for key, value in item.items():
                        try:
                            # Se crea una variable con los nombres nuevos proporcionados por el LLM
                            codigo = re.sub(
                                pattern=rf"{key}",
                                repl=value,
                                string=df_code.loc[index, "Codigo_java"],
                            )

                            # Se crea un diccionario con las columnas finales y como es el valor correcto se pasa el valor true en la ultima columan
                            codigo_bueno = {
                                "codigo": codigo,
                                "suggested_name": value,
                                "type": listNames[indice],
                                "is_correct": True,
                            }

                            # Se guarda el diccionario en una lista
                            saveDicts.append(codigo_bueno)
                        except Exception as e:
                            print(f"Error en el indice: {index}, por: {e}")
                            pass

                        # Se guarda un diccionario con el código malo, en la ultima columna se pasa el valor False
                        codigo_malo = {
                            "codigo": df_code.loc[index, "Codigo_java"],
                            "suggested_name": key,
                            "type": listNames[indice],
                            "is_correct": False,
                        }

                        # Se guarda el diccionario del código malo en la misma lista
                        saveDicts.append(codigo_malo)

                    indice += 1

        # Se obtiene una lista de dataframes para después crear uno solo
        df_list = [pd.DataFrame([item_dict]) for item_dict in saveDicts]

        # Se guarda el archivo csv en la ruta especificada por el usuario
        pd.concat(df_list).to_csv(
            path_or_buf=pathFile,
            encoding="utf-8",
            index=False,
            sep=",",
        )

    def saveMissingValues(self, missingValues: list) -> None:
        """Función que sirve para monitorear que indices fallaron al momento
        de hacer la petición a los modelos LLM que proporciona el API

        Args:
            missingValues (list): Lista que contiene los indices que fallaron al realizar la petición al LLM
        """
        if os.path.exists("./faltantes.txt"):
            with open("./faltantes.txt", mode="a", encoding="utf-8") as file:
                file.writelines("Indices faltantes:\n")
                file.writelines(" ".join([str(item) for item in missingValues]))
                file.write("\n")
        else:
            with open(
                "./faltantes.txt", mode="w", encoding="utf-8", newline="\n"
            ) as file:
                file.writelines("Indices faltantes:\n")
                file.write(" ".join([str(item) for item in missingValues]))
                file.write("\n")


if __name__ == "__main__":
    # instancia = get_names(path="./thealgorithms/", model="qwen-2.5-coder-32b")
    # instancia = get_names(
    #     path="./LeetCode-Java-Solutions/", model="deepseek-r1-distill-llama-70b"
    # )
    # codigo, nombres = instancia.main()
    instancia = getNames(path="./thealgorithms/", model="llama-3.3-70b-specdec")
    # deepseek-r1-distill-qwen-32b
    # instancia = get_names(path="./thealgorithms/", model="deepseek-r1-distill-qwen-32b")
    codigo_pd = instancia.get_code()
    df_1, index_missing = instancia.chat_groq(
        df_codigo=codigo_pd
    )  # .loc[i : i + 20]) por pruebas se pasaba de 20 en 20
    instancia.saveMissingValues(index_missing)
