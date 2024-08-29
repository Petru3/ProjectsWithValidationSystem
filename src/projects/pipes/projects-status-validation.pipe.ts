import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ProjectStatus } from "../project.model";

export class ProjectStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        ProjectStatus.OPEN,
        ProjectStatus.HIDDEN
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value} is an invalid status!"`)
        }

        return value
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status)

        return index !== -1;
    }
}