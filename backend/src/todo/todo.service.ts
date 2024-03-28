import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TodoService {
	constructor(private prisma: PrismaService) {}

	async getAllTodos(userId: number) {
		return await this.prisma.todo.findMany({
			where: {
				user: {
					id: userId,
				},
			},
		});
	}

	async addTodo(userId: number, title: string, description: string) {
		return await this.prisma.todo.create({
			data: {
				title,
				description,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	async deleteTodo(todoId: number) {
		return await this.prisma.todo.delete({
			where: {
				id: todoId,
			},
		});
	}
}
