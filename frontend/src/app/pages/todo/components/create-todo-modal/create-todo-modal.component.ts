import {
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild,
	inject,
	type ElementRef,
} from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { TodoService } from "../../../../services/todo.service";
import { dateTimeValidator } from "../../../../validators/date-time.validator";

@Component({
	selector: "app-create-todo-modal",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./create-todo-modal.component.html",
	styleUrl: "./create-todo-modal.component.scss",
})
export class CreateTodoModalComponent {
	@Input({ required: true }) updateTodos!: () => Promise<void>;
	@Output() submitEvent: EventEmitter<boolean> = new EventEmitter();
	@ViewChild("createTodoModal") createTodoModal!: ElementRef<HTMLDialogElement>;
	private todoService = inject(TodoService);
	private formBuilder = inject(NonNullableFormBuilder);
	private now = new Date();

	newTodoForm = this.formBuilder.group({
		title: [""],
		description: [""],
		dueDate: [
			`${this.now.getFullYear()}-${this.zeroPad(
				this.now.getMonth() + 1,
			)}-${this.zeroPad(this.now.getDate())}T${this.zeroPad(
				this.now.getHours(),
			)}:${this.zeroPad(this.now.getMinutes())}`,
			dateTimeValidator,
		],
	});

	private zeroPad(num: number) {
		return num.toString().padStart(2, "0");
	}

	showModal() {
		this.createTodoModal.nativeElement.showModal();
	}

	async onSubmit() {
		if (this.newTodoForm.invalid) throw new Error("値が不正です");
		const title = this.newTodoForm.value.title;
		const description = this.newTodoForm.value.description;
		const dueDateString = this.newTodoForm.value.dueDate;
		if (title && description && dueDateString) {
			const dueDate = new Date(`${dueDateString}:00.000+09:00`);
			await this.todoService.addTodo(title, description, dueDate);
			this.submitEvent.emit(true);
			this.createTodoModal.nativeElement.close();
			return;
		}
		this.submitEvent.emit(false);
	}
}
