import { NewsService } from './../services/news.service';

/**
 * @description  - класс NewsComponent, необходим для формирования структуры компонентов, направленных на создание страницы для новостей
 */

export class NewsComponent {

    /**
     * @description - constructor содержит класс NewsCervice
     */

    constructor() {
        this._authService = new NewsService();
        this._news;
        this._btn = document.getElementsByClassName('btn');
        // this._btn = document.getElementById('btn');
    }

    /**
     * @description 0 асинхронная функция beforeRender, необходима для получения токена
     */

    async beforeRender() {
        this._news = await this._authService.getNews(this._authService.token);
    }

    /**
     * @description - метод showDate работает с датой
     * @return {result} - result
     */

    showDate() {
        return ((new Date() - Date.parse(this._news.news[0].date))/ (60 * 60 * 24 * 1000)).toFixed(0);
    }

    /**
     * @description - метод render создаёт разметку
     * @return {markup} - markup
     */

    render() {
        // Работаем с датой
        
        return`
        <style>${this.style()}</style>
        <div class="wrapper";>
        <nav>
        <ul style="display:flex; list-style:none; justify-content:center; background:black; margin:0px;" >
            <li style="padding:5px 15px;"><a href = "http://localhost:9000" style="text-decoration:none; color:white;">HOME</a></li>
            <li style="padding:5px 15px;"><a href = "http://localhost:9000/#/signup" style="text-decoration:none; color:white;">SIGNUP</a></li>
            <li style="padding:5px 15px; background:white; border:4px solid black; border-radius:5px;""><a href = "http://localhost:9000/#/news" style="text-decoration:none; color:black;">NEWS</a></li>
        </ul>
        </nav>
        <div class = "container">
        <div class="row clearfix" style="background:white; margin-top:60px;">
            <div class="col-3" style = "padding:25px; text-align:center;">
                <div class="avatar"><img src="${this._news.news[0].owner.avatar}" style="border-radius:50%; max-width:150px;"></div>
                <div class="user-info">
                    <p style="font-size: 20px; margin-bottom: 8px;">${this._news.news[0].owner.full_name}</p>
                    <p>${this._news.news[0].owner.country}</p>
                    <span class="upload-count">Uploaded ${this._news.news[0].pictures.length} photos</span>
                <span class="upload-date">a ${this.showDate()} ${this.showDate() > 1 ? 'days' : 'day'} ago</span>
                </div>
                <button class="btn btn-border-gradient" id="btn"><span>Follow</span></button>
            </div>
            <div class="col-9">
            <div class="image">
                <img src="${this._news.news[0].pictures[0].url}">
            </div>
            </div>
        </div>
        </div>
        </div>
        `;
    }

    /**
     * @description - метод style содержит стили для html разметки
     * @return {css} - css
     */

    //  scriptJS() {
    //      this._btn = document.querySelector('.btn');
    //      this._btn.addEventListener('click', function() { console.log(btn); });
    //  }
   
    style() {
        return `
        * {
            box-sizing:border-box
        }
        body {
            background-color:#f2f2f2;
        }
        p {
            margin:0px;
            padding:0px;
        }
        .container {
            max-width:1170px;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }
        .row {
            margin-left:-15px;
            margin-right:-15px;
            border-radius:5px;
        }
        .clearfix:after {
            display:table;
            clear:both;
            content:'';
        }
        .image {
            padding:25px;
        }
        img {
            width:100%;
            heigth:auto;
        }
        .user-info {
            text-align:center;
        }
        .avatar {
            text-align:center;
        }
        .row {
            display: flex;
            justify-content: center
        }
        .btn {
            position: relative;
            display: inline-block;
            padding: 15px 35px;
            font-size: 16px;
            font-family: robotobold,sans-serif;
            text-align: center;
            text-transform: uppercase;
            border-radius: 500px;
            z-index: 0;
            overflow: hidden;
            margin-top:25px;
            outline:none;
        }
        .btn.btn-border-gradient {
            border:2px solid black;
        }
        .btn:focus,.btn:active {
            outline: none !important;
            box-shadow: none;
         }
         .btn:active {
             background-color:black;
             color:white;
             transition: .2s;
         }
        `;
    }


    afterRender() {
        
    }
}


