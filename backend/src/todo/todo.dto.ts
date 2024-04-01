import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class AddTodoDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsDateString()
	dueDate: string;
}

export class UpdateTodoDto {
	@IsString()
	title?: string;

	@IsString()
	description?: string;

	@IsDateString()
	dueDate?: string;
}
