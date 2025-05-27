import request from 'supertest';
import app from '../../../servers/http.server'; // Importa la instancia de Express
import http from 'http'; // Para crear un servidor temporal
import database from '../../../config/db'; // Para limpieza de DB (si usas Sequelize)

describe('AuthController', () => {
    let server: http.Server;

    // Inicia el servidor antes de todas las pruebas
    beforeAll((done) => {
        server = app.listen(0, () => done()); // Puerto aleatorio
    });

    // Cierra el servidor después de todas las pruebas
    afterAll((done) => {
        server.close(() => done());
    });

    // Limpia la DB después de cada prueba (opcional, solo si usas DB en pruebas)
    afterEach(async () => {
        await database.truncate({ cascade: true }); // Ejemplo para Sequelize
    });

    // --- PRUEBAS PARA /api/auth/create-account ---
    describe('POST /api/auth/create-account', () => {
        it('debería crear una cuenta nueva (201)', async () => {
            const response = await request(server)
                .post('/api/auth/create-account')
                .send({
                    name: 'Juan Pérez',
                    email: 'juan@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
        });

        it('no debería permitir un correo ya registrado (400)', async () => {
            // Primera creación (éxito)
            await request(server)
                .post('/api/auth/create-account')
                .send({
                    name: 'Juan Pérez',
                    email: 'juan@example.com',
                    password: 'password123',
                });

            // Segundo intento con el mismo email (debe fallar)
            const response = await request(server)
                .post('/api/auth/create-account')
                .send({
                    name: 'Juan Pérez',
                    email: 'juan@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/ya está registrado/);
        });
    });

    // --- PRUEBAS PARA /api/auth/confirm-account ---
    describe('POST /api/auth/confirm-account', () => {
        it('debería confirmar la cuenta con un token válido (200)', async () => {
            // 1. Crear cuenta (para obtener token de confirmación)
            const createResponse = await request(server)
                .post('/api/auth/create-account')
                .send({
                    name: 'Ana López',
                    email: 'ana@example.com',
                    password: 'password123',
                });

            const testToken = createResponse.body.confirmationToken; // Ajusta según tu lógica

            // 2. Confirmar cuenta
            const response = await request(server)
                .post('/api/auth/confirm-account')
                .send({ token: testToken });

            expect(response.status).toBe(200);
            expect(response.body.message).toMatch(/confirmada/);
        });

        it('debería fallar si el token no es válido (404)', async () => {
            const response = await request(server)
                .post('/api/auth/confirm-account')
                .send({ token: 'token-invalido' });

            expect(response.status).toBe(404);
            expect(response.body.error).toMatch(/inválido/);
        });
    });

    // --- PRUEBAS PARA /api/auth/login ---
    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Crear un usuario de prueba
            await request(server)
                .post('/api/auth/create-account')
                .send({
                    name: 'Usuario Test',
                    email: 'test@example.com',
                    password: 'password123',
                });
        });

        it('debería permitir login con credenciales correctas (200)', async () => {
            const response = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('debería rechazar login con email no registrado (401)', async () => {
            const response = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'noexiste@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toMatch(/credenciales/);
        });

        it('debería rechazar login con contraseña incorrecta (401)', async () => {
            const response = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'contraseña-incorrecta',
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toMatch(/credenciales/);
        });
    });
});