import { Component, OnInit, inject } from "@angular/core";
import { TodoItem } from "../../../types/todo";
import { TodoService } from "../../services/todo.service";

@Component({
	selector: "app-todo",
	standalone: true,
	imports: [],
	templateUrl: "./todo.component.html",
	styleUrl: "./todo.component.scss",
})
export class TodoComponent implements OnInit {
	private todoService = inject(TodoService);
	todos: TodoItem[] = [];

	async ngOnInit(): Promise<void> {
		this.todos = await this.todoService.getAllTodos();
	}
}
