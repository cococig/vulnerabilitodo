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
}
