import request from "supertest";
// import app from "../servers/https.server";
import app from "../../servers/http.server";
// import { User } from "../models/user.model"; // Asegúrate de importar bien
import User from "../../servers/http.server";
import { v4 as uuidv4 } from "uuid";

describe("AuthController Integration Tests", () => {
    const testEmail = `test.${uuidv4()}@mail.com`;

    it("should create and confirm a user account", async () => {
        // 1. Crear cuenta
        const resCreate = await request(app).post("/api/auth/create-account").send({
            name: "Test",
            lastName: "User",
            email: testEmail,
            password: "TestPassword123!",
        });

        expect(resCreate.statusCode).toBe(200);
        expect(resCreate.body.message).toBeDefined();

        // 2. Obtener token desde la BD
        const user = await User.findOne({ where: { email: testEmail } });
        expect(user).not.toBeNull();
        expect(user.token).toHaveLength(6);

        // 3. Confirmar cuenta
        const resConfirm = await request(app).post("/api/auth/confirm-account").send({
            token: user.token,
        });

        expect(resConfirm.statusCode).toBe(200);
        expect(resConfirm.body.message).toMatch(/verificada correctamente/i);

        // 4. Verificar que el campo `token` se haya eliminado y `isVerified` esté en true
        const updatedUser = await User.findOne({ where: { email: testEmail } });
        expect(updatedUser.token).toBeNull();
        expect(updatedUser.isVerified).toBe(true);
    });
});
