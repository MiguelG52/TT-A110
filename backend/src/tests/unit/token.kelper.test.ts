// tests/helpers/token.helper.test.ts
import { generateToken, generateTeamToken } from '../../helpers/token.helper';

describe('token.helper.ts', () => {
    describe('generateToken', () => {
        it('debería generar un número de 6 dígitos como string', () => {
            const token = generateToken();
            expect(typeof token).toBe('string');
            expect(token).toMatch(/^\d{6}$/); // expresión regular: exactamente 6 dígitos
        });

        it('debería estar entre 100000 y 999999', () => {
            const token = parseInt(generateToken(), 10);
            expect(token).toBeGreaterThanOrEqual(100000);
            expect(token).toBeLessThanOrEqual(999999);
        });
    });

    describe('generateTeamToken', () => {
        it('debería generar un token de exactamente 8 caracteres', () => {
            const token = generateTeamToken();
            expect(typeof token).toBe('string');
            expect(token.length).toBe(8);
        });

        it('debería generar un token con solo caracteres válidos', () => {
            const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
            const token = generateTeamToken();
            for (const char of token) {
                expect(validChars).toContain(char);
            }
        });

        it('debería generar tokens diferentes en múltiples ejecuciones', () => {
            const token1 = generateTeamToken();
            const token2 = generateTeamToken();
            expect(token1).not.toBe(token2); // No es imposible que coincidan, pero es muy improbable
        });
    });
});
