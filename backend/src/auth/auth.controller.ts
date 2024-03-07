import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
} from "@nestjs/common";
import { Public } from "./auth.decorator";
import { SignInDto, SignUpDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post("login")
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}

	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	}

	@Public()
	@Post("signup")
	signUp(@Body() signUpDto: SignUpDto) {
		return this.authService.signUp(signUpDto.username, signUpDto.password);
	}
}
