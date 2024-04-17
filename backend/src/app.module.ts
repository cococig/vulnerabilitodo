import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { Sqlite3Service } from "./sqlite3/sqlite3.service";
import { TodoModule } from './todo/todo.module';
import { UsersModule } from "./users/users.module";

@Module({
	imports: [AuthModule, UsersModule, TodoModule],
	providers: [PrismaService, Sqlite3Service],
})
export class AppModule {}
