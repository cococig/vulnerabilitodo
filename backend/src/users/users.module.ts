import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Sqlite3Service } from "src/sqlite3/sqlite3.service";
import { UsersService } from "./users.service";

@Module({
	providers: [PrismaService, Sqlite3Service, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
