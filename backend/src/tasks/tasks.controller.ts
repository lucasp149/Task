import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  ParseIntPipe
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, updateTaskDto } from './dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto) {
    return this.tasksService.createTask(newTask.title, newTask.description, newTask.categories);
  }

  @Delete(':id') // this is the Param included in the url (/:id)
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    this.tasksService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() updatedFields: updateTaskDto) {
    return this.tasksService.updateTask(id, updatedFields);
  }
}
