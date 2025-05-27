import { sendSuccessResponse, sendErrorResponse } from '../../../src/helpers/responses.helper';
import { Response } from 'express';

describe('Response Helpers', () => {
    const mockResponse = () => {
        const res: Partial<Response> = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res as Response;
    };

    describe('sendSuccessResponse', () => {
        it('debe enviar respuesta exitosa con datos', () => {
            const res = mockResponse();
            const testData = { id: 1, name: 'Test' };

            sendSuccessResponse(res, 200, 'Éxito', testData);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Éxito',
                data: testData
            });
        });

        it('debe enviar respuesta exitosa sin datos', () => {
            const res = mockResponse();
            sendSuccessResponse(res, 201, 'Creado');

            expect(res.json).toHaveBeenCalledWith({
                message: 'Creado',
                data: {}
            });
        });
    });

    describe('sendErrorResponse', () => {
        it('debe enviar respuesta de error', () => {
            const res = mockResponse();
            sendErrorResponse(res, 400, 'Error de validación');

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Error de validación'
            });
        });
    });
});