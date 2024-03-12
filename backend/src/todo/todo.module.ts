import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaService } from "src/prisma/prisma.service";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
	imports: [AuthModule],
	controllers: [TodoController],
	providers: [TodoService, PrismaService],
})
export class TodoModule {}
