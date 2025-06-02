// tests/helpers/project-manager.test.ts
import { ProjectManager } from '../../helpers/project-manager';

describe('ProjectManager', () => {
    const projectId = 'project1';
    const projectName = 'Test Project';

    beforeEach(() => {
        // Limpiar proyectos antes de cada prueba
        // Como ProjectManager.projects es privado y estático, lo forzamos con casting
        (ProjectManager as any).projects = {};
    });

    describe('createOrGetProject', () => {
        it('debería crear un nuevo proyecto si no existe', () => {
            const project = ProjectManager.createOrGetProject(projectId, projectName);

            expect(project.id).toBe(projectId);
            expect(project.name).toBe(projectName);
            expect(project.code).toBe('');
            expect(project.connections).toBe(0);
            expect(project.lastModified).toBeInstanceOf(Date);
        });

        it('debería retornar el proyecto existente si ya fue creado', () => {
            const first = ProjectManager.createOrGetProject(projectId, projectName);
            const second = ProjectManager.createOrGetProject(projectId, 'Otro nombre');
            expect(second).toBe(first);
        });
    });

    describe('handleCodeChange', () => {
        it('debería actualizar el código y la fecha de modificación si el proyecto existe', async () => {
            const socketId = 'socket123';
            const initialProject = ProjectManager.createOrGetProject(projectId, projectName);

            const beforeUpdate = initialProject.lastModified.getTime();

            // Esperar al menos 1 ms real
            await new Promise((r) => setTimeout(r, 1));

            const newCode = 'console.log("Hello world");';
            ProjectManager.handleCodeChange(projectId, newCode, socketId);

            const updatedProject = ProjectManager.createOrGetProject(projectId, projectName);
            expect(updatedProject.code).toBe(newCode);
            expect(updatedProject.lastModified.getTime()).toBeGreaterThan(beforeUpdate);
        });

        it('no debería lanzar error si el proyecto no existe', () => {
            expect(() =>
                ProjectManager.handleCodeChange('nonexistent', 'code', 'socket456')
            ).not.toThrow();
        });
    });

    describe('listActiveProjects', () => {
        it('debería retornar una lista con los proyectos activos', () => {
            ProjectManager.createOrGetProject(projectId, projectName);
            const list = ProjectManager.listActiveProjects();

            expect(Array.isArray(list)).toBe(true);
            expect(list.length).toBe(1);
            expect(list[0]).toMatchObject({
                id: projectId,
                name: projectName,
                connections: 0,
            });
            expect(list[0].lastModified).toBeInstanceOf(Date);
        });
    });
});
