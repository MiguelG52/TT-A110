// tests/helpers/jwt.helper.test.ts
import jwt from 'jsonwebtoken';
import { generateJWT, verfyJWT } from '../../helpers/jwt.helper';

jest.mock('jsonwebtoken');

describe('jwt.helper.ts', () => {
    const mockSecret = 'test_secret';
    const mockUserId = '123abc';
    const mockToken = 'mock.jwt.token';

    beforeAll(() => {
        process.env.JWT_SECRET = mockSecret;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateJWT', () => {
        it('debería generar un token JWT con el id', async () => {
            (jwt.sign as jest.Mock).mockReturnValue(mockToken);

            const token = await generateJWT(mockUserId);

            expect(jwt.sign).toHaveBeenCalledWith(
                { id: mockUserId },
                mockSecret,
                { expiresIn: '10d' }
            );
            expect(token).toBe(mockToken);
        });
    });

    describe('verfyJWT', () => {
        it('debería verificar y devolver el payload decodificado', async () => {
            const mockPayload = { id: mockUserId };
            (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

            const result = await verfyJWT(mockToken);

            expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret);
            expect(result).toBe(mockPayload);
        });
    });
});
