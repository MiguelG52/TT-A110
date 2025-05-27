import app from "./../../src/servers/http.server";
import sequelize from '../../src/config/db';
import request from 'supertest';
import User from '../../src/models/user.model';
import Role from '../../src/models/roles.model'; // Necesario por la relación


beforeAll(async () => {
    // Asegúrate de que los modelos están cargados
    sequelize.addModels([Role]);

    await sequelize.sync({ force: true });

    // Método alternativo seguro
    await Role.create({
        roleId: 1,
        name: 'user'
    } as any); // El 'as any' es temporal para diagnóstico
});