import { Injectable } from "@nestjs/common";
import { Database } from "sqlite3";

@Injectable()
export class Sqlite3Service extends Database {
	constructor() {
		super("./prisma/dev.db");
	}
}
