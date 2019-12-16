import {Router} from 'backbone';

const MyRouter = Router.extend({
    user: null,

    routes: {
      "": "default", //страница со списком дел
      "login(/)": "login", //страница логина
      "registration" : "registration", //страница регистрации
      "todo/:id(/)": "viewTodo", //страница с просмотром дела
      "todo/edit/:id": "editTodo", //страница с редактированием дела
      "*query": "default" //остальные страницы переходят на страницу со списком дел
    },

    initialize(options){
        this.user = options.user;
    },

    default: function () {
        this.user.set({state:""});
    },

    login: function () {
        this.user.set({state:"login"});
    },

    registration: function () {
        this.user.set({state:"registration"});
    },

    viewTodo: function (id) {
        this.user.set({state:"viewTodo", currentCaseId:id});
    },

    editTodo: function (id) {
        this.user.set({state:"editTodo", currentCaseId: id});
    }
});

export {MyRouter};