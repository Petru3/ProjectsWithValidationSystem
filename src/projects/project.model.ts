
export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    status: ProjectStatus;
}

export enum ProjectStatus {
    OPEN = 'OPEN',
    HIDDEN = 'HIDDEN'
}