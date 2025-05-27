import request from 'supertest';
import app from '../../src/servers/http.server';
import sequelize from '../../src/config/db';
import User from '../../src/models/user.model';
import { generateJWT } from '../../src/helpers/jwt.helper';

// Mock de Cloudinary
jest.mock('cloudinary', () => ({
    v2: {
        uploader: {
            upload: jest.fn().mockResolvedValue({ secure_url: 'http://mock.url/image.jpg' })
        }
    }
}));

let authToken: string;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    const user = await User.create({
        email: 'user@example.com',
        password: '123',
        name: 'Test User',
        lastName: 'Multimedia',
        username: 'media_user',
        roleId: 1
    });

    authToken = await generateJWT(user.userId.toString());
});

describe('Multimedia API', () => {
    it('POST /multimedia/upload → Debe subir un archivo', async () => {
        const response = await request(app)
            .post('/multimedia/upload')
            .set('Authorization', `Bearer ${authToken}`)
            .attach('file', Buffer.from('test buffer'), { filename: 'test.jpg' });

        expect(response.status).toBe(200);
        expect(response.body.url).toBeDefined();
    });
});

afterAll(async () => {
    await sequelize.close();
});