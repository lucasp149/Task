import { Module } from '@nestjs/common';
import { TasksModule } from 'src/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username:  process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
