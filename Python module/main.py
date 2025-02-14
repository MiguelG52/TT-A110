import json
import re

from fastapi import FastAPI
from pydantic import BaseModel
from wordsegment import load, segment

# Lista auxiliar que ayuda al momento de nombrar metodos
tipo_datos = [
    "boolean",
    "char",
    "byte",
    "short",
    "int",
    "long",
    "float",
    "double",
    "String",
    "Array",
]

load()

# Declaración de regex para uso general
class_starter = r"(class)\s([^\{]+)\{"
funciones_static = r"(static\s){1,1}.{0,}(){1,1}"
funciones_private = r"(private\s){1,1}.{0,}(){1,1}"


def separate_words(text: str) -> str:
    """En esta parte con ayuda de la libreria wordsegment se ocupan los metodos segment
    y load para poder separar textos como:
        'getallvaluesofarray'

    Args:
        text (str): El nombre de la clase como en el ejemplo anterio 'getallvaluesofarray'

    Returns:
        str: Retorna las palabras con cammel case en este caso GetAllValuesOfArray
    """
    t_list = segment(text)

    # En el return se itera por cada letra y se pone la primera en mayuscula y se junta todo el texto
    # print(t_list)
    return "".join([item.strip().title() for item in t_list])


app = FastAPI()


class Code_Java(BaseModel):
    text_of_code: str


@app.post("/prueba_1")
async def format_text(input_api: Code_Java):
    input_data = input_api.json()
    input_dictionary = json.loads(input_data)

    # return {"Message": input_dictionary}

    text = input_dictionary["text_of_code"]
    # print(text)

    class_coin = re.findall(pattern=class_starter, string=text)

    # Comprobamos el nombramiento de la clase
    if bool(class_coin):
        # Con una expresión regular verificamos el nombramiento de la clase y su respectivo nombre
        identificador = class_coin[0][0].strip()

        t_t = text.split("\n")
        n = len(t_t)

        # Iteramos por cada linea de código hasta que terminamos con el proceso de cambiar el nombre de la clase por la forma de cammel case
        for i in range(n):
            if identificador in t_t[i]:
                sep_l = t_t[i].split()
                n_2 = len(sep_l)
                for j in range(n_2):
                    if sep_l[j] != identificador and sep_l[j] != "public":
                        sep_l[j] = separate_words(sep_l[j])
                        break
                sep_l = " ".join(sep_l)
                t_t[i] = sep_l
    text = "\n".join(t_t)

    # De momento solo se revisa si hay nombramiento de metodos privados
    if "private" in text:
        coincidencias = re.findall(pattern=funciones_private, string=text)

        if bool(coincidencias):
            # print("segundo if")
            c = coincidencias[0][0].strip()
            t_l = text.split("\n")
            for i in range(len(t_l)):
                # print(c,line)
                if c in t_l[i]:
                    # print("antes del title", t_l[i].strip())
                    sep = t_l[i].split()
                    # print(sep.index(c))
                    for j in range(len(sep)):
                        if sep[j] != c and sep[j] not in tipo_datos:
                            sep[j] = separate_words(sep[j])
                            break
                    sep = " ".join(sep)
                    t_l[i] = sep
    text = "\n".join(t_l)

    return {"Output": text}
