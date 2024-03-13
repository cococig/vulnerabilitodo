import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { AddTodoDto } from "./todo.dto";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
	constructor(private todoService: TodoService) {}

	@Get("all")
	async getAllTodos(@Request() req) {
		return this.todoService.getAllTodos(req.user.sub);
	}

	@Post("add")
	async addTodo(@Request() req, @Body() addTodoDto: AddTodoDto) {
		return this.todoService.addTodo(
			req.user.sub,
			addTodoDto.title,
			addTodoDto.description,
		);
	}
}
