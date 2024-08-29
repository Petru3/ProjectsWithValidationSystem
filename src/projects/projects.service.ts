import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './project.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './project.model';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    private projects: Project[] = [];

    getAllProjects(): Project[] {
        return this.projects;
    }

    getOneProject(id: string): Project {
        return this.projects.find(item => item.id === id);
    }

    createProject(createProjectDto: CreateProjectDto): Project {
        const { title, description, image } = createProjectDto;

        const newProject: Project = { 
            id: uuidv4(),
            title,
            description,
            image,
            status: ProjectStatus.OPEN,
        };

        this.projects.push(newProject);
        return newProject;
    }

    updateProject(id: string, updateProjectDto: UpdateProjectDto): Project {
        const currentProject = this.getOneProject(id);

        const updatedProject = {
            ...currentProject,
            ...updateProjectDto,
        };

        const projectIndex = this.projects.findIndex(project => project.id === id);

        this.projects[projectIndex] = updatedProject;

        return updatedProject;
    }

    deleteProject(id: string): void {
        this.projects = this.projects.filter(item => item.id !== id);
    }
}
