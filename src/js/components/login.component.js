import { AuthService } from './../services/auth.service';
import { Routing } from './../core/routing.service';

export class LoginComponent {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
    }
    async beforeRender() {
        if (this._authService.token) {
            this._routing.navigate(`/users/${this._authService.userId}`);
        }
    }
    render() {
        return `
        <nav>
            <ul style="display:flex; list-style:none; justify-content:center; background:black; margin:0px;" >
                <li style="padding:5px 15px;"><a href = "http://localhost:9000" style="text-decoration:none; color:white;">HOME</a></li>
                <li style="padding:5px 15px; background:white; border:4px solid black; border-radius:5px;"><a href = "http://localhost:9000/#/login" style="text-decoration:none; color:black;">LOGIN</a></li>
                <li style="padding:5px 15px;"><a href = "http://localhost:9000/#/signup" style="text-decoration:none; color:white;">SIGNUP</a></li>
                <li style="padding:5px 15px;"><a href = "http://localhost:9000/#/news" style="text-decoration:none; color:white;">NEWS</a></li>
            </ul>
        </nav>
        <div class="d-flex justify-content-center w-100% mt-5">
        <div class="auth-wrap    ">
            <div class="auth-form col col-6 mx-auto my-auto ">
                <h3>Login to Social.</h3>
                <p class="text-secondary">Enter your e-mail address & password to login to your Social account.</p>
                <form name="loginForm" novalidate>
                    <div class="form-group ">
                        <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm">Login</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- /.auth-form -->
            <div class="auth-bg col col-6">
            </div>
            <!-- /.auth-bg -->
        </div>
        <!-- /.auth-wrap -->
        </div>
        `;
    }

     afterRender() {
        document.forms['loginForm'].addEventListener('submit', (e) => {
            e.preventDefault();

            const email = e.target.elements['email'].value;
            const password = e.target.elements['password'].value;

            if (!email || !password) return;
            
            this._authService.login(email, password)
                .then((response) => {
                    this._routing.navigate(`/users/${response.id}`, {myData: 'My data'});
                })
                .catch((err) => {
                    console.log(err);
                });                
        });
    }
}
