import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (authService.getAuthenticatedUser()) {
		// ユーザ情報が存在していた場合ナビゲーションOK
		return true;
	}
	// 未認証の場合認証ページに戻す
	return router.parseUrl("login");
};
