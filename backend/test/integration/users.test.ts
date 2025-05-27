import request from 'supertest';
import app from './../../src/servers/http.server';
import User from '../../src/models/user.model';
import { generateJWT } from '../../src/helpers/jwt.helper';
import sequelize from '../../src/config/db';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

let authToken: string;

beforeEach(async () => {
    const user = await User.create({
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin'
    });
    authToken = generateJWT(user);
});

describe('Users API', () => {
    it('GET /users → Debe retornar lista de usuarios', async () => {
        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${authToken}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('PUT /users/:id → Debe actualizar un usuario', async () => {
        const user = await User.create({ email: 'user@example.com', name: 'User', password: '123' });
        const response = await request(app)
            .put(`/users/${user.id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Updated Name' });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated Name');
    });
});