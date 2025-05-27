
// types/tema.ts
export type Categoria = 'basico' | 'intermedio' | 'avanzado';
export type RecursoTipo = 'articulo' | 'tutorial' | 'documentacion' | 'video' | 'libro';

export interface ContenidoTema {
  theory: string[];
  examples: {
    code: string;
    explain: string;
  }[];
  exercises: number;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  url: string;
  thumbnail?: string;
  description: string;
}

export interface Libro {
  id: string;
  title: string;
  autor: string;
  editorial: string;
  year: number;
  isbn: string;
  description: string;
  portada?: string;
  enlace?: string;
}

export interface Descarga {
  id: string;
  name: string;
  type: string;
  size: string;
  description: string;
  url: string;
}

export interface Recurso {
  id: string;
  title: string;
  type: RecursoTipo;
  url: string;
  description: string;
}

export interface Tema {
  id: string;
  title: string;
  description: string;
  category: Categoria;
  duration: string;
  progress?: number;
  completed: boolean;
  icon?: string;
  content: ContenidoTema;
  videos: Video[];
  books: Libro[];
  downloads: Descarga[];
  recursos: Recurso[];
}


export const TEMAS: Tema[] = [
  {
    id: "1",
    title: "Clases y objetos en Java",
    description: "Aprende sobre las clases y los objetos en Java",
    category: "basico",
    duration: "45 min",
    progress: 75,
    completed: false,
    icon: "📘",
    content: {
      theory: [
        "En Java, las clases y los objetos son los bloques de construcción fundamentales del lenguaje. Java es un lenguaje orientado a objetos, lo que significa que el diseño de programas se basa en la creación y manipulación de objetos.",
        "Una clase en Java es una plantilla o modelo que define las propiedades (atributos) y comportamientos (métodos) de los objetos que se crean a partir de ella. Las clases son las definiciones de los tipos de objetos que pueden existir en el sistema.",
        "Los objetos son instancias de clases. Cuando se crea un objeto, se reserva memoria y se inicializan los atributos definidos en la clase.",
        "El encapsulamiento es una característica de la POO que oculta los detalles internos de una clase y expone solo lo necesario a través de métodos públicos."
      ],
      examples: [
        {
          code: `public class Persona {\n  // Atributos\n  String name;\n  int edad;\n\n  // Constructor\n  public Persona(String name, int edad) {\n    this.name = name;\n    this.edad = edad;\n  }\n\n  // Métodos\n  public void saludar() {\n    System.out.println("Hola, mi name es " + name);\n  }\n}`,
          explain: "Definición básica de una clase Persona con atributos, constructor y método."
        },
        {
          code: `public class Main {\n  public static void main(String[] args) {\n    // Crear objeto\n    Persona persona1 = new Persona("Carlos", 25);\n    \n    // Llamar método\n    persona1.saludar();\n  }\n}`,
          explain: "Creación de un objeto y llamada a un método."
        }
      ],
      exercises: 5
    },
    videos: [
      {
        id: "1",
        title: "Introducción a las Clases en Java",
        duration: "12:30",
        url: "https://www.youtube.com/watch?v=SI7O81GMG2A",
        description: "Conceptos básicos sobre qué son las clases y cómo se definen en Java."
      },
      {
        id: "2",
        title: "Creando tu Primera Clase",
        duration: "15:45",
        url: "https://www.youtube.com/watch?v=abc456",
        description: "Tutorial paso a paso para crear una clase desde cero."
      }
    ],
    books: [
      {
        id: "1",
        title: "Java: The Complete Reference",
        autor: "Herbert Schildt",
        editorial: "McGraw-Hill Education",
        year: 2021,
        isbn: "978-1260463330",
        description: "Una guía completa y actualizada de Java que cubre desde los fundamentos hasta las características más avanzadas del lenguaje.",
        enlace: "https://example.com/libro-java"
      }
    ],
    downloads: [
      {
        id: "1",
        name: "Ejemplos de Clases - Código Fuente",
        type: "ZIP",
        size: "2.5 MB",
        description: "Código fuente de todos los examples mostrados en la lección.",
        url: "/downloads/clases-examples.zip"
      }
    ],
    recursos: [
      {
        id: "1",
        title: "Documentación Oficial de Oracle - Classes",
        type: "documentacion",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html",
        description: "Documentación oficial de Oracle sobre clases en Java."
      }
    ]
  },
  {
    id: "2",
    title: "Relaciones entre clases",
    description: "Aprende como estas relaciones definen cómo interactúan y se conectan las clases entre sí.",
    category: "basico",
    duration: "30 min",
    progress: 60,
    completed: false,
    icon: "📕",
    content: {
      theory: [
        "En la programación orientada a objetos, las clases no siempre trabajan solas. Muchas veces se relacionan entre sí para construir soluciones más completas.",
        "Existen tres tipos principales de relaciones: asociación, agregación y composición. Cada una tiene un nivel diferente de dependencia entre las clases.",
        "La herencia permite que una clase herede atributos y métodos de otra. En Java se usa herencia simple (una clase solo hereda de una superclase).",
        "Las interfaces permiten simular herencia múltiple y definir contratos que las clases deben implementar."
      ],
      examples: [
        {
          code: `// Asociación\nclass Profesor {}\nclass Curso {\n  Profesor profesor;\n}`,
          explain: "Relación simple donde una clase contiene referencia a otra."
        },
        {
          code: `// Herencia\nclass Animal {\n  void dormir() { /*...*/ }\n}\n\nclass Perro extends Animal {\n  void ladrar() { /*...*/ }\n}`,
          explain: "Ejemplo de herencia donde Perro hereda de Animal."
        }
      ],
      exercises: 4
    },
    videos: [
      {
        id: "1",
        title: "Relaciones entre Clases en Java",
        duration: "18:20",
        url: "https://www.youtube.com/watch?v=U9-iM-gA7-E",
        description: "Explicación detallada de los diferentes tipos de relaciones."
      }
    ],
    books: [],
    downloads: [
      {
        id: "1",
        name: "Diagramas de Relaciones",
        type: "PDF",
        size: "1.8 MB",
        description: "Ejemplos visuales de diferentes relaciones entre clases.",
        url: "/downloads/diagramas-relaciones.pdf"
      }
    ],
    recursos: [
      {
        id: "1",
        title: "Guía de Diseño OO",
        type: "articulo",
        url: "https://example.com/guia-diseno-oo",
        description: "Artículo sobre mejores prácticas en relaciones entre clases."
      }
    ]
  },
  {
    id: "3",
    title: "Manejo de excepciones",
    description: "Aprende sobre como manejar los errores que puede producir al ejecutar el código.",
    category: "intermedio",
    duration: "50 min",
    progress: 40,
    completed: false,
    icon: "📗",
    content: {
      theory: [
        "Las excepciones son eventos que interrumpen el flujo normal de un programa debido a errores o situaciones inesperadas.",
        "Java tiene una jerarquía de excepciones donde todas derivan de Throwable, dividiéndose en Error (errores graves) y Exception (condiciones manejables).",
        "Las excepciones comprobadas (checked) deben ser declaradas o manejadas, mientras que las no comprobadas (unchecked) no son obligatorias.",
        "El bloque try-catch-finally permite manejar excepciones de manera controlada."
      ],
      examples: [
        {
          code: `try {\n  FileInputStream file = new FileInputStream("archivo.txt");\n} catch (FileNotFoundException e) {\n  System.out.println("Archivo no encontrado");\n}`,
          explain: "Manejo básico de excepciones con try-catch."
        },
        {
          code: `public void leerArchivo() throws IOException {\n  // Código que puede lanzar IOException\n}`,
          explain: "Declaración de excepciones con throws."
        }
      ],
      exercises: 7
    },
    videos: [
      {
        id: "1",
        title: "Manejo de Excepciones en Java",
        duration: "22:15",
        url: "https://www.youtube.com/watch?v=VHy6xFXJ1Rw",
        description: "Fundamentos del manejo de excepciones en Java."
      }
    ],
    books: [
      {
        id: "1",
        title: "Effective Java",
        autor: "Joshua Bloch",
        editorial: "Addison-Wesley",
        year: 2018,
        isbn: "978-0134685991",
        description: "Incluye un excelente capítulo sobre manejo de excepciones.",
        enlace: "https://example.com/effective-java"
      }
    ],
    downloads: [
      {
        id: "1",
        name: "Cheat Sheet Excepciones",
        type: "PDF",
        size: "0.8 MB",
        description: "Resumen de las excepciones más comunes en Java.",
        url: "/downloads/excepciones-cheatsheet.pdf"
      }
    ],
    recursos: []
  },
  {
    id: "4",
    title: "Polimorfismo",
    description: "Define múltiples constructores para flexibilidad.",
    category: "intermedio",
    duration: "35 min",
    progress: 30,
    completed: false,
    icon: "📚",
    content: {
      theory: [
        "El polimorfismo permite que un objeto de una clase se comporte de diferentes maneras dependiendo del contexto.",
        "Existen dos tipos principales: polimorfismo en tiempo de compilación (sobrecarga) y en tiempo de ejecución (sobrescritura).",
        "Las clases abstractas pueden tener métodos abstractos que las subclases deben implementar, permitiendo comportamientos específicos.",
        "El polimorfismo mejora la flexibilidad, reutilización de código y extensibilidad del sistema."
      ],
      examples: [
        {
          code: `abstract class Forma {\n  abstract void dibujar();\n}\n\nclass Circulo extends Forma {\n  void dibujar() {\n    System.out.println("Dibujando círculo");\n  }\n}`,
          explain: "Clase abstracta con método polimórfico."
        },
        {
          code: `class Calculadora {\n  // Sobrecarga\n  int sumar(int a, int b) { return a + b; }\n  double sumar(double a, double b) { return a + b; }\n}`,
          explain: "Ejemplo de sobrecarga de métodos."
        }
      ],
      exercises: 4
    },
    videos: [
      {
        id: "1",
        title: "Polimorfismo en Java",
        duration: "14:50",
        url: "https://www.youtube.com/watch?v=EFL2U4MsNZw",
        description: "Explicación detallada del polimorfismo."
      }
    ],
    books: [],
    downloads: [],
    recursos: [
      {
        id: "1",
        title: "Tutorial de Polimorfismo",
        type: "tutorial",
        url: "https://example.com/tutorial-polimorfismo",
        description: "Tutorial interactivo sobre polimorfismo."
      }
    ]
  },
  {
    id: "5",
    title: "Programación Orientada a Objetos Avanzada",
    description: "Aprende temas un tanto más avanzados en Programación Orientada a Objetos Avanzada",
    category: "avanzado",
    duration: "60 min",
    progress: 20,
    completed: false,
    icon: "📘",
    content: {
      theory: [
        "Las clases anidadas favorecen el encapsulamiento y pueden ser estáticas o internas.",
        "Las clases internas tienen acceso a todos los atributos de la clase contenedora.",
        "El uso adecuado de clases anidadas mejora la modularidad y organización del código.",
        "Patrones como Strategy o Observer pueden implementarse eficientemente con clases anidadas."
      ],
      examples: [
        {
          code: `public class Externa {\n  private int valor;\n  \n  class Interna {\n    void mostrar() {\n      System.out.println(valor); // Accede a valor de Externa\n    }\n  }\n}`,
          explain: "Clase interna accediendo a atributo de la clase contenedora."
        }
      ],
      exercises: 8
    },
    videos: [
      {
        id: "1",
        title: "POO Avanzada en Java",
        duration: "25:30",
        url: "https://www.youtube.com/watch?v=4GS-ZsdEW8w",
        description: "Conceptos avanzados de POO."
      }
    ],
    books: [],
    downloads: [
      {
        id: "1",
        name: "Ejemplos POO Avanzada",
        type: "ZIP",
        size: "3.2 MB",
        description: "Proyecto con examples avanzados.",
        url: "/downloads/poo-avanzada.zip"
      }
    ],
    recursos: []
  },
  {
    id: "6",
    title: "Java Constructores this() y super()",
    description: "Static Method vs instance method",
    category: "intermedio",
    duration: "40 min",
    progress: 15,
    completed: false,
    icon: "📕",
    content: {
      theory: [
        "this() se usa para llamar a otro constructor de la misma clase, mientras que super() llama al constructor de la superclase.",
        "Las llamadas a this() o super() deben ser la primera instrucción en un constructor.",
        "this también se refiere a la instancia actual y puede usarse para acceder a miembros de la clase.",
        "super permite acceder a miembros de la superclase, útiles cuando hay sobrescritura."
      ],
      examples: [
        {
          code: `public class Persona {\n  private String name;\n  \n  public Persona() {\n    this("Desconocido"); // Llama al otro constructor\n  }\n  \n  public Persona(String name) {\n    this.name = name;\n  }\n}`,
          explain: "Uso de this() para reutilizar constructores."
        },
        {
          code: `class Hijo extends Padre {\n  public Hijo() {\n    super(); // Llama al constructor de Padre\n  }\n}`,
          explain: "Uso de super() para llamar al constructor padre."
        }
      ],
      exercises: 5
    },
    videos: [
      {
        id: "1",
        title: "Constructores this y super",
        duration: "18:45",
        url: "https://www.youtube.com/watch?v=p1GLnII4W2I",
        description: "Explicación detallada de this() y super()."
      }
    ],
    books: [],
    downloads: [],
    recursos: []
  },
  {
    id: "7",
    title: "Sobre escritura de métodos (@Override)",
    description: "Sobre escritura de métodos (@Override)",
    category: "intermedio",
    duration: "30 min",
    progress: 10,
    completed: false,
    icon: "📗",
    content: {
      theory: [
        "@Override es una anotación que indica que un método sobrescribe uno de la superclase.",
        "Ayuda a detectar errores como cambios en la firma del método que podrían hacer que no sobrescriba correctamente.",
        "Mejora la legibilidad del código al hacer explícita la intención de sobrescribir.",
        "Es una buena práctica usar siempre @Override cuando se sobrescribe un método."
      ],
      examples: [
        {
          code: `class Animal {\n  public void hacerSonido() {\n    System.out.println("Sonido genérico");\n  }\n}\n\nclass Perro extends Animal {\n  @Override\n  public void hacerSonido() {\n    System.out.println("Guau guau");\n  }\n}`,
          explain: "Sobrescritura correcta con @Override."
        }
      ],
      exercises: 6
    },
    videos: [
      {
        id: "1",
        title: "Sobrescritura de Métodos",
        duration: "12:10",
        url: "https://www.youtube.com/watch?v=14Bo_fNtLZY",
        description: "Cómo y por qué usar @Override."
      }
    ],
    books: [],
    downloads: [],
    recursos: []
  },
  {
    id: "8",
    title: "Principios SOLID y buenas prácticas",
    description: "SOLID",
    category: "avanzado",
    duration: "65 min",
    progress: 5,
    completed: false,
    icon: "📘",
    content: {
      theory: [
        "SOLID son cinco principios de diseño OO: Responsabilidad Única, Abierto/Cerrado, Sustitución de Liskov, Segregación de Interfaces e Inversión de Dependencias.",
        "El Principio de Responsabilidad Única (SRP) establece que una clase debe tener una sola razón para cambiar.",
        "El Principio Abierto/Cerrado (OCP) dice que las entidades deben estar abiertas a extensión pero cerradas a modificación.",
        "Estos principios ayudan a crear código más mantenible, extensible y robusto."
      ],
      examples: [
        {
          code: `// SRP\nclass Factura {\n  void calcularTotal() { /*...*/ }\n}\n\nclass FacturaPersistencia {\n  void guardar(Factura factura) { /*...*/ }\n}`,
          explain: "Separación de responsabilidades."
        },
        {
          code: `// OCP\ninterface Forma {\n  double area();\n}\n\nclass Circulo implements Forma { /*...*/ }\nclass Cuadrado implements Forma { /*...*/ }`,
          explain: "Extensible sin modificar código existente."
        }
      ],
      exercises: 9
    },
    videos: [
      {
        id: "1",
        title: "Principios SOLID en Java",
        duration: "28:20",
        url: "https://www.youtube.com/watch?v=2X50sKeBAcQ",
        description: "Explicación de los 5 principios SOLID."
      }
    ],
    books: [
      {
        id: "1",
        title: "Clean Code",
        autor: "Robert C. Martin",
        editorial: "Prentice Hall",
        year: 2008,
        isbn: "978-0132350884",
        description: "Excelente libro sobre principios SOLID y más.",
        enlace: "https://example.com/clean-code"
      }
    ],
    downloads: [],
    recursos: []
  },
  {
    id: "9",
    title: "Polimorfismo Avanzado",
    description: "Interfaz única para diferentes tipos de datos.",
    category: "avanzado",
    duration: "50 min",
    progress: 0,
    completed: false,
    icon: "📕",
    content: {
      theory: [
        "El polimorfismo permite tratar objetos de diferentes clases de manera uniforme a través de interfaces comunes.",
        "Las variables polimórficas pueden referirse a objetos de diferentes tipos que compartan una superclase o interfaz.",
        "El enlace dinámico resuelve en tiempo de ejecución qué método debe llamarse.",
        "Patrones como Factory y Strategy aprovechan el polimorfismo para mayor flexibilidad."
      ],
      examples: [
        {
          code: `interface Instrumento {\n  void tocar();\n}\n\nclass Guitarra implements Instrumento { /*...*/ }\nclass Piano implements Instrumento { /*...*/ }\n\n// Uso polimórfico\nInstrumento instrumento = new Guitarra();\ninstrumento.tocar();`,
          explain: "Polimorfismo a través de interfaz."
        }
      ],
      exercises: 7
    },
    videos: [],
    books: [],
    downloads: [],
    recursos: []
  },
  {
    id: "10",
    title: "Encapsulamiento",
    description: "Protege los datos dentro de una clase.",
    category: "basico",
    duration: "40 min",
    progress: 0,
    completed: false,
    icon: "📗",
    content: {
      theory: [
        "El encapsulamiento oculta los detalles internos de una clase y expone solo una interfaz controlada.",
        "Se logra declarando atributos como private y proporcionando métodos públicos get/set.",
        "Protege la integridad de los datos al controlar cómo se accede y modifica el estado interno.",
        "Facilita el mantenimiento al permitir cambiar la implementación interna sin afectar el código que usa la clase."
      ],
      examples: [
        {
          code: `public class Coche {\n  private String marca;\n  \n  public String getMarca() {\n    return marca;\n  }\n  \n  public void setMarca(String marca) {\n    if(marca != null) {\n      this.marca = marca;\n    }\n  }\n}`,
          explain: "Encapsulamiento con validación en setter."
        }
      ],
      exercises: 6
    },
    videos: [],
    books: [],
    downloads: [],
    recursos: []
  }
];