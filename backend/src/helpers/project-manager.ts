interface Project {
  id: string;
  name: string;
  code: string;
  lastModified: Date;
  connections: number;
}

export class ProjectManager {
  private static projects: Record<string, Project> = {};

  static handleCodeChange(projectId: string, newCode: string, socketId: string) {
    if (this.projects[projectId]) {
      this.projects[projectId].code = newCode;
      this.projects[projectId].lastModified = new Date();
      console.log(`Código actualizado para proyecto ${projectId} por ${socketId}`);
    }
  }

  static listActiveProjects() {
    return Object.values(this.projects).map(project => ({
      id: project.id,
      name: project.name,
      connections: project.connections,
      lastModified: project.lastModified
    }));
  }

  static createOrGetProject(projectId: string, projectName: string): Project {
    if (!this.projects[projectId]) {
      this.projects[projectId] = {
        id: projectId,
        name: projectName,
        code: '',
        lastModified: new Date(),
        connections: 0
      };
    }
    return this.projects[projectId];
  }
}