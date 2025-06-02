// tests/helpers/responses.helper.test.ts
import { sendSuccessResponse, sendErrorResponse } from '../../helpers/responses.helper';
import { Response } from 'express';

describe('responses.helper.ts', () => {
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

    describe('sendSuccessResponse', () => {
        it('debería enviar una respuesta de éxito con mensaje y datos', () => {
            const status = 200;
            const message = 'Operación exitosa';
            const data = { id: 1, name: 'Test' };

            sendSuccessResponse(mockRes as Response, status, message, data);

            expect(mockRes.status).toHaveBeenCalledWith(status);
            expect(mockRes.json).toHaveBeenCalledWith({ message, data });
        });

        it('debería enviar una respuesta de éxito con data vacía por defecto', () => {
            const status = 201;
            const message = 'Creado correctamente';

            sendSuccessResponse(mockRes as Response, status, message);

            expect(mockRes.status).toHaveBeenCalledWith(status);
            expect(mockRes.json).toHaveBeenCalledWith({ message, data: {} });
        });
    });

    describe('sendErrorResponse', () => {
        it('debería enviar una respuesta de error con mensaje de error', () => {
            const status = 400;
            const error = 'Solicitud inválida';

            sendErrorResponse(mockRes as Response, status, error);

            expect(mockRes.status).toHaveBeenCalledWith(status);
            expect(mockRes.json).toHaveBeenCalledWith({ error });
        });
    });
});
