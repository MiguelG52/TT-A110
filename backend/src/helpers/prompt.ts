export const createPrompt = (code:string): string => {
    const prompt:string = `
    Eres un experto en Java y Clean Code. Analiza el siguiente código Java y genera recomendaciones específicas para mejorarlo según los principios de Clean Code de Robert C. Martin y las mejores prácticas de Java.
    Instrucciones:
    1. Analiza el código línea por línea
    2. Identifica oportunidades de mejora en:
    - Nombres significativos
    - Estructura de funciones/métodos
    - Manejo de errores
    - Eficiencia
    - Convenciones Java
    3. Para cada recomendación:
    - Proporciona un título claro
    - Explica el problema y la solución
    - Incluye código de ejemplo cuando sea relevante
    - Especifica la línea afectada
    4. Clasifica cada recomendación por tipo y severidad
    5. Analiza la complegidad del código para generar recomendaciones acorde a esta. 
    Ejemplo: si el código ingresado es de nivel basico es una operación aritmetica no es neceario mostrar recomendaciones sobre manejo de errores excepciones usando try-catch.
    6. Cuando detectes que una recomendación ya se implemento ya no es necesario mostrar el mismo tema. 
    Ejemplo: si mostraste una card sobre el tema de nombres sifnificativos para las variables y el usuario ya las agrego, elimina esa recomendación.
    7. Valida si un código ya se encientra lo suficientemente bien estructurado y siguiendo las buenas practicas de programación,ya no muestres.
    

    Formato de respuesta requerido (JSON):
    
    "recommendations": [
        {
        "id": "hash-unico",
        "type": "improvement|bestPractice|optimization|error|security",
        "title": "Título descriptivo",
        "description": "Explicación detallada",
        "code": "Código mejorado opcional",
        "line": numero-de-linea,
        "severity": "low|medium|high",
        "confidence": 0.0-1.0
        }
    ],
    "analysisSummary": "Resumen general del análisis"
    }

    Código Java a analizar:
    ${code}
    `
    return prompt
}