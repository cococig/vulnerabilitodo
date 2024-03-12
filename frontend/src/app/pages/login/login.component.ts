import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
})
export class LoginComponent {
	private authService = inject(AuthService);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);
	loginForm = this.formBuilder.nonNullable.group({
		username: ["", Validators.required],
		password: ["", Validators.required],
	});

	async login() {
		const username = this.loginForm.value.username;
		const password = this.loginForm.value.password;
		if (this.loginForm.valid && username && password) {
			await this.authService.login(username, password);
			this.router.navigate([""]);
		}
	}
}
