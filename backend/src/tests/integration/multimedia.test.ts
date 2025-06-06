// tests/integration/multimedia.test.ts

import request from "supertest";
import app from "../../../src/servers/http.server";
import sequelize from "../../../src/config/db";
import User from "../../../src/models/user.model";
import Role from "../../../src/models/roles.model";
import ContentType from "../../../src/models/contentType.model";
import Content from "../../../src/models/content.model";

describe("Multimedia Integration Tests", () => {
    let token: string;
    let contentTypeId: number;
    let contentId: number;

    const testEmail = "multimedia_test@example.com";
    const testPassword = "Test1234";

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        // Crear rol
        const role = await Role.create({ name: "admin" });

        // Crear usuario con rol
        const user = await User.create({
            name: "Multimedia",
            lastName: "Tester",
            username: "multimediaTester",
            email: testEmail,
            password: testPassword,
            roleId: role.roleId,
            isVerified: true,
        });

        // Login para obtener token
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({ email: testEmail, password: testPassword });

        token = loginResponse.body.token;
    });

    it("debe crear un tipo de contenido", async () => {
        const res = await request(app)
            .post("/multimedia/create-content-type")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Video" });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("typeId");
        contentTypeId = res.body.data.typeId;
    });

    it("debe crear contenido multimedia", async () => {
        const res = await request(app)
            .post("/multimedia/create-content")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Video de prueba",
                description: "Contenido de test",
                typeId: contentTypeId,
            });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("contentId");
        contentId = res.body.data.contentId;
    });

    it("debe eliminar el contenido multimedia", async () => {
        const res = await request(app)
            .delete("/multimedia/create-content")
            .set("Authorization", `Bearer ${token}`)
            .query({ contentId });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
