import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { environment } from "../../environments/environment";
import { AuthResponseBody } from "../../types/auth";
import { JwtPayload } from "../../types/jwt";
import { BaseRestApiService } from "./abstract-services";

@Injectable({
	providedIn: "root",
})
export class AuthService extends BaseRestApiService {
	private readonly JWT_KEY = "auth_token";

	private saveJwt(jwt: string) {
		localStorage.setItem(this.JWT_KEY, jwt);
		return jwt;
	}

	private removeJwt() {
		localStorage.removeItem(this.JWT_KEY);
	}

	private getJwtPayload() {
		const jwt = localStorage.getItem(this.JWT_KEY);
		if (jwt == null) return null;
		const payload = jwtDecode<JwtPayload>(jwt);
		return payload;
	}

	public getAuthenticatedUser() {
		const payload = this.getJwtPayload();
		const exp = payload?.exp;
		if (exp && new Date(exp * 1000) > new Date()) {
			return payload;
		}
		return null;
	}

	public async login(username: string, password: string) {
		const url = `${environment.apiEndpoint}/auth/login`;
		const response = await this.post(
			url,
			{ body: { username, password } },
			false,
		);
		if (response.ok) {
			const body: AuthResponseBody = await response.json();
			this.saveJwt(body.accessToken);
			return true;
		}
		throw new Error(response.statusText);
	}

	public async signUp(username: string, password: string) {
		const url = `${environment.apiEndpoint}/auth/signup`;
		const response = await this.post(
			url,
			{ body: { username, password } },
			false,
		);
		if (response.ok) {
			const body: AuthResponseBody = await response.json();
			this.saveJwt(body.accessToken);
			return true;
		}
		throw new Error(response.statusText);
	}

	public async logout() {
		this.removeJwt();
	}
}
