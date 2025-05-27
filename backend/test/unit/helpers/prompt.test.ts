import { createPrompt } from '../../../src/helpers/prompt';

describe('Prompt Helper', () => {
    it('debe generar un prompt estructurado para código Java', () => {
        const javaCode = 'public class Test { void method() {} }';
        const prompt = createPrompt(javaCode);

        expect(prompt).toContain('Eres un experto en Java y Clean Code');
        expect(prompt).toContain(javaCode);
        expect(prompt).toContain('"recommendations": [');
        expect(prompt).toContain('"analysisSummary":');
    });

    it('debe incluir el código proporcionado', () => {
        const testCode = 'CÓDIGO_DE_PRUEBA';
        const prompt = createPrompt(testCode);
        expect(prompt).toContain(testCode);
    });
});