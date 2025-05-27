import request from 'supertest';
import app from '../../src/servers/http.server';
import sequelize from '../../src/config/db';
import Team from '../../src/models/team.model';
import User from '../../src/models/user.model';
import { generateJWT } from '../../src/helpers/jwt.helper';

let authToken: string;
let testUserId: number;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    const user = await User.create({
        email: 'leader@example.com',
        password: '123',
        name: 'Team Leader',
        lastName: 'Test',
        username: 'team_leader',
        roleId: 1
    });

    authToken = await generateJWT(user.userId.toString());
    testUserId = user.userId;
});

describe('Teams API', () => {
    it('POST /teams → Debe crear un equipo', async () => {
        const response = await request(app)
            .post('/teams')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Dev Team' });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Dev Team');
    });

    it('POST /teams/:id/members → Debe agregar un miembro', async () => {
        const team = await Team.create({ name: 'Test Team' });
        const member = await User.create({
            email: 'member@example.com',
            password: '123',
            name: 'Member',
            lastName: 'Test',
            username: 'team_member',
            roleId: 2
        });

        const response = await request(app)
            .post(`/teams/${team.teamId}/members`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ userId: member.userId });

        expect(response.status).toBe(200);
    });
});

afterAll(async () => {
    await sequelize.close();
});