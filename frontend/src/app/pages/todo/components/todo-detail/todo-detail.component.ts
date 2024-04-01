import { CommonModule } from "@angular/common";
import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
	inject,
} from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TodoItem } from "../../../../../types/todo";
import { TodoService } from "../../../../services/todo.service";
import { dateTimeValidator } from "../../../../validators/date-time.validator";

@Component({
	selector: "app-todo-detail",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./todo-detail.component.html",
	styleUrl: "./todo-detail.component.scss",
})
export class TodoDetailComponent implements OnChanges {
	@Input({ required: true }) todo?: TodoItem;
	@Output() submitEvent: EventEmitter<boolean> = new EventEmitter();
	@ViewChild("todoDetailModal") todoDetailModal!: ElementRef<HTMLDialogElement>;
	private sanitizer = inject(DomSanitizer);
	private formBuilder = inject(NonNullableFormBuilder);
	private todoService = inject(TodoService);

	description: SafeHtml = "";
	isEditing = false;
	updateTodoForm = this.formBuilder.group({
		title: [""],
		description: [""],
		dueDate: ["", dateTimeValidator],
	});

	ngOnChanges(changes: SimpleChanges): void {
		if (this.todo == null) throw new Error("ToDo情報がnullです");
		this.description = this.todo?.description
			? this.sanitizer.bypassSecurityTrustHtml(this.todo.description)
			: "";
		this.updateTodoForm.setValue({
			title: this.todo.title,
			description: this.todo.description,
			dueDate: this.convertUTCtoJST(this.todo.dueDate).slice(0, -13),
		});
	}

	showModal() {
		this.isEditing = false;
		this.todoDetailModal.nativeElement.showModal();
	}

	convertUTCtoJST(utcDateString: string): string {
		// ISO8601形式のUTC日時文字列をDateオブジェクトに変換
		const date = new Date(utcDateString);

		// JSTに変換（UTC時間に9時間を足す）
		const jstOffset = 9 * 60 * 60 * 1000; // 9時間をミリ秒に変換
		const jstDate = new Date(date.getTime() + jstOffset);

		// ISO8601形式に変換して返す（オプションでフォーマットを変更可能）
		return jstDate.toISOString().replace("Z", "+09:00");
	}

	async onUpdateSubmit() {
		if (this.todo == null) throw new Error("ToDo情報がnullです");
		if (this.updateTodoForm.invalid) throw new Error("値が不正です");
		const title = this.updateTodoForm.value.title;
		const description = this.updateTodoForm.value.description;
		const dueDateString = this.updateTodoForm.value.dueDate;
		if (title && description && dueDateString) {
			const dueDate = new Date(`${dueDateString}:00.000Z`);
			console.log(dueDate);
			await this.todoService.updateTodo(
				this.todo.id,
				title,
				description,
				dueDate,
			);
			this.description = this.sanitizer.bypassSecurityTrustHtml(description);
			this.submitEvent.emit(true);
		} else {
			this.submitEvent.emit(false);
		}
		this.isEditing = false;
	}
}
