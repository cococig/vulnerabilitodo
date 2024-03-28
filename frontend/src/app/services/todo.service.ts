import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { TodoItem } from "../../types/todo";
import { BaseRestApiService } from "./abstract-services";

@Injectable({
	providedIn: "root",
})
export class TodoService extends BaseRestApiService {
	public async getAllTodos() {
		const url = `${environment.apiEndpoint}/todo/all`;
		const response: TodoItem[] = await (await this.get(url)).json();
		return response;
	}

	public async addTodo(title: string, description: string) {
		const url = `${environment.apiEndpoint}/todo/add`;
		const response: TodoItem = await (
			await this.post(url, { body: { title, description } })
		).json();
		return response;
	}

	public async deleteTodo(todoId: number) {
		const url = `${environment.apiEndpoint}/todo/${todoId}`;
		const response: TodoItem = await (await this.delete(url)).json();
		return response;
	}
}
