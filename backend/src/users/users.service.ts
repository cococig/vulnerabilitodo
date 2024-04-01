import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Sqlite3Service } from "src/sqlite3/sqlite3.service";

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
		private sqlite: Sqlite3Service,
	) {}

	/**
	 * Userテーブルからユーザーを1人だけ返すメソッド
	 * @param username ユーザー名
	 * @returns Userオブジェクト。見つからなかった場合はnull
	 */
	async findOne(username: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {
				name: username,
			},
		});
	}

	/**
	 * SQLインジェクションが可能な生のSQLクエリを実行し、ユーザー情報の配列を返すメソッド。
	 * ユーザー名とパスワードが正しく渡されれば配列にはユーザー情報が1件だけ格納される。
	 * XXX: SQLインジェクションあり
	 * @param username ユーザー名
	 * @param password パスワード
	 * @returns ユーザー情報の配列
	 */
	async findUserRawQuery(username: string, password: string): Promise<User[]> {
		const sql = `SELECT * FROM "User" WHERE name = '${username}' AND password = '${password}'`;
		return new Promise((res, rej) => {
			this.sqlite.all(sql, (err, rows) => {
				if (err) rej();
				else res(rows as User[]);
			});
		});
	}

	/**
	 * ユーザーを新規作成するメソッド。
	 * @param username ユーザー名
	 * @param password パスワード
	 * @returns 新規作成されたユーザー情報
	 */
	async createUser(username: string, password: string) {
		try {
			return this.prisma.user.create({
				data: {
					name: username,
					password: password,
				},
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					// 作成しようとしたユーザー名が既に存在した場合
					console.error(`ユーザー名：${username}は既に存在します。`);
					throw new ConflictException(
						`ユーザー名：${username}は既に存在します。`,
					);
				}
			}
			throw e;
		}
	}
}
