import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { Sqlite3Service } from "./sqlite3/sqlite3.service";
import { UsersModule } from "./users/users.module";
import { TodoModule } from './todo/todo.module';

@Module({
	imports: [AuthModule, UsersModule, TodoModule],
	controllers: [AppController],
	providers: [AppService, PrismaService, Sqlite3Service],
})
export class AppModule {}
