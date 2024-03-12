import { JwtPayload as JwtDecodeJwtPayload } from "jwt-decode";

export interface JwtPayload extends JwtDecodeJwtPayload {
	sub: number;
	username: string;
}
