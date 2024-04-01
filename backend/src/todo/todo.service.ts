import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddTodoDto, UpdateTodoDto } from "./todo.dto";

@Injectable()
export class TodoService {
	constructor(private prisma: PrismaService) {}

	/**
	 * 特定ユーザーの全てのToDo情報を返すメソッド。
	 * 期限の昇順でソートする。
	 * @param userId ユーザーID
	 * @returns ToDo情報の配列
	 */
	async getAllTodos(userId: number) {
		return await this.prisma.todo.findMany({
			where: {
				user: {
					id: userId,
				},
			},
			orderBy: {
				dueDate: "asc"
			}
		});
	}

	/**
	 * ToDo情報を新規作成するメソッド
	 * @param userId ユーザーID
	 * @param data リクエストボディのオブジェクト
	 * @returns 新規作成されたToDo情報
	 */
	async addTodo(userId: number, data: AddTodoDto) {
		return await this.prisma.todo.create({
			data: {
				title: data.title,
				description: data.description,
				dueDate: data.dueDate,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	/**
	 * ToDo情報を更新するメソッド
	 * @param todoId 更新対象のToDoのID
	 * @param data リクエストボディのオブジェクト
	 * @returns 更新されたToDo情報
	 */
	async updateTodo(todoId: number, data: UpdateTodoDto) {
		return await this.prisma.todo.update({
			where: {
				id: todoId,
			},
			data: {
				title: data.title,
				description: data.description,
				dueDate: data.dueDate,
			},
		});
	}

	/**
	 * ToDo情報を削除するメソッド
	 * @param todoId ToDo情報のID
	 * @returns 削除されたToDo情報
	 */
	async deleteTodo(todoId: number) {
		return await this.prisma.todo.delete({
			where: {
				id: todoId,
			},
		});
	}
}
