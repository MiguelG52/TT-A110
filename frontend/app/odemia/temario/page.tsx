export default function temarioPage() {
    return (
        <div className="flex-1 w-full h-full flex flex-col items-left justify-up bg-white p-6">
            <h1 className="text-2xl font-bold space-y-4">Temario:</h1>
            <br></br>
            <p>
                En esta sección podrás ver el temario a tu disposición para que puedas aumentar
                tu conocimiento y después pongas a prueba tu conocimiento en nuestro editor
                de texto
            </p>
            <br></br>
            {/* <div> */}
            <ul className="list-disc pl-6 space-y-2">
                <a href=""><li>Clases en Java</li></a>
                <a href=""><li>Acceso a miembros</li></a>
                <a href=""><li>Constructores</li></a>
                <a href=""><li>Sobrecarga de Constructores</li></a>
                <a href=""><li>Manejo de excepciones Try-Catch</li></a>
                <a href="#"><li>Relaciones entre Clases</li></a>
                <a href="#"><li>Herencia simple</li></a>
                <a href="#"><li>Composición</li></a>
                <a href=""><li>Polimorfismo</li></a>
                <a href=""><li>Encapsulamiento</li></a>
            </ul>
            {/* </div> */}
        </div>
    );
}