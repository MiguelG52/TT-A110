import { generateToken, generateTeamToken } from '../../../src/helpers/token.helper';

describe('Token Helpers', () => {
    describe('generateToken', () => {
        it('debe generar un token numérico de 6 dígitos', () => {
            const token = generateToken();
            expect(token).toMatch(/^\d{6}$/);
            expect(Number(token)).toBeGreaterThanOrEqual(100000);
            expect(Number(token)).toBeLessThanOrEqual(999999);
        });
    });

    describe('generateTeamToken', () => {
        it('debe generar un token de 8 caracteres alfanuméricos', () => {
            const token = generateTeamToken();
            expect(token).toHaveLength(8);
            expect(token).toMatch(/^[A-Za-z0-9@#$%&]{8}$/);
        });

        it('debe generar tokens diferentes en cada llamada', () => {
            const token1 = generateTeamToken();
            const token2 = generateTeamToken();
            expect(token1).not.toBe(token2);
        });
    });
});