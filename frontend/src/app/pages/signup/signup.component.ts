import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-signup",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./signup.component.html",
	styleUrl: "./signup.component.scss",
})
export class SignupComponent {
	private authService = inject(AuthService);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);
	signUpForm = this.formBuilder.nonNullable.group({
		username: ["", Validators.required],
		password: ["", Validators.required],
	});

	async signUp() {
		const username = this.signUpForm.value.username;
		const password = this.signUpForm.value.password;
		if (this.signUpForm.valid && username && password) {
			await this.authService.signUp(username, password);
			this.router.navigate([""]);
		}
	}
}
