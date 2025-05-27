import sequelize from '../../src/config/db';
import User from '../../src/models/user.model';
import Role from '../../src/models/roles.model';
// Importa todos los modelos...

// Configura los modelos en Sequelize
beforeAll(async () => {
    sequelize.addModels([User, Role /*, otros modelos */]);
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});