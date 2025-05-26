export const createPrompt = (variables: Record<string, any>): string => {

const prompt = `
Analiza el siguiente código Java según los principios de Clean Code de Robert C. Martin.
Identifica al menos 3 áreas de mejora y sugiere refactorizaciones. Recuerda que el código debe ser legible, mantenible y fácil de entender.
Debe estar basado en los primeros 3 capitulos del libro "Clean Code: A Handbook of Agile Software Craftsmanship" de Robert C. Martin.
El código debe seguir los principios de Clean Code, como nombres significativos, funciones pequeñas y cohesivas, y evitar la duplicación de código, haciendo énfasis en la legibilidad y mantenibilidad.

Código:
${variables.javaCode}

Responde en formato JSON con este esquema:
{
  "suggestions": [
    {
      "line": number,
      "suggestion": string,
      "improvedCode": string,
      "principle": string
    }
  ]
}

Ejemplo de respuesta:
{
  "suggestions": [
    {
      "line": 5,
      "suggestion": "El nombre del método no es descriptivo",
      "improvedCode": "public double calculateMonthlyInterest() {...}",
      "principle": "Nombres significativos"
    }
  ]
}`;
  return prompt;
}