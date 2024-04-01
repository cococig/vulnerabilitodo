import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { TodoItem } from "../../types/todo";
import { BaseRestApiService } from "./abstract-services";
import { AuthService } from "./auth.service";

@Injectable({
	providedIn: "root",
})
export class TodoService extends BaseRestApiService {
	private authService = inject(AuthService);

	public async getAllTodos() {
		const uid = this.authService.getAuthenticatedUser()?.sub;
		if (uid == null) throw new Error("ユーザIDが取得できませんでした");
		const queryParams = {
			uid: uid.toString(),
		};
		const url = `${environment.apiEndpoint}/todo/all?${new URLSearchParams(
			queryParams,
		)}`;
		const response: TodoItem[] = await (await this.get(url)).json();
		return response;
	}

	public async addTodo(title: string, description: string, dueDate: Date) {
		const url = `${environment.apiEndpoint}/todo/add`;
		const response: TodoItem = await (
			await this.post(url, {
				body: { title, description, dueDate: dueDate.toISOString() },
			})
		).json();
		return response;
	}

	public async updateTodo(
		todoId: number,
		title: string,
		description: string,
		dueDate: Date,
	) {
		const url = `${environment.apiEndpoint}/todo/${todoId}`;
		const response: TodoItem = await (
			await this.put(url, {
				body: { title, description, dueDate: dueDate.toISOString() },
			})
		).json();
		return response;
	}

	public async deleteTodo(todoId: number) {
		const url = `${environment.apiEndpoint}/todo/${todoId}`;
		const response: TodoItem = await (await this.delete(url)).json();
		return response;
	}
}
