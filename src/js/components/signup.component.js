import { AuthService } from './../services/auth.service';

export class SignUpComponent {

    constructor() {
        this._signupComponent = new AuthService();
    }
    async beforeRender() {
      
    }
    /**
     * @desc create markup template for signup 
     */
   render() {
        return `
        <nav>
        <ul style="display:flex; list-style:none; justify-content:center; background:black; margin:0px;" >
            <li style="padding:5px 15px;"><a href = "http://localhost:9000" style="text-decoration:none; color:white;">HOME</a></li>
            <li style="padding:5px 15px;"><a href = "http://localhost:9000/#/login" style="text-decoration:none; color:white;">LOGIN</a></li>
            <li style="padding:5px 15px; background:white; border:4px solid black; border-radius:5px;"><a href = "http://localhost:9000/#/signup" style="text-decoration:none; color:black;">SIGNUP</a></li>
            <li style="padding:5px 15px;"><a href = "http://localhost:9000/#/news" style="text-decoration:none; color:white;">NEWS</a></li>
        </ul>
    </nav>
    <div style="text-align:center; padding:15px 0px;"><h1>SIGNUP</h1></div>
    <form name="formSignup" style="margin:0px;">
    <div class="form-group" style="width:45%; margin:0 auto;">
        <div class="row">
            <div class="col col-6">
                <input type="text" class="form-control form-control-sm" id="first_name" placeholder="First Name">
            </div>
            <div class="col col-6">
                <input type="text" class="form-control form-control-sm" id="last_name" placeholder="Last Name">
            </div>
        </div>

        <input type="text" class="form-control form-control-sm mt-3" id="nick_name" placeholder="Nick Name">

        <div class="row mt-3">
            <div class="col col-4">
                <input type="text" class="form-control form-control-sm" id="day_of_birth" placeholder="Day">
            </div>
            <div class="col col-4">
                <input type="text" class="form-control form-control-sm" id="month_of_birth" placeholder="Month">
            </div>
            <div class="col col-4">
                <input type="text" class="form-control form-control-sm" id="year_of_birth" placeholder="Year">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col col-6">
                <input type="text" class="form-control form-control-sm" id="country" placeholder="Country">
            </div>
            <div class="col col-6">
                <input type="text" class="form-control form-control-sm" id="city" placeholder="City">
            </div>
        </div>

        <select name="gender" id="gender" class="form-control form-control-sm mt-3">
            <option value="male">Male</option>
            <option value="male">Female</option>
        </select>

        <input type="email" class="form-control form-control-sm mt-3" id="email" placeholder="bulletbrand33@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
        <input type="text" class="form-control form-control-sm mt-3" id="phone" placeholder="Phone number">
        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
        <div class="d-flex mt-5" style="margin-top:20px;">
            <button type="submit" style="background:black; border:none; padding:5px 25px; border-radius:5px; color:white;">Sign Up</button>
        </div>
    </div>
</form>
         `
    }

    async afterRender() {
        document.forms['signUpForm'].addEventListener('submit', (e) => {
            e.preventDefault();

            // Работа над ошибками
            this._data = {
                email:e.target.elements['email'].value,
                password:e.target.elements["password"].value,
                nickname:e.target.elements["nick_name"].value,
                first_name:e.target.elements["first_name"].value,
                last_name:e.target.elements["last_name"].value,
                phone:e.target.elements['phone'].value,
                gender_orientation:e.target.elements['gender'].value,
                city:e.target.elements["city"].value,
                country:e.target.elements["country"].value,
                date_of_birth_day:e.target.elements['day_of_birth'].value,
                date_of_birth_month:e.target.elements['month_of_birth'].value,
                date_of_birth_year:e.target.elements['year_of_birth'].value
            }

            this._signupComponent.signUp(this._data)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
}