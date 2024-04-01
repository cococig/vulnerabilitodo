declare interface JwtPayload {
	sub: number;
	username: string;
	iat: number;
	exp: number;
}

declare namespace Express {
	export interface Request {
		user: JwtPayload;
	}
}
