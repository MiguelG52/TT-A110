import request from 'supertest';
import app from '../../src/servers/http.server';
import sequelize from '../../src/config/db';
import User from '../../src/models/user.model';
import { generateJWT } from '../../src/helpers/jwt.helper';

// Mock de OpenAI
jest.mock('openai', () => ({
    OpenAI: jest.fn().mockImplementation(() => ({
        chat: {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [{ message: { content: 'Mocked recommendation' } }]
                })
            }
        }
    }))
}));

let authToken: string;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    const user = await User.create({
        email: 'ai@example.com',
        password: '123',
        name: 'AI User',
        lastName: 'Test',
        username: 'ai_tester',
        roleId: 1
    });

    authToken = await generateJWT(user.userId.toString());
});

describe('Recommendations API', () => {
    it('POST /recommendations → Debe generar una recomendación', async () => {
        const response = await request(app)
            .post('/recommendations')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ prompt: 'How to improve my project?' });

        expect(response.status).toBe(200);
        expect(response.body.recommendation).toBe('Mocked recommendation');
    });
});

afterAll(async () => {
    await sequelize.close();
});