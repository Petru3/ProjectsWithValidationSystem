import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectStatus } from './project.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Validate } from 'class-validator';
import { ProjectStatusValidationPipe } from './pipes/projects-status-validation.pipe';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    getAllProjects(): Project[] {
        return this.projectsService.getAllProjects();
    }

    @Get(':id')
    getOneProject(@Param('id') id: string): Project {
        return this.projectsService.getOneProject(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createProject(@Body() createProjectDto: CreateProjectDto): Project {
        return this.projectsService.createProject(createProjectDto);
    }

    @Patch(':id')
    updateProject(
        @Param('id') id: string,
        @Body('status', ProjectStatusValidationPipe) updateProjectDto: UpdateProjectDto
    ): Project {
        return this.projectsService.updateProject(id, updateProjectDto);
    }
    
    @Delete(':id')
    deleteProject(@Param('id') id: string): void {
        this.projectsService.deleteProject(id);
    }
}
