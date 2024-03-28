import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";

@Component({
	selector: "app-navbar",
	standalone: true,
	imports: [],
	templateUrl: "./navbar.component.html",
	styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
	private authService = inject(AuthService);
	private router = inject(Router);
	username = this.authService.getAuthenticatedUser()?.username ?? "";

	async logout() {
		await this.authService.logout();
		this.router.navigate(["login"]);
	}
}
