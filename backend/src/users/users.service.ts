import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findOne(username: string): Promise<User | undefined> {
		return this.prisma.user.findUnique({
			where: {
				name: username,
			},
		});
	}

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
