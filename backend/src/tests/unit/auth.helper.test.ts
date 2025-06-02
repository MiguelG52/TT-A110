// tests/helpers/auth.helper.test.ts
import bcrypt from 'bcrypt';
import {
    hashPassword,
    verifyPassword,
    extractTokenFromHeader,
} from '../../helpers/auth.helper';

jest.mock('bcrypt');

describe('auth.helper.ts', () => {
    const mockPassword = 'MySecret123';
    const mockHash = 'hashedPassword';
    const mockSalt = 'salt';

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('hashPassword', () => {
        it('debería generar un hash con salt', async () => {
            (bcrypt.genSalt as jest.Mock).mockResolvedValue(mockSalt);
            (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);

            const result = await hashPassword(mockPassword);

            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, mockSalt);
            expect(result).toBe(mockHash);
        });
    });

    describe('verifyPassword', () => {
        it('debería verificar si la contraseña coincide con el hash', async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            const result = await verifyPassword(mockPassword, mockHash);

            expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHash);
            expect(result).toBe(true);
        });

        it('debería devolver false si no coincide', async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            const result = await verifyPassword(mockPassword, mockHash);

            expect(result).toBe(false);
        });
    });

    describe('extractTokenFromHeader', () => {
        it('debería extraer el token correctamente de un header válido', () => {
            const token = '123abc.token';
            const header = `Bearer ${token}`;
            const result = extractTokenFromHeader(header);
            expect(result).toBe(token);
        });

        it('debería devolver null si el header es undefined', () => {
            const result = extractTokenFromHeader(undefined);
            expect(result).toBeNull();
        });

        it('debería devolver null si el header no empieza con "Bearer "', () => {
            const result = extractTokenFromHeader('Basic 1234');
            expect(result).toBeNull();
        });
    });
});
