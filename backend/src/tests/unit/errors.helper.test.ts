// tests/helpers/errors.helper.test.ts
import { sendAuthError } from '../../helpers/errors.helper';
import { Response } from 'express';

describe('errors.helper.ts', () => {
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería enviar una respuesta con status 401 por defecto', () => {
        sendAuthError(mockRes as Response, 'Acceso denegado');

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Acceso denegado' });
    });

    it('debería enviar una respuesta con un código personalizado', () => {
        sendAuthError(mockRes as Response, 'Token expirado', 403);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Token expirado' });
    });
});
