import re
from dataclasses import dataclass

from transformers import RobertaTokenizer, T5ForConditionalGeneration
from wordsegment import load, segment

load()

# Cargar el modelo y el tokenizador desde la carpeta donde se guardo
model_path = "./codet5-fine-tuned"
model = T5ForConditionalGeneration.from_pretrained(model_path)
tokenizer = RobertaTokenizer.from_pretrained(model_path)

# VARIABLES GLOBALES
# Expresion regular para declaraciones de clase
ClassStarter = r"\b(public|protected|private|static|final|abstract|strictfp)?\s*class\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\{"
# Expresion regular para declaraciones de metodos
MetodStarter = r"\b(public|protected|private|static|final|synchronized|native|abstract|default|strictfp)?\s*([a-zA-Z_][a-zA-Z0-9_]*\s+)+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)\s*(throws\s+[a-zA-Z_][a-zA-Z0-9_]*(\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*)*)?\s*\{?"
# Expresión regular para declaraciones de variables
regex = r"\b(public|protected|private|static|final|synchronized|volatile|transient)?\s*(byte|short|int|long|float|double|char|boolean|String|[a-zA-Z_][a-zA-Z0-9_]*|[a-zA-Z_][a-zA-Z0-9_]*\s*\[\])\s+([a-zA-Z_][a-zA-Z0-9_]*)(\s*=\s*[^;]*)?;\s*"


def GenerateSuggestedName(code: str, type_label="Clase", is_correct="true") -> str:
    """Genera un nombre sugerido para el código dado de acuerdo a si es clase, metodo o variable

    Args:
        code (str): Código Java del que se quiere obtener una sugerencia.
        type_lavel (str): Parte del código al que se le quiere asignar un nombre (Clase, Método, Variable). Default Clase.
        is_correct (str): Bandera que se uso en el entrenamiento para diferenciar del nombre correcto del incorrecto. Default true.

    Returns:
        str: El nombre sugerido por la red neuronal
    """
    input_text = f"Generate name [type: {type_label}, correct: {is_correct}]: {code}"
    input_ids = tokenizer(
        input_text, return_tensors="pt", max_length=512, truncation=True
    ).input_ids

    # Generar la predicción
    output_ids = model.generate(input_ids, max_length=20, num_return_sequences=1)
    suggested_name = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    return suggested_name


# @dataclass(slots=True)
# class Sugerencia:
#     java_code:str


def IsCamellCase(word: str) -> bool:
    """Función para determinar si la case ya esta en formato camell case, de ser así retorna un True

    Args:
        word (str): Nombre de la clase o el método

    Returns:
        bool: Valor booleano acorde a si es cammel case o no
    """
    word = word.strip()

    # Bloque try except porque  con palabras unicas falla
    try:
        sep = segment(word)
    except ValueError:
        sep = word

    if isinstance(sep, list):
        final = "".join(
            [
                item.capitalize() if index != 0 else item
                for index, item in enumerate(sep)
            ]
        )
        final = final.strip()

        return final == word

        # if final.strip() == word:
        #     return True
        # elif final.strip() != word:
        #     return False


def toCamellCase(w: str) -> str:
    """Función para convertir cualquier nombre de clase a cammel case

    Args:
        word (str): Nombre de la clase a pasar a cammel case

    Returns:
        str: El nombre de la clase en convención camell case
    """
    word = w.strip()

    try:
        sep = segment(word)
    except ValueError:
        sep = word

    if isinstance(sep, list):
        return "".join(
            [
                item.capitalize() if index != 0 else item
                for index, item in enumerate(sep)
            ]
        )

    return None


def getClassName(text: str) -> str:
    """Funcion para obtener el nombre de la clase, es decir para obtener como ha nombrado la clase

    Args:
        text (str): Código java

    Returns:
        str: Nombre de la clase del código java
    """

    for match in re.finditer(pattern=ClassStarter, string=text):
        # className = match.group()
        startPos = match.start()
        endPos = match.end()
        className = re.findall(pattern=ClassStarter, string=text)
        if len(className) >= 1:
            # className =
            return className[0][1].strip(), [startPos, endPos]

    return None


def checkClassName(java_code: str) -> str:
    """Función que checha si el nombre que se le asignó a la clase esta en convensión CamellCase

    Args:
        java_code (str): _description_

    Returns:
        str: _description_
    """
    tupleClass = getClassName(text=java_code)
    flag = IsCamellCase(word=tupleClass[0])
    suggest_name = GenerateSuggestedName(code=java_code)

    flag_2 = IsCamellCase(word=suggest_name)
    if not flag_2:
        suggest_name = toCamellCase(w=suggest_name)

    if not flag:
        string = (
            java_code[: tupleClass[1][1]]
            + f"  // Recuerda que {tupleClass[0]} debe ir con Cammel Case"
            + java_code[tupleClass[1][1] :]
        )

        if suggest_name != tupleClass[0]:
            string = (
                java_code[: tupleClass[1][1]]
                + f"  // Recuerda que {tupleClass[0]} debe ir con Cammel Case y un mejor nombre sería {suggest_name}"
                + java_code[tupleClass[1][1] :]
            )
            return string

        return string
        # print(string)
    else:
        if suggest_name != tupleClass[0]:
            strin = (
                java_code[: tupleClass[1][1]]
                + f"  // Un mejor nombre sería {suggest_name}"
                + java_code[tupleClass[1][1] :]
            )
            return strin
        return java_code


def getPositionMethod(text: str) -> dict:
    typeData = [
        "public",
        "protected",
        "private",
        "static",
        "final",
        "synchronized",
        "native",
        "abstract",
        "default",
        "strictfp",
    ]
    positions = dict()

    for index, match in enumerate(re.finditer(MetodStarter, text)):
        metodo = match.group()
        start_pos = match.start()
        end_pos = match.end()

        for data in typeData:
            if data in metodo:
                positions[index] = [start_pos, end_pos, metodo.index(data)]
                # print(f"Se encontró {metodo}, en {start_pos}-{end_pos}")
                break

    return positions
