import request from 'supertest';
import app from '../../src/models/project.model';
import Project from '../../src/models/project.model';
import User from '../../src/models/user.model';
import { generateJWT } from '../../src/helpers/jwt.helper';
import sequelize from '../../src/'

let authToken: string;
let testUserId: number;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Crear usuario de prueba
    const user = await User.create({
        email: 'pm@example.com',
        password: '123',
        name: 'Project Manager',
        lastName: 'Test',
        username: 'pm_test',
        roleId: 1
    });

    // Generar token JWT
    authToken = await generateJWT(user.userId.toString());
    testUserId = user.userId;
});

describe('Projects API', () => {
    it('POST /projects → Debe crear un proyecto', async () => {
        const response = await request(app)
            .post('/projects')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'Test Project',
                description: 'Test Description',
                managerId: testUserId
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('GET /projects → Debe listar proyectos', async () => {
        await Project.create({
            name: 'Project 1',
            managerId: testUserId,
            description: 'Test'
        });

        const response = await request(app)
            .get('/projects')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

afterAll(async () => {
    await sequelize.close();
});