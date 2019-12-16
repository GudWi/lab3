import $ from 'jquery';
import {Application} from 'backbone.marionette';
import {UserModel} from './js/model/UserModel.js';
import {MyRouter} from './js/router/MyRouter.js';
import {Root} from './js/views/Root.js';
import {history} from 'backbone';

//Контейнер для запуска приложения
var App = Application.extend({
    region: 'body',

    //Создание корневого представления
    onStart(){
        var user = null;

        if(localStorage.getItem("user") !== null){
            let oldUser = JSON.parse(localStorage.getItem("user"));
            user = new UserModel();

            if(oldUser.isLogged === true){
                user.set({name: oldUser.name, isLogged: true, state: "", login: oldUser.login});}
        } else {
            user = new UserModel();
        }

        const myRouter = new MyRouter({user: user});

        const root = new Root({
            model: user,
            router: myRouter,
            user: user});

        history.start();

        root.render();
        this.showView(root);
    }
});

//Запуск приложения
$(function () {
    new App().start();
});