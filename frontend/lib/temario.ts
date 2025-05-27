// lib/temario.ts

export const temario = [
    {
        id: 1,
        icon: "📘",
        title: "Clases y objetos en Java",
        description: "Aprende sobre las clases y los objetos en Java",
        content: `
En Java, las clases y los objetos son los bloques de construcción fundamentales del lenguaje. Java es un lenguaje orientado a objetos, lo que significa que el diseño de programas se basa en la creación y manipulación de objetos.

¿Qué es una Clase en Java?

Una clase en Java es una plantilla o modelo que define las propiedades (atributos) y comportamientos (métodos) de los objetos que se crean a partir de ella. Las clases son las definiciones de los tipos de objetos que pueden existir en el sistema.

Ejemplo de Declaración de una Clase

public class Persona {
    // Atributos
    String nombre;
    int edad;

    // Constructor
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    // Métodos
    public void saludar() {
        System.out.println("Hola, mi nombre es " + nombre);
    }
}

Explicación del Ejemplo
- Atributos: La clase Persona tiene dos atributos: nombre y edad, que almacenan el estado de los objetos que se crean a partir de la clase.
- Constructor: Un constructor es un método especial que se usa para inicializar objetos. Aquí, el constructor toma dos parámetros para inicializar los atributos nombre y edad.
- Métodos: El método saludar permite que los objetos de tipo Persona ejecuten una acción, en este caso, imprimir un mensaje en consola.

¿Qué es un Objeto en Java?

Un objeto es una instancia de una clase. Cuando se crea un objeto, se reserva memoria y se inicializan los atributos definidos en la clase.

Ejemplo de Creación de un Objeto

public class Main {
    public static void main(String[] args) {
        // Crear un objeto de la clase Persona
        Persona persona1 = new Persona("Carlos", 25);
        persona1.saludar(); // Llamar al método del objeto
    }
}

Explicación del Ejemplo

- Creación del Objeto: Se usa la palabra clave new para crear un nuevo objeto de la clase Persona. El constructor se llama con los parámetros "Carlos" y 25 para inicializar los atributos.
- Acceso a Métodos: Luego de crear el objeto persona1, se llama al método saludar usando la notación de punto (.).

Encapsulamiento

El encapsulamiento es una característica de la programación orientada a objetos que oculta los detalles internos de una clase y expone solo lo necesario a través de métodos públicos.

Los atributos de una clase se suelen declarar como private para evitar el acceso directo desde fuera de la clase, y se proporcionan métodos get y set para acceder y modificar estos atributos.

Ejemplo de Encapsulamiento

public class Coche {
    // Atributo privado
    private String marca;

    // Constructor
    public Coche(String marca) {
        this.marca = marca;
    }

    // Método getter
    public String getMarca() {
        return marca;
    }

    // Método setter
    public void setMarca(String marca) {
        this.marca = marca;
    }
}

Explicación

- Atributo privado: El atributo marca está declarado como private, lo que significa que no se puede acceder directamente desde fuera de la clase.
- Métodos get y set: Los métodos getMarca() y setMarca() proporcionan una manera controlada de acceder y modificar el valor del atributo marca.

Métodos en las Clases
Los métodos en las clases definen las acciones o comportamientos que los objetos pueden realizar. Los métodos pueden recibir parámetros y devolver valores.

Ejemplo de Métodos

public class Calculadora {
    // Método para sumar dos números
    public int sumar(int a, int b) {
        return a + b;
    }

    // Método para restar dos números
    public int restar(int a, int b) {
        return a - b;
    }
}

En este ejemplo, la clase Calculadora tiene dos métodos: sumar y restar, que realizan operaciones matemáticas simples.

Llamada a Métodos

public class Main {
    public static void main(String[] args) {
        Calculadora calc = new Calculadora();
        int resultadoSuma = calc.sumar(5, 3);
        int resultadoResta = calc.restar(10, 4);

        System.out.println("Resultado de la suma: " + resultadoSuma);
        System.out.println("Resultado de la resta: " + resultadoResta);
    }
}

Constructores en Java
Un constructor es un tipo especial de método que se llama automáticamente cuando se crea un objeto de una clase. El constructor se utiliza para inicializar el estado del objeto. En Java, si no se define un constructor, el compilador proporcionará uno por defecto.

Sobrecarga de Constructores
Java permite tener múltiples constructores con diferentes parámetros, lo que se conoce como sobrecarga de constructores.

Ejemplo de Sobrecarga de Constructores

public class Persona {
    String nombre;
    int edad;

    // Constructor sin parámetros
    public Persona() {
        this.nombre = "Desconocido";
        this.edad = 0;
    }

    // Constructor con parámetros
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
}

Explicación

- Constructor sin parámetros: Inicializa los atributos con valores predeterminados.
- Constructor con parámetros: Permite inicializar los atributos con valores proporcionados por el usuario.

Tipos de Métodos
Java soporta varios tipos de métodos según su funcionalidad y comportamiento. A continuación, se describen algunos tipos importantes de métodos.

Métodos Estáticos
Un método estático pertenece a la clase en sí, no a las instancias (objetos) de la clase. Se accede a ellos usando el nombre de la clase, en lugar de un objeto.

Métodos de Instancia
Los métodos de instancia dependen de los objetos de la clase y necesitan ser llamados a través de una instancia.

Ejemplo Completo: Clases y Objetos en Java

A continuación, un ejemplo completo que muestra cómo definir una clase, crear objetos y utilizar sus métodos.

public class Animal {
    String nombre;
    String especie;

    // Constructor
    public Animal(String nombre, String especie) {
        this.nombre = nombre;
        this.especie = especie;
    }

    // Método para describir el animal
    public void describir() {
        System.out.println("Soy un " + especie + " y me llamo " + nombre);
    }

    public static void main(String[] args) {
        // Crear un objeto de la clase Animal
        Animal perro = new Animal("Max", "perro");
        perro.describir(); // Llamar al método
    }
}

`,
        videoUrl: "https://www.youtube.com/watch?v=SI7O81GMG2A",
    },
    {
        id: 2,
        icon: "📕",
        title: "Relaciones entre clases",
        description: "Aprende como estas relaciones definen cómo interactúan y se conectan las clases entre sí.",
        content: `
En la programación orientada a objetos, las clases no siempre trabajan solas. Muchas veces se relacionan entre sí para construir soluciones más completas. Estas relaciones permiten que los objetos se comuniquen, compartan información o incluso se construyan unos con otros.

Asociación, Agregación y Composición
Estas tres son formas de conectar clases, pero cada una tiene un nivel diferente de dependencia.

Asociación
Es una relación general entre dos clases. Por ejemplo, un Profesor puede estar asociado a un Curso.

class Profesor {
    String nombre;
}

class Curso {
    Profesor profesor;
}

Ambas clases pueden existir de forma independiente.

Agregación
Es un tipo de asociación donde una clase contiene a otra, pero cada una puede vivir por separado.

class Estudiante {
    String nombre;
}

class Curso {
    List<Estudiante> estudiantes;
}

Si el Curso se elimina, los Estudiantes pueden seguir existiendo.

Composición
Es una relación más fuerte: una clase es dueña de otra. Si la clase principal desaparece, también lo hacen sus componentes.

class Motor {
    void encender() { ... }
}

class Auto {
    Motor motor = new Motor();
}

Si eliminás el Auto, el Motor también desaparece.

Herencia Simple
La herencia permite que una clase herede atributos y métodos de otra. Con herencia simple, una clase solo hereda de una única clase base.

class Animal {
    void dormir() { ... }
}

class Perro extends Animal {
    void ladrar() { ... }
}

Perro hereda de Animal, así que también puede dormir().

La herencia se usa para reutilizar código y modelar relaciones "es un tipo de".

Herencia Múltiple
La herencia múltiple significa que una clase puede heredar de más de una clase base. En lenguajes como Java, esto no está permitido con clases, pero sí se puede hacer usando interfaces.

interface Nadador {
    void nadar();
}

interface Volador {
    void volar();
}

class Pato implements Nadador, Volador {
    public void nadar() { ... }
    public void volar() { ... }
}

Pato hereda el comportamiento de Nadador y Volador al mismo tiempo.
`,
        videoUrl: "https://www.youtube.com/watch?v=U9-iM-gA7-E",
    },
    {
        id: 3,
        icon: "📗",
        title: "Manejo de excepciones",
        description: "Aprende sobre como manejar los errores que puede producir al ejecutar el código.",
        content: `
En Java, las excepciones son eventos que interrumpen el flujo normal de un programa debido a errores o situaciones inesperadas. El manejo adecuado de excepciones permite que los programas sean más robustos y puedan recuperarse de errores sin finalizar abruptamente.

Jerarquía de Excepciones
Todas las excepciones en Java derivan de la clase base Throwable, que se divide en dos subclases principales:

Error: Representa errores graves del sistema que generalmente no pueden ser manejados por la aplicación, como OutOfMemoryError.
Studocu

Exception: Representa condiciones que una aplicación puede manejar. A su vez, se divide en:

Excepciones comprobadas (Checked Exceptions): El compilador obliga a manejarlas explícitamente, ya sea mediante bloques try-catch o declarando su propagación con throws. Ejemplo: IOException.

Excepciones no comprobadas (Unchecked Exceptions): No es obligatorio manejarlas explícitamente. Derivan de RuntimeException. Ejemplo: NullPointerException.

Esta jerarquía permite organizar y manejar las excepciones de manera estructurada.

Excepciones Encadenadas
A veces, una excepción ocurre como resultado directo de otra. Java permite encadenar excepciones para preservar la causa original del error. Esto es útil para diagnosticar problemas complejos.

Ejemplo:

try {
    // Código que puede lanzar IOException
} catch (IOException e) {
    throw new CustomException("Error al procesar el archivo", e);
}

En este ejemplo, CustomException encapsula la IOException original, permitiendo acceder a la causa raíz mediante métodos como getCause().

Declaración de Nuevos Tipos de Excepciones
Java permite crear excepciones personalizadas para representar errores específicos de una aplicación. Para ello, se define una nueva clase que extiende Exception o RuntimeException, según se desee que sea una excepción comprobada o no comprobada.

Ejemplo:

public class MiExcepcionPersonalizada extends Exception {
    public MiExcepcionPersonalizada(String mensaje) {
        super(mensaje);
    }
}

Esta práctica mejora la claridad y especificidad en el manejo de errores dentro de una aplicación.


`,
        videoUrl: "https://www.youtube.com/watch?v=VHy6xFXJ1Rw",

    },
    {
        id: 4,
        icon: "📚",
        title: "Polimorfismo",
        description: "Define múltiples constructores para flexibilidad.",
        content: `
El polimorfismo es uno de los pilares fundamentales de la Programación Orientada a Objetos (POO), junto con la herencia y el encapsulamiento. En Java, el polimorfismo permite que un objeto de una clase se comporte de diferentes maneras dependiendo del contexto.

El polimorfismo mejora la flexibilidad y reutilización del código, lo que hace que los programas sean más extensibles y fáciles de mantener.

¿Qué es el Polimorfismo?
El polimorfismo significa “muchas formas”, y en Java, se refiere a la capacidad de un objeto de adoptar diferentes formas. A través de la herencia y la sobrescritura de métodos, un objeto puede comportarse de diferentes maneras según su tipo en tiempo de ejecución. Hay dos tipos principales de polimorfismo en Java:

1. Polimorfismo en tiempo de compilación (sobrecarga): Ocurre cuando se define más de un método con el mismo nombre pero diferentes parámetros dentro de una clase.
2. Polimorfismo en tiempo de ejecución (sobrescritura): Se refiere a la capacidad de un método sobrescrito para ser invocado en tiempo de ejecución según el tipo del objeto.

Diferencia entre Sobrecarga y Sobrescritura

- Sobrecarga: El método tiene el mismo nombre pero diferentes parámetros dentro de la misma clase (polimorfismo en tiempo de compilación).
- Sobrescritura: Una subclase redefine un método heredado de la superclase con la misma firma (polimorfismo en tiempo de ejecución).

Ventajas del Polimorfismo

- Flexibilidad: Puedes escribir código que trabaje con la superclase, pero en tiempo de ejecución, los objetos se comportarán según su clase real.
- Reutilización de Código: Evita la duplicación de código, ya que las subclases pueden sobrescribir el comportamiento sin reescribir todo el código de la superclase.
- Extensibilidad: Facilita la ampliación del sistema, ya que puedes agregar nuevas clases sin cambiar el código existente que utiliza la superclase.

Clases Abstractas y Polimorfismo

Las clases abstractas son una característica importante de la programación orientada a objetos en Java. Una clase abstracta es una clase que no se puede instanciar directamente y se utiliza como base para otras clases. Una clase abstracta puede tener métodos abstractos, que son métodos que no tienen una implementación y deben ser implementados por las clases que heredan de la clase abstracta.

Las clases abstractas también juegan un papel importante en la implementación del polimorfismo. Una clase abstracta puede tener métodos abstractos (sin implementación), que las subclases deben sobrescribir, permitiendo comportamientos específicos en cada subclase.

Ejemplo de Polimorfismo con Clases Abstractas

// Clase abstracta
abstract class Forma {
    abstract void dibujar();
}

// Subclase 1
class Circulo extends Forma {
    @Override
    public void dibujar() {
        System.out.println("Dibujando un círculo.");
    }
}

// Subclase 2
class Cuadrado extends Forma {
    @Override
    public void dibujar() {
        System.out.println("Dibujando un cuadrado.");
    }
}

public class Main {
    public static void main(String[] args) {
        Forma forma1 = new Circulo();  // Polimorfismo
        Forma forma2 = new Cuadrado(); // Polimorfismo

        forma1.dibujar(); // Llama al método dibujar() de Circulo
        forma2.dibujar(); // Llama al método dibujar() de Cuadrado
    }
}

Explicación:

- Forma: Es una clase abstracta que define el método abstracto dibujar().
- Circulo y Cuadrado: Son subclases que proporcionan implementaciones específicas del método dibujar().
- Polimorfismo: El tipo de referencia es Forma, pero el comportamiento es determinado por la clase concreta (Circulo o Cuadrado).

Variables y Funciones Polimórficas
En Java, una variable polimórfica es aquella que puede referirse a objetos de diferentes tipos, siempre que estos sean subtipos de la clase o interfaz declarada. Esto permite escribir código más flexible y reutilizable.
Studocu

Ejemplo:

Animal miAnimal = new Perro();
miAnimal.hacerSonido(); // Llama al método de la clase Perro

En este ejemplo, aunque miAnimal es de tipo Animal, se comporta como un Perro en tiempo de ejecución. Esto es posible gracias al enlace dinámico, donde la llamada al método se resuelve en tiempo de ejecución.
`,
        videoUrl: "https://www.youtube.com/watch?v=EFL2U4MsNZw",
    },
    {
        id: 5,
        icon: "📘",
        title: "Programación Orientada a Objetos Avanzada",
        description: "Aprende temas un tanto más avanzados en Programación Orientada a Objetos Avanzada",
        content: `
En esta sección vas a descrubrir herramientas más avanzadas de la Programación Orientada a Objetos que te va a permitir escribir código más limpio, modular y reutilizable.

Clases anidadas en Java

El anidamiento de una clase tiene por objetivo favorecer el encapsulamiento. Una clase anidada se dice que es interna si se la declara dentro de otra clase pero fuera de cualquier método de la clase contenedora.

Puede declararse con cualquiera de los modificadores: private, protected o public.

Una característica fundamental es que una clase interna tiene acceso a todos los atributos de la clase que la contiene, luego para que exista una clase anidada interna es necesario que exista un objeto de la clase contenedora.

El uso adecuado de clases anidadas en Java puede mejorar la modularidad y la organización del código, así como facilitar la implementación de ciertos patrones de diseño, como el patrón Strategy o el patrón Observer. Sin embargo, es importante tener en cuenta que un mal uso de clases anidadas puede complicar la compresión del código y aumentar la complejidad, por lo que se debe utilizar con moderación y siempre con el objetivo de mejorar la estructura y la claridad del código.
        `,
        videoUrl: "https://www.youtube.com/watch?v=4GS-ZsdEW8w",
    },
    {
        id: 6,
        icon: "📕",
        title: "Java Constructores this() y super()",
        description: "Static Method vs instance method",
        content: `
Las palabras reservadas this y super de Java nos sirven para poder acceder a los atributos, métodos y constructores de la clase en la que se encuentran y de la clase padre respectivamente.

Las palabras reservadas this y super de Java nos sirven para poder acceder a los atributos, métodos y constructores de la clase en la que se encuentran y de la clase padre respectivamente.

This en java
This hace referencia al objeto actual de la clase, es decir, a una instancia concreta de la clase y nos sirve para usar los métodos y atributos de esa clase desde alguno de sus métodos, para llamar a otro de sus constructores o simplemente para pasarle el objeto completo a algún otro método u objeto.

Aunque normalmente podemos omitir el this cuando hacemos una llamada a un método o atributo de la misma clase ya que el compilador sabe que pertenece a la clase desde la que se usa porque si no ese método o atributo debería de llevar delante el nombre del objeto al que se refiere, si lo usamos el código puede ser un poco más claro y nos evitamos problemas si alguien crea una variable con el mismo nombre que uno de los atributos de la clase, porque en este caso sí que es necesario usar el this para acceder a la variable de la clase ya que la variable local «oculta» a la de clase.

Por eso normalmente siempre veremos el this. delante de los atributos en los constructores y en los setters ya que lo normal es que los parámetros tengan los mismos nombres que los atributos de la clase, mientras que en los getters no se suele poner porque no hay ninguna duda de a que es a lo que estamos accediendo.

Super en java
Si this nos sirve para hacer referencia a la instancia actual del objeto, super nos sirve para hacer lo propio con la clase padre de nuestro objeto (la clase de la se hace el extends), vamos que nos permite acceso a los constructores, métodos y atributos de la clase de la que hereda.

Constructor this()
Cuando una clase tiene varios constructores podemos usar this() para hacer uso de otro de los constructores de la clase y de este modo nos ahorramos tener que repetir el mismo código en todos los constructores y así solo necesitamos hacer una llamada a otro constructor y añadir el código necesario para las diferencias.

Si se llama a otro constructor con this() siempre hay que hacerlo desde la primera línea del constructor (la primera línea de código, delante puede haber comentario o líneas en blanco) porque si intentamos hacerlo después de otra línea nuestro IDE nos mostrará un error como este Constructor call must be the first statement in a constructor, y no nos compilará.

HomeJavaThis y super en Java
This y super en JavaJava  31 octubre, 2018  0  Iván Salas 
reset css
Las palabras reservadas this y super de Java nos sirven para poder acceder a los atributos, métodos y constructores de la clase en la que se encuentran y de la clase padre respectivamente.

This en java
This hace referencia al objeto actual de la clase, es decir, a una instancia concreta de la clase y nos sirve para usar los métodos y atributos de esa clase desde alguno de sus métodos, para llamar a otro de sus constructores o simplemente para pasarle el objeto completo a algún otro método u objeto.

Aunque normalmente podemos omitir el this cuando hacemos una llamada a un método o atributo de la misma clase ya que el compilador sabe que pertenece a la clase desde la que se usa porque si no ese método o atributo debería de llevar delante el nombre del objeto al que se refiere, si lo usamos el código puede ser un poco más claro y nos evitamos problemas si alguien crea una variable con el mismo nombre que uno de los atributos de la clase, porque en este caso sí que es necesario usar el this para acceder a la variable de la clase ya que la variable local «oculta» a la de clase.

Por eso normalmente siempre veremos el this. delante de los atributos en los constructores y en los setters ya que lo normal es que los parámetros tengan los mismos nombres que los atributos de la clase, mientras que en los getters no se suele poner porque no hay ninguna duda de a que es a lo que estamos accediendo.


package thisysuper;

public class Archivo {
    private String nombre;
    private String extension;
    private String ruta;
        
    public Archivo(String nombre, String extension) {
        this.nombre = nombre;
        this.extension = extension;
        this.ruta = "";
    }

    public Archivo(String nombre, String extension, String ruta) {
        this(nombre, extension);
        this.ruta = ruta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    @Override
    public String toString() {
        return this.getRuta() + this.getNombre() + "." + this.getExtension();
    }

}
En el código anterior también podemos ver como this también se puede usar para llamar a otro de los constructores de la clase.

Super en java
Si this nos sirve para hacer referencia a la instancia actual del objeto, super nos sirve para hacer lo propio con la clase padre de nuestro objeto (la clase de la se hace el extends), vamos que nos permite acceso a los constructores, métodos y atributos de la clase de la que hereda.


package thisysuper;

import java.awt.Dimension;

public class Imagen extends Archivo {
    private Integer ancho;
    private Integer alto;

    public Imagen(String nombre, String extension, String ruta) {
        super(nombre, extension, ruta);
        this.ancho = 1920;
        this.alto = 1080;
    }

    public Imagen(String nombre, String extension, String ruta, Integer ancho, Integer alto) {
        this.ancho = ancho;
        this.alto = alto;
    }

    public Imagen(String nombre, String extension, String ruta, Dimension dimensiones) {
        this(nombre, extension, ruta, dimensiones.width, dimensiones.height);
    }

    public Integer getAncho() {
        return ancho;
    }

    public void setAncho(Integer ancho) {
        this.ancho = ancho;
    }

    public Integer getAlto() {
        return alto;
    }

    public void setAlto(Integer alto) {
        this.alto = alto;
    }

    @Override
    public String toString() {
        return super.toString() + ", Dimensiones: " + this.ancho + " X " + this.alto;
    }

}
En este ejemplo vemos como en el método toString() usamos el super para hacer la llamada al método del padre, aunque en este caso estamos haciendo la llamada al método con el mismo nombre del padre no existe nada que nos impida llamar a otro de sus métodos o a todos los que queramos.


public class Main {

    public static void main(String[] args) {
        Archivo imagen1 = new Imagen("foto", "png", "/home/ivan/Documents/Proyecto/");
        System.out.println(imagen1.toString());
        // /home/ivan/Documents/Proyecto/foto.png, Dimensiones: 1920 X 1080
    }
}
Como el toString() de la clase Imagen llama al de la clase Archivo y luego le concatena los valores de los atributos de la clase imagen el resultado final es nombre del archivo junto con las dimensiones.

También tenemos un ejemplo de una llamada a uno de los constructores de la clase padre desde uno de los constructores para inicializar las propiedades de la clase padre al crear una nueva instancia de la clase hija (en realidad, se está llamando a 2 de los constructores de la clase padre, pero eso lo veremos más adelante).

En este caso no podemos acceder directamente a las propiedades de la clase padre con super. porque las declaramos como privadas y super solo nos permite acceder a los métodos y atributos declarados como public o protected, es decir que no nos otorga ningún privilegio de acceso extra.

Constructor this()
Cuando una clase tiene varios constructores podemos usar this() para hacer uso de otro de los constructores de la clase y de este modo nos ahorramos tener que repetir el mismo código en todos los constructores y así solo necesitamos hacer una llamada a otro constructor y añadir el código necesario para las diferencias.

Si se llama a otro constructor con this() siempre hay que hacerlo desde la primera línea del constructor (la primera línea de código, delante puede haber comentario o líneas en blanco) porque si intentamos hacerlo después de otra línea nuestro IDE nos mostrará un error como este Constructor call must be the first statement in a constructor, y no nos compilará.

Por ejemplo podríamos tener estos 4 constructores donde tenemos un constructor sin parámetros que rellena los atributos con los valores por defecto y un constructor con un parámetro, otro con 2 y otro con los 3 y cada uno de ellos llama al constructor que tiene un parámetro menos.


public Archivo() {
    this.nombre = "archivo";
    this.extension = "txt";
    this.ruta = "";
}

public Archivo(String nombre) {
    this();
    this.nombre = nombre;
}
    
public Archivo(String nombre, String extension) {
    this(nombre);
    this.extension = extension;
}
    
public Archivo(String nombre, String extension, String ruta) {
    this(nombre, extension);
    this.ruta = ruta;
}
Como la llamada desde cada constructor a otro de los constructores de la clase se hace en la primera línea en el caso de nuestro ejemplo primero se llama al constructor sin parámetros, luego al que tiene 1, después al que tiene 2 y finalmente al que tiene 3 y por lo tanto siempre conseguimos inicializar nuestro objeto correctamente.


public class Main {

    public static void main(String[] args) {
        Archivo archivo1 = new Archivo();
        System.out.println(archivo1.toString());
        // archivo.txt

        Archivo archivo2= new Archivo("lista_compra");
        System.out.println(archivo2.toString());
        // lista_compra.txt

        Archivo archivo3 = new Archivo("lista_compra", "doc");
        System.out.println(archivo3.toString());
        // lista_compra.doc

        Archivo archivo4 = new Archivo("lista_compra", "doc", "/home/ivan/Documents/");
        System.out.println(archivo4.toString());
        // /home/ivan/Documents/lista_compra.doc
    }
}
Constructor super()
Si una clase hereda de otra sus constructores en su primera línea siempre tienen que llamar a alguno de los constructores de clase padre con super() o a otro de sus constructores con this() de forma que al final siempre se llame a alguno de los constructores de la clase padre.

Si la clase padre tiene un constructor sin parámetros entonces no es necesario hacer la llamada con super() porque por defecto Java hace la llamada al constructor sin parámetros de la clase padre, que es lo que sucede con este constructor.
`,
        videoUrl: "https://www.youtube.com/watch?v=p1GLnII4W2I&pp=ygUfY29uc3RydWN0b3JlcyB0aGlzIHkgc3VwZXIgamF2YQ%3D%3D",
    },
    {
        id: 7,
        icon: "📗",
        title: "Sobre escritura de métodos (@Override)",
        description: "Sobre escritura de métodos (@Override)",
        content: `
¿Qué es @Override en Java?
@Override en Java es una anotación que se usa para dejar claro que un método en una clase hija está reemplazando o modificando el comportamiento de un método que ya existe en su clase padre. En otras palabras, con esta anotación te aseguras de que realmente estás sobrescribiendo un método que ya existe y no creando uno nuevo por equivocación.

Te servirá mucho, ya que sin darte cuenta podrías cometer errores como cambiar el nombre del método o equivocarte en los parámetros. Cuando esto pasa, el compilador no sabría que estás intentando sobrescribir el método, lo que puede llevar a errores en el programa que son complicados de identificar.

¿Por qué usar siempre @Override en Java?
Existen unas ventajas técnicas que te dará el uso constante de @Override en Java:

Evita errores de sobreescritura: Cuando no usas esta anotación, corres el riesgo de sobrecargar un método en lugar de sobrescribirlo. Esto genera que el método de la clase padre se siga utilizando y, por ende, se producen resultados incorrectos o inesperados en tu aplicación.
Mejora la legibilidad del código: Al usar @Override, cualquier persona que lea tu código sabrá que ese método pertenece a una jerarquía de clases y que ha sido sobrescrito para proporcionar un comportamiento específico.
Facilita la depuración: En el momento en el que trabajes con múltiples clases y jerarquías complejas, tener esta anotación te ayudará a identificar rápidamente si un método está sobrescrito y desde qué clase padre proviene.
Ejemplo práctico de @Override en Java
En este ejemplo vas a crear un programa en el que diferentes animales hacen distintos sonidos. Tienes una clase base llamada Animal, y luego dos clases hijas: Perro y Gato, cada una sobrescribiendo el método hacerSonido() de la clase padre.

Código de las clases
// Clase base
package com.ejemplo;

public class Animal {
    public void hacerSonido() {
        System.out.println("El animal hace un sonido");
    }
}
En este caso, tienes un método hacerSonido() en la clase Animal que imprime un mensaje genérico. Ahora, vas a crear las clases hijas Perro y Gato que sobrescriben ese método para hacer un sonido específico.

// Clase hija Perro
package com.ejemplo;

public class Perro extends Animal {
    @Override
    public void hacerSonido() {
        System.out.println("El perro ladra: ¡Guau!");
    }
}

// Clase hija Gato
package com.ejemplo;

public class Gato extends Animal {
    @Override
    public void hacerSonido() {
        System.out.println("El gato maúlla: ¡Miau!");
    }
}
Puedes ver que ya sobrescribiste el método hacerSonido() en ambas clases hijas. El perro ahora ladra y el gato maúlla, pero todo sigue dependiendo del método definido en la clase Animal.

¿Por qué @Override no es opcional?
La mayoría de los desarrolladores piensan que no pasará nada si no usan @Override. Sin embargo, ya viste que pueden surgir problemas serios en la gestión de clases y en la lógica de tu programa.

Ventajas de usar @Override
Detección temprana de errores: Si cometes un error tipográfico en el nombre de un método o en sus parámetros, el compilador te advertirá de inmediato que no estás sobrescribiendo ningún método, evitando así bugs potenciales.
Claridad y mantenimiento: Con @Override en Java, tu código será más legible y fácil de mantener, ya que los futuros desarrolladores (o tú mismo) podrán entender rápidamente qué métodos están sobrescritos.
Facilita el refactoring: Si en algún momento decides cambiar la estructura de tus clases, la presencia de @Override te ayudará a identificar fácilmente qué métodos se ven afectados por esos cambios.
        `,
        videoUrl: "https://www.youtube.com/watch?v=14Bo_fNtLZY",
    },
    {
        id: 8,
        icon: "📘",
        title: "Principios SOLID y buenas prácticas",
        description: "SOLID",
        content: `Los Principios SOLID tienen cinco principios de diseño de clases Orientado a Objetos. Son un conjunto de reglas y mejores prácticas a seguir al diseñar una estructura de clase.

Estos cinco principios nos ayudan a comprender la necesidad de ciertos patrones de diseño y arquitectura de software en general. Así que creo que es un tema que todo desarrollador debería aprender.

Siguiendo el acrónimo inglés SOLID, son:

- El Principio de responsabilidad única (Single Responsibility Principle)
- El Principio Abierto-Cerrado (Open-Closed Principle)
- El Principio de sustitución de Liskov (Liskov Substitution Principle)
- El Principio de segregación de interfaz (Interface Segregation Principle)
- El Principio de inversión de dependencia (Dependency Inversion Principle)

Principio de responsabilidad única

El Principio de Responsabilidad Única dice que una clase debe hacer una cosa y, por lo tanto, debe tener una sola razón para cambiar.

Para enunciar este principio más técnicamente: Solo un cambio potencial (lógica de base de datos, lógica de registro, etc.) en la especificación del software debería poder afectar la especificación de la clase.

Esto significa que si una clase es un contenedor de datos, como una clase Libro o una clase Estudiante, y tiene algunos campos relacionados con esa entidad, debería cambiar solo cuando cambiamos el modelo de datos.

Es importante seguir el principio de responsabilidad única. En primer lugar, debido a que muchos equipos diferentes pueden trabajar en el mismo proyecto y editar la misma clase por diferentes motivos, esto podría dar lugar a módulos incompatibles.

En segundo lugar, facilita el control de versiones. Por ejemplo, digamos que tenemos una clase de persistencia que maneja las operaciones de la base de datos y vemos un cambio en ese archivo en las confirmaciones de GitHub. Al seguir el PRU, sabremos que está relacionado con el almacenamiento o con cosas relacionadas con la base de datos.

Los conflictos de fusión son otro ejemplo. Aparecen cuando diferentes equipos modifican el mismo archivo. Pero si se sigue el PRU, aparecerán menos conflictos: los archivos tendrán una sola razón para cambiar y los conflictos que existen serán más fáciles de resolver.

Trampas comunes y Anti-patrones
En esta sección, veremos algunos errores comunes que violan el Principio de Responsabilidad Única. Luego hablaremos sobre algunas formas de solucionarlos.

Veremos el código de un programa simple de facturación de librería como ejemplo. Comencemos definiendo una clase de libro para usar en nuestra factura.

class Libro {
	String nombre;
	String nombreAutor;
	int anyo;
	int precio;
	String isbn;

	public Libro(String nombre, String nombreAutor, int anyo, int precio, String isbn) {
		this.nombre = nombre;
		this.nombreAutor = nombreAutor;
		this.anyo = anyo;
        this.precio = precio;
		this.isbn = isbn;
	}
}
Esta es una clase de libro simple con algunos campos. Nada sofisticado. No estoy haciendo que los campos sean privados para que no tengamos que lidiar con getters y setters y podamos centrarnos en la lógica.

Ahora vamos a crear la clase de factura que contendrá la lógica para crear la factura y calcular el precio total. Por ahora, suponga que nuestra librería solo vende libros y nada más.

public class Factura {

	private Libro libro;
	private int cantidad;
	private double tasaDescuento;
	private double tasaImpuesto;
	private double total;

	public Factura(Libro libro, int cantidad, double tasaDescuento, double tasaImpuesto) {
		this.libro = libro;
		this.cantidad = cantidad;
		this.tasaDescuento = tasaDescuento;
		this.tasaImpuesto = tasaImpuesto;
		this.total = this.calculaTotal();
	}

	public double calculaTotal() {
	        double precio = ((libro.precio - libro.precio * tasaDescuento) * this.cantidad);

		double precioConImpuestos = precio * (1 + tasaImpuesto);

		return precioConImpuestos;
	}

	public void imprimeFactura() {
            System.out.println(cantidad + "x " + libro.nombre + " " +          libro.precio + "$");
            System.out.println("Tasa de Descuento: " + tasaDescuento);
            System.out.println("Tasa de Impuesto: " + tasaImpuesto);
            System.out.println("Total: " + total);
	}

        public void guardarArchivo(String nombreArchivo) {
	// Crea un archivo con el nombre dado y escribe la factura.
	}

}
Aquí está nuestra clase de Factura. También contiene algunos campos sobre facturación y 3 métodos:

calculaTotal método que calcula el precio total,
imprimeFactura método que debería imprimir la factura por consola, y
guardaArchivo método responsable de escribir la factura en un archivo.
Debe darse un segundo para pensar en lo que está mal con este diseño de clase antes de leer el siguiente párrafo.

Bien, entonces, ¿qué está pasando aquí? Nuestra clase viola el Principio de Responsabilidad Única de múltiples maneras.

La primera violación es el método imprimeFactura, el cual contiene nuestra lógica de impressión. El PRU establece que nuestra clase solo debería tener una única razón para cambiar, y esa razón debería ser un cambio en el cálculo de la factura para nuestra clase.

Pero en esta arquitectura, si queremos cambiar el formato de impresión, necesitaríamos cambiar la clase. Esta es la razón por la que no deberíamos tener lógica de impresión mezclada con lógica de negocios en la misma clase.

Hay otro método que viola el PRU en nuestra clase: el método guardarArchivo. También es un error extremadamente común mezclar la lógica de persistencia con la lógica de negocios.

No piense solo en términos de escribir en un archivo, podría ser guardarlo en una base de datos, hacer una llamada a la API u otras cosas relacionadas con la persistencia.

Entonces, ¿cómo podemos arreglar esta función de impresión?, puede preguntar.

Podemos crear nuevas clases para nuestra lógica de impresión y persistencia, por lo que ya no necesitaremos modificar la clase de factura para esos fines.

Creamos 2 clases, FacturaImpresion y FacturaPersistencia, y movemos los métodos.

public class FacturaImpresion {
    private Factura factura;

    public FacturaImpresion(Factura factura) {
        this.factura = factura;
    }

    public void imprimir() {
        System.out.println(factura.cantidad + "x " + factura.libro.nombre + " " + factura.libro.precio + " $");
        System.out.println("Tasa de Descuento: " + factura.tasaDescuento);
        System.out.println("Tasa de Impuesto: " + factura.tasaImpuesto);
        System.out.println("Total: " + factura.total + " $");
    }
}
public class FacturaPersistencia {
    Factura factura;

    public FacturaPersistencia(Factura factura) {
        this.factura = factura;
    }

    public void guardarArchivo(String nombreArchivo) {
        // Crea un archivo con el nombre dado y escribe la factura.
    }
}
Ahora nuestra estructura de clases obedece al principio de responsabilidad única y cada clase es responsable de un aspecto de nuestra aplicación.

`,
        videoUrl: "https://www.youtube.com/watch?v=2X50sKeBAcQ",
    },
    // {
    //     id: 9,
    //     icon: "📕",
    //     title: "Polimorfismo",
    //     description: "Interfaz única para diferentes tipos de datos.",
    //     content: ``,
    //     videoUrl: "",
    // },
    // {
    //     id: 10,
    //     icon: "📗",
    //     title: "Encapsulamiento",
    //     description: "Protege los datos dentro de una clase.",
    //     content: ``,
    //     videoUrl: "",
    // },
];
