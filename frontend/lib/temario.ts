// lib/temario.ts

export const temario = [
    {
        id: 1,
        icon: "📘",
        title: "Clases en Java",
        description: "Aprende a declarar y usar clases en Java.",
        content: `En Java todo está encapsulado en clases. La clase es el núcleo del lenguaje Java. Se puede definir como una plantilla que describe los comportamientos y estados de una entidad en particular.
Una clase define un nuevo tipo de datos. Una vez definido, este nuevo tipo se puede utilizar para crear un objeto de ese tipo.

En Java, para declarar una clase se utiliza la palabra clave. Una clase contiene datos y métodos que operan con esos datos. Los datos o variables definidos dentro de una clase se denominan variables de instancia y el código que opera con estos datos se conoce como métodos.

Por lo tanto, las variables y métodos de instancia se conocen como miembros de clase.

Reglas para la clase Java:

- Una clase solo puede tener un especificador de acceso público o predeterminado (sin modificador).
- Puede ser abstracto, final o concreto (clase normal).
- Debe tener la palabra clave class y la clase debe ir seguida de un identificador legal.
- Opcionalmente, puede extener solo una clase principal. De forma predeterminada, extiende la clase Object.
- Las variables y los métodos se declaran dentro de un conjunto de llaves.

Una clase Java puede contener campos, métodos, constructores y bloques. Veamos una estructura general de una clase.

Sintaxis de la clase Java

class class_name {
    field;
    method;
}


`,
        videoUrl: "https://www.youtube.com/embed/grEKMHGYyns",
    },
    {
        id: 2,
        icon: "🔒",
        title: "Acceso a miembros",
        description: "Controla el acceso a los atributos y métodos.",
        content: `
Los modificadores de acceso en Java controlan el nivel de visibilidad o accesibilidad de clases, métodos y variables en un programa. Estos modificadores son esenciales para implementar el principio de encapsulamiento, una de las bases de la programación orientada a objetos.

¿Qué son los Modificadores de Acceso?

Los modificadores de acceso determinan qué partes del programa pueden acceder a una clase, método o variable. Los modificadores de acceso en Java son:

1. public: El miembro es accesible desde cualqueir lugar del programa.
2. private: El miembro es accesible solo desde dentro de la clase en la que está declarado.
3. protected: El miembro es accesible dentro del mismo parquete y por las sublcases, incluso si están en diferentes paquetes.
4. Sin modificador (package-private): Si no se especifica ningún modificador, el miembro es accesible solo dentro del mismo paquete.

Modificador public

El modificador public permite que una clase, método o variable sea accesible desde cualquier parte del código, ya sea dentro del mismo paquete o en paquetes diferentes.

Explicación:
El atributo nombre y el método saludar están declarados como public, por lo que son accesibles desde cualquier clase, incluso desde fuera del paquete donde se encuentran.
Ventajas de public

- Permite el acceso desde cualquier lugar del código.
- Útil cuando necesitas que un método o atributo sea accesible globalmente.


Consideraciones:

- El uso excesivo de public puede romper el principio de encapsulamiento. Es recomendable utilizarlo solo cuando sea necesario.

Modificador private

El modificador private limita el acceso a la clase en la que se define. Los miembros private no son accesibles fuera de su clase, lo que refuerza el encapsulamiento.

Explicación:
- El atributo declarado como private, por lo que no se puede acceder directamente desde fuera de la clase. Sim embargo podemos acceder a él mediante el método público.

Ventajas de private
- Protege los datos de accesos no deseados o modificaciones accidentales.
- Refuerza el principio de encapsulamiento.

Consideraciones: 
- Es recomendable declarar los atributos como private y proporcionar métodos getter y setter para controlarlos.

Modificador protected
El modificador protected permite que un miembro sea accesible dentro del mismo paquete y en clases que heredan de la clase original, incluso si estas clases están en un paquete diferente.

Explicación:
- El atributo nombre está declarado como protected, lo que permite que la clase Empleado (subclase de Persona) acceda a él a través de la herencia, aunque esté en un paquete diferente.

Ventajas de protected
- Proporciona un acceso controlado en las jerarquías de herencia.
- Es más restrictivo que public, pero menos restrictivo que private.

Consideraciones:
- El acceso protected es útil en clases que están destinadas a ser extendidas, pero debes evitar exponer datos sensibles.

Mejores Prácticas en el Uso de Modificadores de Acceso

1. Encapsula siempre que sea posible: Declara los atributos como private y proporciona métodos getter y setter para un acceso controlado.
2. Usa protected cuando las clases están diseñadas para ser extendidas: El acceso protected es útil cuando esperas que otras clases hereden y accedan a ciertos miembros.
3. Evita el uso excesivo de public: Exponer demasiados miembros como public puede hacer que el código sea más difícil de mantener y menos seguro.
4. Usa el modificador adecuado según el contexto: La elección del modificador debe basarse en la necesidad real de visibilidad y en la intención de proteger los datos o métodos.
`,
        videoUrl: "https://www.youtube.com/embed/8cmx7V4oY0A",
    },
    {
        id: 3,
        icon: "📘",
        title: "Constructores",
        description: "Crea objetos con constructores personalizados.",
        content: `
Un constructor es un método especial que se utiliza para inicializar un objeto. Cada clase tiene un constructor, ya sea implícita o explícitamente.

Si no declaramos un constructor en la clase, JVM crea un constructor predeterminado para esa clase. Esto se conoce como constructor predeterminado.

Un constructor tiene el mismo nombre que el nombre de la clase en la que se declara. El constructor no debe tener ningún tipo de valor devuelto explícito. El constructor en Java no puede ser abstracto, estático, final o sincronizado. Estos modificadores no están permitidos para el constructor.

Sintaxis para declarar el constructor:

className (parameter-list){
        code-statements
}

className es el nombre de la clase, ya que el nombre del constructor es el mismo que el nombre de la clase.

parameter-list es opcional, ya que los constructores también pueden ser parametrizados y no parametrizados.

Ejemplo de constructor

En Java, el constructor estructuralmente se ve como se da en el siguiente programa. Una clase Car tiene un constructor que proporciona valores a las variables de instancia.

class Car
{
    String name;
    Steing model;
    car() //Constructor
    {
        model="";
        name="";
    }
}

ipos de constructor
Java admite dos tipos de constructores:

- Constructor predeterminado
- Constructor parametrizado

Cada vez que se crea un nuevo objeto, se invocará al menos un constructor.

onstructor predeterminado
En Java, se dice que un constructor es el constructor predeterminado si no tiene ningún parámetro. El constructor predeterminado puede ser definido por el usuario o proporcionado por JVM.

Si una clase no contiene ningún constructor, durante el tiempo de ejecución, JVM genera un constructor predeterminado que se conoce como constructor predeterminado definido por el sistema.

Si una clase contiene un constructor sin parámetro, se conoce como constructor predeterminado definido por el usuario. En este caso, JVM no crea un constructor predeterminado.

El propósito de crear un constructor es inicializar los estados de un objeto.
        `,
        videoUrl: "https://www.youtube.com/watch?v=5EGS6lnghYE",

    },
    {
        id: 4,
        icon: "➕",
        title: "Sobrecarga de Constructores",
        description: "Define múltiples constructores para flexibilidad.",
        content: `Al igual que los métodos, un constructor también puede estar sobrecargado. Los constructores sobrecargados se diferencian en función de su tipo de parámetros o número de parámetros. La sobrecarga de constructores no es muy diferente de la sobrecarga de métodos. En caso de sobrecarga de métodos, tiene varios métodos con el mismo nombre pero con diferente firma, mientras que en la sobrecarga de constructores tiene varios constructores con diferente firma, pero la única diferencia es que el constructor no tiene tipo de retorno.
        
        Ejemplo de sobrecarga de constructores

        class Cricketer
        {
            String name;
            String team;
            int age;
            Cricketer() //contructor por defecto
            {
                name = "";
                team = "";
                age = 0;
            }
            Cricketer(String n, String t, int a) // Sobrecarga de constructor
            {
                name = n;
                team = t;
                age = a;
            }
            Cricketer (Cricketer ckt)
            {
                name = ckt.name;
                team = ckt.team;
                age = ckt.age;
            }
            public String toString()
            {
                return "this is " + name + " of " + team;
            }
        }

        Class test:
        {
            public static void main (String[] args)
            {
                Cricketer c1 = new Cricketer();
                Cricketer c2 = new Cricketer("sachin", "India", 32);
                Cricketer c3 = new Cricketer(c2 );
                System.out.println(c2);
                System.out.println(c3);
                c1.name = "Virat";
                c1.team= "India";
                c1.age = 32;
                System .out. print in (c1);
            }
        }

        Encadenamiento de constructores
El encadenamiento de constructores es un proceso de llamar a un constructor desde otro constructor de la misma clase. Dado que solo se puede llamar al constructor desde otro constructor, se utiliza el encadenamiento de constructores para este propósito.

Para llamar al constructor desde otro constructor, se utiliza esta palabra clave. Esta palabra clave se utiliza para hacer referencia al objeto actual.

Veamos un ejemplo para entender el encadenamiento de constructores.


    class Test
    {
        Test()
        {
            this(10);
        }
        Test(int x)
        {
            System.out.println("x="+x);
        }
        public static void main(String arg[])
        {
            Test object = new Test();
        }
    }

    El encadenamiento de constructores se utiliza cuando queremos realizar varias tareas creando un solo objeto de la clase.
  
        `,
        videoUrl: "",
    },
    {
        id: 5,
        icon: "🧯",
        title: "Try-Catch",
        description: "Manejo de excepciones en Java.",
        content: `Los errores durante la ejecución de un programa pueden comprometer seriamente su funcionamiento. El manejo de excepciones en Java se convierte en una herramienta fundamental para la gestión efectiva de estos errores. 
        
        La creación de jerarquías de clases de excepción representan diversos tipos de errores de manera estructurada y coherente. Además, mediante la implementación de mecanismos como la sobre escritura de métodos, los desarrolladores pueden personalizar y adaptar el manejo de excepciones a las necesidades específicas de sus aplicaciones, asegurando un flujo controlado y predecible en situaciones de error. En resumen, el manejo de excepciones en Java no solo simplifica la gestión de errores, sino que también promueve una estructura de código más organizada y fácil de mantener, crucial para el desarrollo de software escalable y robusto en entornos de programación complejos y en constante evolución.

En el paradigma de la programación orientada a objetos, la integridad de los objetos implica la garantía de condiciones preestablecidas, también conocidas como estados, tanto antes como después de la ejecución de un método en respuesta a un mensaje. Antes de responder a un mensaje, un objeto debe encontrarse en un estado consistente y válido según las restricciones definidas por la clase. Tras la ejecución del método, el objeto debe mantener su estado coherente en relación con las reglas de negocio y las restricciones del sistema. Mediante el uso de conceptos como encapsulación, validación de datos y abstracción, los objetos pueden preservar su integridad interna y asegurar la coherencia en su interacción con otros objetos, promoviendo así un diseño orientado a objetos sólido y fáciles de mantener.

En Java, una excepción es un evento que interrumpe el flujo normal de un programa durante su ejecución. Las excepciones se dividen en tres categorías principales:

1. Excepciones comprobadas (checked exceptions):Son aquellas que el compilador obliga a controlar mediante bloques try-catch o declaraciones throws. Estas excepciones suelen estar relacionadas con problemas externos al programa, como la entrada/salida de datos y el manejo de archivos.
2. Excepciones no comprobadas (uncheked exceptions):Son aquellas que el compilador no obliga a controlar. Por lo general, surgen debido a errores en la lógica del programa, como intentos de división entre cero, acceso a índices fuera de los límites de un arreglo, entre otros.
3. Errores(errors): Representan problemas graves que surgen en tiempo de ejecución y que generalmente están fuera del control del programador. Estos errores no se pueden manejar y generalmetne indican problemas graves en el entorno de ejecución, como la falta de memoria.

Un manejador de excepciones se refiere a un bloque de código que se utiliza para gestionar y controlar las excepciones que pueden ocurrir durante la ejecución de un programa. El manejo de excepciones en Java se logra mediante el uso de bloques try-catch. El bloque try contiene el código propenso a generar excepciones, mientras que el bloque catch se utiliza para capturar y manejar esas excepciones.

public class ManejadorExcepcionesEjemplo {
public static void main(String[] args) {
    try {
        int[] arreglo = new int[4];
        System.out.println("Intentando acceder a un índice inválido del arreglo...");
        int valor = arreglo[5]; // Esto generará una excepción ArrayIndexOutOfBoundsException
    } catch (ArrayIndexOutOfBoundsException e) {
        System.out.println("Se ha producido un error: Acceso a un índice inválido del arreglo.");
    } finally {
        System.out.println("El bloque finally se ejecuta siempre, independientemente de si hay una excepción o no.");
    }
 }
}


`,
        videoUrl: "",
    },
    {
        id: 6,
        icon: "🔗",
        title: "Relaciones entre Clases",
        description: "Asocia clases para modelar comportamientos complejos.",
        content: `
En la programación orientada a objetos, las **clases** representan cosas o conceptos del mundo real. A veces, estas clases necesitan trabajar juntas o estar conectadas entre sí. A eso le llamamos **relaciones entre clases**.

Existen dos relaciones principales:

1. Composición

Una clase usa a otra como parte de sí misma. Por ejemplo:


class Motor {
        void encender() {
        System.out.println("Motor encendido");
    }
}

class Auto {
    Motor motor = new Motor();

    void arrancar() {
    motor.encender();
}
}
En este caso, un 'Auto' **tiene un** 'Motor'. El motor no vive por sí solo, solo existe dentro del auto.

2. Asociación

Una clase se conecta con otra, pero no la contiene. Por ejemplo:


class Profesor {
    String nombre;
}

class Curso {
    Profesor profesor;
}


Aquí, un 'Curso' usa un 'Profesor', pero el profesor no es parte del curso: puede existir por separado y trabajar en otros cursos.

---

¿Por qué es útil esto?

* Ayuda a dividir problemas grandes en partes pequeñas y fáciles de manejar.
* Permite reutilizar código.
* Hace que tus programas sean más organizados y realistas.

`,
        videoUrl: "",
    },
    {
        id: 7,
        icon: "👪",
        title: "Herencia simple",
        description: "Hereda comportamientos de clases base.",
        content: `La herencia es una de las características clave de la Programación Orientada a Objetos. La herencia proporcionaba un mecanismo que permitía a una clase heredar la propiedad de otra clase. Cuando una clase extiende otra clase, hereda todos los miembros no privados, incluidos los campos y los métodos. La herencia en Java se puede entender mejor en términos de relación padre e hijo, también conocida como superclase (padre) y subclase (hijo) en el lenguaje Java.

La herencia define como una relación entre una clase Super y su Sub clase. y las palabras clave se utilizan para describir la herencia en Java.extendsimplements


Veamos cómo se usa la palabra clave extends para lograr la herencia. Muestra la relación de superclase y subclase.

class Vehicle
{
    ......
}
class Car extends Vehicle
{
    .......    //extends the property of vehicle class
}

Ahora, basado en el ejemplo anterior. En términos de POO podemos decir que,

- El vehículo es una súper clase de coche.
- El automóvil es una subclase de vehículo.
- Coche IS-A Vehículo.

Finalidad de la herencia
- Promueve la reutilizabilidad del código, es decir, los mismos métodos y variables que se definen en una clase padre/super/base se pueden usar en la clase hija/sub/derivada.
- Promueve el polimorfismo al permitir la anulación del método.

Desventajas de la herencia
- La principal desventaja de usar la herencia es que las dos clases (clase principal y secundaria) se acoplan estrechamente.
- Esto significa que si cambiamos el código de la clase padre, afectará a todas las clases hijas que heredan/derivan la clase padre y, por lo tanto, no pueden ser independientes entre sí.

Ejemplo sencillo de Herencia
Antes de seguir adelante tomemos un ejemplo rápido y tratemos de entender mejor el concepto de Herencia:

class Parent
{
    public void p1()
    {
        System.out.println("Parent method");
    }
}
public class Child extends Parent {

    public void c1()
    {
        System.out.println("Child method");
    }
    public static void main(String[] args)
    {
        Child cobj = new Child();
        cobj.c1();  //method of Child class
        cobj.p1();  //method of Parent class
    }
}

En el código anterior tenemos una clase Parent que tiene un método . A continuación, creamos una nueva clase Child que hereda la clase Parent utilizando la palabra clave y define su propio método . Ahora, en virtud de la herencia, la clase Child también puede acceder al método de la clase Parent.p1()extendsc1()publicp1()

Tipos de herencia
Java admite principalmente solo tres tipos de herencia que se enumeran a continuación.

1. Herencia única
2. Herencia multinivel
3. Herencia jerárquica
`,
        videoUrl: "",
    },
    {
        id: 8,
        icon: "🧩",
        title: "Composición",
        description: "Usa clases como componentes internos de otras.",
        content: ``,
        videoUrl: "",
    },
    {
        id: 9,
        icon: "🌀",
        title: "Polimorfismo",
        description: "Interfaz única para diferentes tipos de datos.",
        content: `El polimorfismo es uno de los pilares fundamentales de la Programación Orientada a Objetos (POO), junto con la herencia y el encapsulamiento. En Java, el polimorfismo permite que un objeto de una clase se comporte de diferentes maneras dependiendo del contexto.

El polimorfismo mejora la flexibilidad y reutilización del código, lo que hace que los programas sean más extensibles y fáciles de mantener.

El polimorfismo significa “muchas formas”, y en Java, se refiere a la capacidad de un objeto de adoptar diferentes formas. A través de la herencia y la sobrescritura de métodos, un objeto puede comportarse de diferentes maneras según su tipo en tiempo de ejecución. Hay dos tipos principales de polimorfismo en Java:

1. Polimorfismo en tiempo de compilación (sobrecarga): Ocurre cuando se define más de un método con el mismo nombre pero diferentes parámetros dentro de una clase.
2. Polimorfismo en tiempo de ejecución (sobrescritura): Se refiere a la capacidad de un método sobrescrito para ser invocado en tiempo de ejecución según el tipo del objeto.

Diferencia entre Sobrecarga y Sobrescritura
- Sobrecarga: El método tiene el mismo nombre pero diferentes parámetros dentro de la misma clase (polimorfismo en tiempo de compilación).
- Sobrescritura: Una subclase redefine un método heredado de la superclase con la misma firma (polimorfismo en tiempo de ejecución).

Polimorfismo en Tiempo de Ejecución
En Java, el polimorfismo en tiempo de ejecución se logra a través de la sobrescritura de métodos. Un objeto de una subclase puede ser tratado como si fuera de su superclase, pero el comportamiento que adopta dependerá de la clase real del objeto en tiempo de ejecución.

// Superclase
class Animal {
    public void hacerSonido() {
        System.out.println("El animal hace un sonido.");
    }
}

// Subclase 1
class Perro extends Animal {
    @Override
    public void hacerSonido() {
        System.out.println("El perro ladra.");
    }
}

// Subclase 2
class Gato extends Animal {
    @Override
    public void hacerSonido() {
        System.out.println("El gato maúlla.");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Perro(); // Polimorfismo
        Animal animal2 = new Gato();  // Polimorfismo

        animal1.hacerSonido(); // Llama al método de la clase Perro
        animal2.hacerSonido(); // Llama al método de la clase Gato
    }
}

Explicación:
- Animal: Es la superclase que define un método genérico hacerSonido().
- Perro y Gato: Son subclases que sobrescriben el método hacerSonido() con un comportamiento específico.
- Polimorfismo: Los objetos animal1 y animal2 son de tipo Animal, pero en tiempo de ejecución, se comportan según sus clases concretas (Perro y Gato).

Ventajas del Polimorfismo
- Flexibilidad: Puedes escribir código que trabaje con la superclase, pero en tiempo de ejecución, los objetos se comportarán según su clase real.
- Reutilización de Código: Evita la duplicación de código, ya que las subclases pueden sobrescribir el comportamiento sin reescribir todo el código de la superclase.
- Extensibilidad: Facilita la ampliación del sistema, ya que puedes agregar nuevas clases sin cambiar el código existente que utiliza la superclase.
`,
        videoUrl: "",
    },
    {
        id: 10,
        icon: "🔐",
        title: "Encapsulamiento",
        description: "Protege los datos dentro de una clase.",
        content: `El encapsulamiento en Java es el proceso de ocultar los detalles internos de una clase y exponer solo lo necesario a través de métodos públicos. Este principio permite proteger los datos sensibles y asegurar que los objetos se utilicen de manera controlada y predecible.

Beneficios del Encapsulamiento
1. Control sobre el acceso a los datos: Los datos sensibles están protegidos y solo pueden ser modificados a través de métodos controlados.
2. Facilidad para realizar cambios internos: Puedes cambiar la implementación interna de una clase sin afectar el código externo.
3. Mantenimiento y depuración más sencilla: El encapsulamiento hace que el código sea más fácil de mantener y depurar, ya que los errores tienden a estar confinados dentro de la clase.

Implementación del Encapsulamiento en Java

El encapsulamiento en Java se logra mediante:
1. Declarar los atributos como private: Esto restringe el acceso directo a los atributos desde fuera de la clase.
2. Proveer métodos públicos getter y setter: Estos métodos controlan cómo se accede y modifica el valor de los atributos.

Ejemplo Básico de Encapsulamiento:

public class Persona {
    // Atributos privados
    private String nombre;
    private int edad;

    // Constructor
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    // Método getter para acceder al atributo nombre
    public String getNombre() {
        return nombre;
    }

    // Método setter para modificar el atributo nombre
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // Método getter para acceder al atributo edad
    public int getEdad() {
        return edad;
    }

    // Método setter para modificar el atributo edad
    public void setEdad(int edad) {
        if (edad > 0) {
            this.edad = edad;
        } else {
            System.out.println("La edad no puede ser negativa.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Persona persona = new Persona("Carlos", 30);

        // Acceso a través de los métodos getter
        System.out.println("Nombre: " + persona.getNombre());
        System.out.println("Edad: " + persona.getEdad());

        // Modificación a través de los métodos setter
        persona.setNombre("Ana");
        persona.setEdad(28);

        System.out.println("Nuevo nombre: " + persona.getNombre());
        System.out.println("Nueva edad: " + persona.getEdad());
    }
}


Explicación del Ejemplo

- Los atributos nombre y edad están declarados como private, lo que impide que se acceda a ellos directamente desde fuera de la clase Persona.
- Los métodos getter (getNombre() y getEdad()) permiten acceder a los valores de estos atributos.
- Los métodos setter (setNombre() y setEdad()) controlan cómo se modifican los atributos. En el caso del método setEdad(), se agrega una validación para asegurarse de que la edad no sea negativa.

¿Por qué Usar Métodos Getter y Setter?
El uso de getter y setter es una forma común de aplicar el principio de encapsulamiento en Java. Estos métodos ofrecen control sobre el acceso a los atributos privados, permitiendo la validación de los datos antes de ser asignados.

Encapsulamiento en Clases Complejas
El encapsulamiento también es esencial en clases más complejas, donde varios atributos dependen unos de otros. Al proporcionar un acceso controlado a los datos, puedes garantizar que el estado del objeto siempre sea consistente.

Ejemplo complejo de encapsulamiento:

public class Coche {
    private String marca;
    private String modelo;
    private int año;
    private int velocidad;

    // Constructor
    public Coche(String marca, String modelo, int año) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.velocidad = 0; // Velocidad inicial es 0
    }

    // Getter y Setter para marca
    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    // Getter y Setter para modelo
    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    // Getter para año (sin setter, ya que no debería cambiarse)
    public int getAño() {
        return año;
    }

    // Método para aumentar la velocidad
    public void acelerar(int incremento) {
        if (incremento > 0) {
            this.velocidad += incremento;
            System.out.println("Velocidad actual: " + velocidad + " km/h");
        } else {
            System.out.println("El incremento debe ser positivo.");
        }
    }

    // Método para frenar el coche
    public void frenar(int decremento) {
        if (decremento > 0 && this.velocidad >= decremento) {
            this.velocidad -= decremento;
            System.out.println("Velocidad actual: " + velocidad + " km/h");
        } else {
            System.out.println("El decremento debe ser positivo y menor que la velocidad actual.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Coche miCoche = new Coche("Toyota", "Corolla", 2021);

        miCoche.acelerar(50); // Aumenta la velocidad
        miCoche.frenar(20);   // Reduce la velocidad

        // Acceso a la marca y modelo
        System.out.println("Marca: " + miCoche.getMarca());
        System.out.println("Modelo: " + miCoche.getModelo());
    }
}

Explicación del ejemplo:
- El acceso a los atributos marca, model y año está controlado a través de métodos getter y setter. El atributo año no tiene un setter, ya que el año de fabricación de un coche no debería cambiar.
- Los métodos acelerar() y frenar() proporcionana una interfaz controlada para modificar la velocidad del coche, con validaciones para evitar comportamientos inesperados.

Encapsulamiento y Modificadores de Acceso
El encapsulamiento en Java está estrechamente relacionado con los modificadores de acceso. Como vimos en el artículo anterior, los modificadores de acceso como private, protected y public determinan qué partes de tu programa pueden acceder a los miembros de una clase.

- private: Los atributos y métodos declarados como private solo son accesibles dentro de la propia clase, lo que refuerza el principio de encapsulamiento.
- protected y public: Aunque no son tan restrictivos como private, aún permiten cierto grado de control sobre cómo se accede a los datos.


Buenas Prácticas en el Encapsulamiento
1. Mantén los atributos privados: Siempre que sea posible, declara los atributos como private y proporciona métodos getter y setter para acceder a ellos.
2. Valida los valores en los setters: Aprovecha los métodos setter para asegurarte de que los valores asignados sean válidos.
3. Evita exponer datos innecesarios: No todos los atributos necesitan ser accesibles o modificables desde fuera de la clase. Evalúa cuáles son realmente necesarios.
`,
        videoUrl: "",
    },
];
