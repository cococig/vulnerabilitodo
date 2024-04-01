import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
} from "@nestjs/common";
import { Request } from "express";
import { AddTodoDto, UpdateTodoDto } from "./todo.dto";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
	constructor(private todoService: TodoService) {}

	/**
	 * 特定ユーザーに紐づく全てのToDo情報を返すエンドポイント
	 * XXX: 認証・認可不備あり
	 * @param req リクエスト時の情報
	 * @param uid `uid`というキーのクエリパラメータ
	 * @returns ToDo情報の配列
	 */
	@Get("all")
	async getAllTodos(@Req() req: Request, @Query("uid") uid: string) {
		return this.todoService.getAllTodos(Number.parseInt(uid));
	}

	/**
	 * ToDo情報を新規作成するエンドポイント
	 * @param req リクエスト時の情報
	 * @param addTodoDto リクエストボディ
	 * @returns 新規作成されたToDo情報
	 */
	@Post("add")
	async addTodo(@Req() req: Request, @Body() addTodoDto: AddTodoDto) {
		return this.todoService.addTodo(req.user.sub, addTodoDto);
	}

	/**
	 * ToDo情報を更新するエンドポイント
	 * XXX: 認証・認可不備あり
	 * @param id 更新対象ToDoのID
	 * @param updateTodoDto リクエストボディ
	 * @returns 更新されたToDo情報
	 */
	@Put(":id")
	async updateTodo(
		@Param("id") id: string,
		@Body() updateTodoDto: UpdateTodoDto,
	) {
		const parsedId = Number.parseInt(id);
		if (Number.isNaN(parsedId)) throw new Error("idの値が不正です");
		return this.todoService.updateTodo(parsedId, updateTodoDto);
	}

	/**
	 * ToDo情報を削除するエンドポイント
	 * XXX: 認証・認可不備あり
	 * @param id 削除対象ToDoのID
	 * @returns 削除されたToDo情報
	 */
	@Delete(":id")
	async deleteTodo(@Param("id") id: string) {
		const parsedId = Number.parseInt(id);
		if (Number.isNaN(parsedId)) throw new Error("idの値が不正です");
		return this.todoService.deleteTodo(parsedId);
	}
}
