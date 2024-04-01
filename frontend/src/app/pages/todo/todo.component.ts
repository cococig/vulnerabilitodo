import { CommonModule } from "@angular/common";
import { Component, ViewChild, inject, type OnInit } from "@angular/core";
import type { TodoItem } from "../../../types/todo";
import { TodoService } from "../../services/todo.service";
import { CreateTodoModalComponent } from "./components/create-todo-modal/create-todo-modal.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TodoDetailComponent } from "./components/todo-detail/todo-detail.component";

@Component({
	selector: "app-todo",
	standalone: true,
	imports: [
		CommonModule,
		NavbarComponent,
		CreateTodoModalComponent,
		TodoDetailComponent,
	],
	templateUrl: "./todo.component.html",
	styleUrl: "./todo.component.scss",
})
export class TodoComponent implements OnInit {
	private todoService = inject(TodoService);

	@ViewChild(CreateTodoModalComponent)
	createTodoModal!: CreateTodoModalComponent;
	@ViewChild(TodoDetailComponent) todoDetailModal!: TodoDetailComponent;

	todos: TodoItem[] = [];
	selectedTodo: TodoItem | undefined;

	async ngOnInit(): Promise<void> {
		await this.updateTodos();
	}

	async updateTodos() {
		this.todos = await this.todoService.getAllTodos();
	}

	async onDeleteTodo(todoId: number) {
		await this.todoService.deleteTodo(todoId);
		await this.updateTodos();
	}

	async onSubmitTodo(result: boolean) {
		if (result) {
			await this.updateTodos();
		}
	}

	onOpenDetail(todo: TodoItem) {
		this.selectedTodo = todo;
		this.todoDetailModal.showModal();
	}
}
