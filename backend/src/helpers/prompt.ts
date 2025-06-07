export const createPrompt = (code: string): string => {
    const prompt: string = `
    Eres un experto en Java y Clean Code. Analiza el siguiente código Java y genera recomendaciones específicas para mejorarlo según los principios de Clean Code de Robert C. Martin y las mejores prácticas de Java.
    Instrucciones:
    1. Analiza el código línea por línea
    2. Identifica oportunidades de mejora en:
    - Nombres significativos
    - Estructura de funciones/métodos
    - Principios SOLID
    - Manejo de errores
    - Eficiencia
    - Convenciones Java
    3. Para cada recomendación:
    - Proporciona un título claro
    - Explica el problema y la solución
    - Incluye código de ejemplo cuando sea relevante
    - Especifica la línea afectada
    4. Clasifica cada recomendación por tipo y severidad

    Restricciones:
    1. Si las variables a renombrar ya tienen un nombre descriptivo dejalo tal cual esta, simplemente considera que las variables no contengan numeros
    2. Analiza la complejidad del código y ve si aplica las oportunidades de mejora como:
    - Estructura de funciones/métodos
    - Principios SOLID
    - Manejo de errores, en especial ve que tan complejo es el código, es decir si la tarea es algo básico o nivel principante omite el manejo de erroesss
    - Eficiencia

    Formato de respuesta requerido (JSON):
    {
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
    return prompt
}