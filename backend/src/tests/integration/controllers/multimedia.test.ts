import request from 'supertest';
import app from '../../../servers/http.server';
import http from 'http';
import database from '../../../config/db';
import ContentType from '../../../models/contentType.model';
import Content from '../../../models/content.model';
import ContentFile from '../../../models/contentFile.model';

describe('MultimediaController', () => {
    let server: http.Server;
    let testContentType: ContentType;
    let testContent: Content;
    let testToken: string;

    beforeAll(async (done) => {
        server = app.listen(0, () => done());

        // Configuración inicial para pruebas
        testContentType = await ContentType.create({ name: 'Test Type' });

        // Obtener token de autenticación si es necesario
        // testToken = await obtenerTokenValido(); // Implementa esto según tu auth
    });

    afterAll(async (done) => {
        await database.truncate({ cascade: true });
        server.close(() => done());
    });

    // --- PRUEBAS PARA CONTENT TYPES ---
    describe('Content Types', () => {
        it('POST /api/multimedia/content-types - debería crear un nuevo tipo de contenido (201)', async () => {
            const response = await request(server)
                .post('/api/multimedia/content-types')
                // .set('Authorization', `Bearer ${testToken}`) // Si requiere autenticación
                .send({ name: 'Video Tutorial' });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('typeId');
        });

        it('GET /api/multimedia/content-types - debería obtener todos los tipos de contenido (200)', async () => {
            const response = await request(server)
                .get('/api/multimedia/content-types');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    // --- PRUEBAS PARA CONTENT ---
    describe('Content Operations', () => {
        beforeEach(async () => {
            testContent = await Content.create({
                title: 'Test Content',
                description: 'Test Description',
                typeId: testContentType.typeId
            });
        });

        afterEach(async () => {
            await ContentFile.destroy({ where: {} });
            await Content.destroy({ where: {} });
        });

        it('POST /api/multimedia/content - debería crear nuevo contenido multimedia (201)', async () => {
            const response = await request(server)
                .post('/api/multimedia/content')
                // .set('Authorization', `Bearer ${testToken}`)
                .send({
                    title: 'Nuevo Contenido',
                    description: 'Descripción del contenido',
                    typeId: testContentType.typeId
                });

            expect(response.status).toBe(201);
            expect(response.body.data).toHaveProperty('contentId');
        });

        it('POST /api/multimedia/content/:contentId/files - debería agregar archivos a un contenido (201)', async () => {
            const files = [
                'https://example.com/file1.mp4',
                'https://example.com/file2.pdf'
            ];

            const response = await request(server)
                .post(`/api/multimedia/content/${testContent.contentId}/files`)
                // .set('Authorization', `Bearer ${testToken}`)
                .send({ files });

            expect(response.status).toBe(201);

            // Verificar que los archivos se crearon
            const contentFiles = await ContentFile.findAll({
                where: { contentId: testContent.contentId }
            });
            expect(contentFiles.length).toBe(files.length);
        });

        it('GET /api/multimedia/content/:contentId - debería obtener contenido con sus archivos (200)', async () => {
            // Primero agregamos archivos de prueba
            await ContentFile.bulkCreate([
                { contentId: testContent.contentId, contentURI: 'https://example.com/file1.mp4' },
                { contentId: testContent.contentId, contentURI: 'https://example.com/file2.pdf' }
            ]);

            const response = await request(server)
                .get(`/api/multimedia/content/${testContent.contentId}`);

            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('ContentFiles');
            expect(response.body.data.ContentFiles.length).toBe(2);
        });

        it('DELETE /api/multimedia/content/:contentId - debería eliminar contenido y sus archivos (200)', async () => {
            // Agregar archivos primero
            await ContentFile.create({
                contentId: testContent.contentId,
                contentURI: 'https://example.com/to-delete.mp4'
            });

            const response = await request(server)
                .delete(`/api/multimedia/content/${testContent.contentId}`)
            // .set('Authorization', `Bearer ${testToken}`);

            expect(response.status).toBe(200);

            // Verificar que el contenido y sus archivos fueron eliminados
            const contentExists = await Content.findByPk(testContent.contentId);
            const filesExist = await ContentFile.findOne({ where: { contentId: testContent.contentId } });

            expect(contentExists).toBeNull();
            expect(filesExist).toBeNull();
        });
    });

    // --- PRUEBAS DE VALIDACIÓN ---
    describe('Validations', () => {
        it('POST /api/multimedia/content - debería fallar sin título (400)', async () => {
            const response = await request(server)
                .post('/api/multimedia/content')
                .send({
                    description: 'Sin título',
                    typeId: testContentType.typeId
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/título/);
        });

        it('POST /api/multimedia/content/:contentId/files - debería fallar con contentId inválido (404)', async () => {
            const response = await request(server)
                .post('/api/multimedia/content/999/files')
                .send({ files: ['https://example.com/file.mp4'] });

            expect(response.status).toBe(404);
        });
    });
});
