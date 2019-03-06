import { WinnerService } from './../services/winner.services';

export class WinnerComponent {
    constructor() {
        this._winnersService = new WinnerService();
    }
    async beforeRender() {
        this._winners = await this._winnersService.getWinners();
        this._arraysWinners = [];
        for (let i = 0; i < this._winners.winners.length; i++) {
            this._reference = this._winners.winners[i].member_id.images[0].image_basic;
            this._url = this._reference.url;
            this._likes = this._reference.likes;
            this._views = this._reference.views;
            this._arraysWinners.push(this.singleWinnerTemplate(this._url, this._likes.length, this._views.length));
        }
        console.log(this._winners.winners);
    }

    render() {
            return `<style>${this.style()}</style>
            <div class="container">
            <div class="row">
                ${this._arraysWinners.join('')}
            </div>
            </div>
            `;
    }
 
    style() {
        return `
            .row {
                display:flex;
                justify-content: space-around;
                padding-bottom: 30px;
            }
            img {
                height: 300px;
                max-width: none;
                border-radius: 10px;
            }
            .img-item-hover {
                opacity: 0;
                color: white;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.5);
                transition: all .2s ease-in;
            }
            .img-item {
                overflow: hidden;
                text-align: center;
                margin-bottom: 30px;
                position: relative;
            }
            .img-item:hover .img-item-hover {
                opacity: 1;
            }
        `;
    }

    singleWinnerTemplate(url, likes, views) {
        return `
        <div class="img-item">
            <img src="${url}"></img>
            <div class="img-item-hover">
            <span>
                <i class="fas fa-eye"></i>
                ${views}
            </span>
            <span>
                <i class="fas fa-thumbs-up"></i>
                ${likes}
            </span>
        </div>
        </div>
        `;
    }

    afterRender() {
        
    }
}