import { Module } from '@nestjs/common';
import { TasksModule } from 'src/tasks/tasks.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "taskdb",
    entities: [__dirname +"/**/*.entity{.ts,.js}"],
    synchronize: true

  }), TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
