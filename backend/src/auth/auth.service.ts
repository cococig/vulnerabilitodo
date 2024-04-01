import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	/**
	 * ログイン用のメソッド。ユーザがログインに成功した場合は認証用のJWTを返す。
	 * XXX: SQLインジェクションあり
	 * @param username ユーザ名
	 * @param pass パスワード
	 * @returns JWT
	 */
	async signIn(
		username: string,
		pass: string,
	): Promise<{ accessToken: string }> {
		const users = await this.usersService.findUserRawQuery(username, pass);
		const payload = { sub: users[0].id, username: users[0].name };
		return {
			accessToken: await this.jwtService.signAsync(payload),
		};
	}

	/**
	 * 新規登録用のメソッド。新規登録後、ログイン時と同じように認証用のJWTを返す。
	 * XXX: 生パスワードの保存あり
	 * @param username ユーザ名
	 * @param pass パスワード
	 * @returns JWT
	 */
	async signUp(
		username: string,
		pass: string,
	): Promise<{ accessToken: string }> {
		const user = await this.usersService.createUser(username, pass);
		const payload = { sub: user.id, username: user.name };
		return {
			accessToken: await this.jwtService.signAsync(payload),
		};
	}
}
