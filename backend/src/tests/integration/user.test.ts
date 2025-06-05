import request from 'supertest';
import app from '../../../src/servers/http.server';
import User from '../../../src/models/user.model';
import { generateJWT } from '../../../src/helpers/jwt.helper';

describe('Integración - Users', () => {
    let jwtToken: string;
    let userId: number;

    const mockUser = {
        name: 'Usuario',
        lastName: 'Prueba',
        username: 'usuarioprueba',
        email: 'testuser@example.com',
        password: 'contraseñaHasheada123', // simula contraseña hasheada
        roleId: 2,
        isVerified: true,
        token: null,
    };

    beforeAll(async () => {
        // Limpiamos y creamos el usuario
        await User.destroy({ where: {} });
        const user = await User.create(mockUser);
        userId = user.userId;
        jwtToken = await generateJWT(String(userId));
    });

    describe('GET /api/users/:id', () => {
        it('debería devolver los datos del usuario con token válido', async () => {
            const res = await request(app)
                .get(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${jwtToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('email', mockUser.email);
            expect(res.body).toHaveProperty('name', mockUser.name);
            expect(res.body).toHaveProperty('userId', userId);
        });

        it('debería retornar 401 si no se proporciona token', async () => {
            const res = await request(app).get(`/api/users/${userId}`);
            expect(res.statusCode).toBe(401);
        });

        it('debería retornar 401 si el token es inválido', async () => {
            const res = await request(app)
                .get(`/api/users/${userId}`)
                .set('Authorization', 'Bearer token-falso');
            expect(res.statusCode).toBe(401);
        });
    });

    describe('PUT /api/users/:id', () => {
        const updatedData = {
            name: 'NuevoNombre',
            email: 'nuevoemail@example.com',
        };

        it('debería actualizar el usuario con token válido', async () => {
            const res = await request(app)
                .put(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${jwtToken}`)
                .send(updatedData);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toMatch(/actualizado/i);

            // Verificamos que en la DB esté actualizado
            const updatedUser = await User.findByPk(userId);
            expect(updatedUser?.name).toBe(updatedData.name);
            expect(updatedUser?.email).toBe(updatedData.email);
        });

        it('debería retornar 401 si no se proporciona token', async () => {
            const res = await request(app)
                .put(`/api/users/${userId}`)
                .send(updatedData);
            expect(res.statusCode).toBe(401);
        });

        it('debería retornar 401 si el token es inválido', async () => {
            const res = await request(app)
                .put(`/api/users/${userId}`)
                .set('Authorization', 'Bearer token-falso')
                .send(updatedData);
            expect(res.statusCode).toBe(401);
        });

        it('debería retornar 404 si el usuario no existe', async () => {
            const res = await request(app)
                .put(`/api/users/99999`)
                .set('Authorization', `Bearer ${jwtToken}`)
                .send(updatedData);
            expect(res.statusCode).toBe(404);
        });
    });
});
