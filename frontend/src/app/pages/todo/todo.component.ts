import {
	Component,
	ElementRef,
	OnInit,
	ViewChild,
	inject,
} from "@angular/core";
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

	@ViewChild("createTodoModal") createTodoModal!: ElementRef<HTMLDialogElement>;

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
			this.createTodoModal.nativeElement.close();
		}
	}
}
