import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { TodoItem } from "../../../types/todo";
import { TodoService } from "../../services/todo.service";

@Component({
	selector: "app-todo",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./todo.component.html",
	styleUrl: "./todo.component.scss",
})
export class TodoComponent implements OnInit {
	private todoService = inject(TodoService);
	private formBuilder = inject(FormBuilder);
	todos: TodoItem[] = [];
	newTodoForm = this.formBuilder.group({
		title: [""],
		description: [""],
	});

	async ngOnInit(): Promise<void> {
		this.todos = await this.todoService.getAllTodos();
	}

	async onSubmit() {
		const title = this.newTodoForm.value.title;
		const description = this.newTodoForm.value.description;
		if (title && description) {
			await this.todoService.addTodo(title, description);
		}
	}
}
