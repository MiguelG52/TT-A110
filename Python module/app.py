from fastapi import FastAPI
from modulo_sugerencias import checkClassName
from pydantic import BaseModel

app = FastAPI()


class Codigo(BaseModel):
    codigo: str
    flag: bool = False  # bandera para saber si se necesita sugerencia o cambio


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/sugerencias")
def getSugerencias(peticion: Codigo):
    code = peticion.codigo
    flag = peticion.flag

    if flag:
        code = checkClassName(java_code=code)
