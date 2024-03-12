import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { TodoComponent } from "./pages/todo/todo.component";

export const routes: Routes = [
	{ path: "", component: TodoComponent, canActivate: [authGuard] },
	{ path: "login", component: LoginComponent },
	{ path: "signup", component: SignupComponent },
];
