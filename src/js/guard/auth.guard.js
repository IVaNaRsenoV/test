import { AuthService } from '../services/auth.service';
import { Routing } from '../core/routing.service';

export class AuthGuard {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
    }
    /**
     * @description - метод canActivate() проверяет есть ли у нас токен и делает навигацию
     */
    canActivate() {
        if (!this._authService.token) {
            this._routing.navigate('/login');
            return false;
        }
        return true;
    }
}