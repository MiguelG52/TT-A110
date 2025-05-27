// tests/helpers/base64.helper.test.ts
import { encodeBase64, decodeBase64 } from '../../helpers/base64.helper';

describe('base64.helper.ts', () => {
    const originalString = 'Texto de prueba 123!@#';
    const encodedString = Buffer.from(originalString, 'utf-8').toString('base64');

    describe('encodeBase64', () => {
        it('debería codificar una cadena a base64', () => {
            const result = encodeBase64(originalString);
            expect(result).toBe(encodedString);
        });
    });

    describe('decodeBase64', () => {
        it('debería decodificar una cadena base64 al texto original', () => {
            const result = decodeBase64(encodedString);
            expect(result).toBe(originalString);
        });
    });

    describe('código inverso', () => {
        it('encodeBase64 seguido de decodeBase64 debería devolver el mismo string', () => {
            const result = decodeBase64(encodeBase64(originalString));
            expect(result).toBe(originalString);
        });

        it('decodeBase64 seguido de encodeBase64 debería devolver la misma cadena base64', () => {
            const result = encodeBase64(decodeBase64(encodedString));
            expect(result).toBe(encodedString);
        });
    });
});
