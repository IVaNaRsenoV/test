import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/notfound.component';
import { UserComponent } from './components/user.component';
import { ActiveRoute } from './core/active.route.service';
import { SignUpComponent } from './components/signup.component';
import { PaymentComponent } from './components/payment';
import { NavbarComponent } from './components/navbar.component';
import { WinnerComponent } from './components/winner.component';
// Импортируем класс NewsComponent, который выводит последнюю картинку и информацию о пользователе
import { NewsComponent } from './components/news.component';
import { AuthGuard } from './guard/auth.guard';
import { PaymentGuard } from './guard/payment.guard';

const activeRoute = new ActiveRoute();
const authGuard = new AuthGuard(); // Выполняет проверку токена, и выполняет редирект если токена нет
const paymentGuard = new PaymentGuard();

const routes = {
    '/': {
        component: new HomeComponent(),
        guard: [authGuard]
    },
    '/login': {
        component: new LoginComponent()
    },
    '/users/:id': {
        component: new UserComponent(),
        guard: [authGuard], // Здесь появиться экземпляр класса для защиты
    },
    '/payments': {
        component: new PaymentComponent(),
        guard: [authGuard, paymentGuard]
    },
    '/signup': {
        component: new  SignUpComponent()
    },
    '/news': {
        component: new NewsComponent()
    }, // Создаём маршрут /news при переходе на который, попадаем на разметку для новостей
    '/winner': {
        component: new WinnerComponent()
    },
    '**': {
        component:new NotFoundComponent()
    }
};

const router = async () => {
    const header = document.querySelector('app-header');
    const container = document.querySelector('app-container');
    const request = activeRoute.parseRequestURL();
    const url = (request.resourse ? '/' + request.resourse : '/') + (request.id ? '/:id' : '');

    const component = routes[url] ? routes[url]['component'] : routes['**']['component'];
    const guard = routes[url] ? routes[url]['guard'] : null;

    // Дальше чекаем, если у нас есть какая-то защита то мы можем что-то сделать
    if (guard) {
        const guardState = guard.every((item) => item.canActivate());
        console.log(guardState);
    }
    
    if (header) {
        const navbarComponent = new NavbarComponent();
        await navbarComponent.beforeRender();
        header.innerHTML = navbarComponent.render();
        navbarComponent.afterRender();
    }

    await component.beforeRender();
    container.innerHTML = component.render();
    component.afterRender();
    if (!guardState) return;
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);


