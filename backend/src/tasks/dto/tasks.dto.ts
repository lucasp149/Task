
import { IsString, IsNotEmpty, IsOptional, IsBoolean, MaxLength, IsArray } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(150)
  description: string;

  @IsArray()
  @IsOptional()
  categories: string[];
}

export class updateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  description?: string;

  @IsBoolean()
  @IsOptional()
  archived?: boolean

  @IsArray()
  @IsOptional()
  categories: string[];
}
