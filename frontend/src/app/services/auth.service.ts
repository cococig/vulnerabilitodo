import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BaseRestApiService } from "./abstract-services";

@Injectable({
	providedIn: "root",
})
export class AuthService extends BaseRestApiService {
	private saveJwt(jwt: string) {
		localStorage.setItem("auth_token", jwt);
		return jwt;
	}

	private removeJwt() {
		localStorage.removeItem("auth_token");
	}

	public async login(username: string, password: string) {
		const url = `${environment.apiEndpoint}/auth/login`;
		const response: { accessToken: string } = await (
			await this.post(url, { body: { username, password } }, false)
		).json();
		this.saveJwt(response.accessToken);
	}

	public async signUp(username: string, password: string) {
		const url = `${environment.apiEndpoint}/auth/signup`;
		const response: { accessToken: string } = await (
			await this.post(url, { body: { username, password } }, false)
		).json();
		this.saveJwt(response.accessToken);
	}

	public async logout() {
		this.removeJwt();
	}
}
