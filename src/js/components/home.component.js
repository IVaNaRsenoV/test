import { HomeService } from './../services/home.service';

export class HomeComponent {
    constructor() {
        this.home = new HomeService();
    }
    async beforeRender() {
        this.homeInfo = await this.home.getHome();
    }
    render() {
        return `
        <style>${this.style()}</style>
        <nav>
        <ul style="display:flex; list-style:none; justify-content:center; background:black; margin:0px;" >
            <li style="padding:5px 15px; background:white; border:4px solid black; border-radius:5px;"><a href = "http://localhost:9000" style="text-decoration:none; color:black;">HOME</a></li>
            <li style="padding:5px 15px;"><a href = "http://localhost:9000/#/login" style="text-decoration:none; color:white;">LOGIN</a></li>
            <li style="padding:5px 15px;"><a href = "http://localhost:9000/#/signup" style="text-decoration:none; color:white;">SIGNUP</a></li>
            <li style="padding:5px 15px;"><a href = "http://localhost:9000/#/news" style="text-decoration:none; color:white;">NEWS</a></li>
        </ul>
        </nav>
        <div class="bg">
        </div>
        <div class="inner-desc">
            <div class="d-flex flex-column align-items-center" style="padding:15px 0px;">
                <ul class="inner-desc-stats d-flex flex-column align-items-center flex-sm-row" style="margin:0px; padding:15px 0px;">
                    <li class="d-flex align-items-center">${this.homeInfo.cities} Cities</li>
                    <li class="d-flex align-items-center">${this.homeInfo.countries} Countries</li>
                    <li class="d-flex align-items-center">In ${this.homeInfo.regions} Regions In The World</li>
                </ul>
                <span class="inner-desc-title text-center">You can be one of the winners and we will introduce you to the world</span>
            </div>
        </div>
        `;
    }
    style() {
        return `
            .navbar .d-flex {
                background-color: white;
            }
            .d-flex {
                background-color:#212121;
                color:white;
                font-size: 18px;
                font-family: robotolight,sans-serif;
            }
            .bg {
                background-image: url("${this.homeInfo.homeBackground}");
                min-height: 573px;
                width:100%;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }
            @media screen and (max-width:600px) {
                .bg {
                    min-height:300px;
                }
            }
            @media screen and (max-width:500px) {
                .bg {
                    height:200px;
                }
            }
            @media screen and (max-width:300px) {
                .bg {
                    min-height:100px;
                }
            }
        `;
    }
 
    afterRender() {
        
    }
} 
