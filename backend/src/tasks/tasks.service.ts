import { Injectable } from '@nestjs/common';
import { Task } from './tasks.entity';
import { updateTaskDto } from './dto/tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class TasksService {

 constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    createTask(title: string, description: string, categories: string[]){
        const task = {
            title,
            description,
            categories,
            archived: false
        }
      
        return this.taskRepository.save(task) ;
    }
    getAllTasks() {
     return  this.taskRepository.find();
    }
    
    getTaskById(id: number) {
        return this.taskRepository.findOne({
            where: { id }
        });
    }

    deleteTask(id: number) {
       return this.taskRepository.delete({id});
    }

    updateTask(id: number, updatedFields: updateTaskDto) {
        this.taskRepository.update({id}, updatedFields )
    }
}
