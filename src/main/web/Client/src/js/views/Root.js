import {View} from 'backbone.marionette';
import _ from 'underscore';
import regionTemplate from '../../../html/regionTemplate.html';
import {RootController} from '../controllers/RootController.js';
import {LoginNavBar} from './formViews/LoginNavBar.js';
import {NavBar} from './formViews/NavBar.js';
import {LoginForm} from './formViews/LoginForm.js';
import {ListToggleModel} from '../model/ListToggleModel.js';
import {ListForm} from './formViews/ListForm';
import {RegistrationForm} from './formViews/RegistrationForm.js';
import {CasesReadyModel} from '../model/CasesReadyModel.js';
import {ViewTodoForm} from './formViews/ViewTodoForm.js';
import {EditTodoForm} from './formViews/EditTodoForm.js';

const Root = View.extend({
    template: _.template(regionTemplate),
    router: null,
    user: null,

    modelEvents: {
        'change:state': 'stateChange',
        'change:currentCaseId':'stateChange',
        'change:vocabularyLoaded':'stateChange'
    },

    regions: {
        'firstRegion': '#js-nav-region',
        'secondRegion': '#js-center-region'
    },

    initialize(options){
        this.router = options.router;
        this.user = options.user;
        this.status = options.status;
    },

    onRender() {
        this.loadVocabulary();
    },

    loadVocabulary(){
        var controller = new RootController();
        controller.setUser(this.user);
        controller.getLocaleStorage();
    },

    stateChange(){
        if(this.user.get("isLogged") === false && this.user.get("state") !== "registration") {
            this.router.navigate("login", true);
        }

        if(this.user.get("state") === ""){
            this.showNavBar();
            this.showListForm();
            this.router.navigate("", true);
        } else if(this.user.get("state") === "registration"){
            this.showLoginNavBar();
            this.showRegistrationForm();
            this.router.navigate("registration", true);
        } else if(this.user.get("state") === "login"){
            this.showLoginNavBar();
            this.showLoginForm();
            this.router.navigate("login", true);
        } else if(this.user.get("state") === "viewTodo"){
            this.showNavBar();
            this.showViewForm();
            this.router.navigate("todo/" + this.user.get("currentCaseId"), true);
        } else if(this.user.get("state") === "editTodo"){
            this.showNavBar();
            this.showEditForm();
            this.router.navigate("todo/edit/" + this.user.get("currentCaseId"), true);
        } else {
            this.router.navigate("login", true);
        }
    },

    showLoginNavBar(){
        let region = this.getRegion('firstRegion');
        const navBar = new LoginNavBar();
        region.show(navBar);
    },

    showNavBar(){
        let region = this.getRegion('firstRegion');
        const navBar = new NavBar({user: this.user});
        region.show(navBar);
    },

    showLoginForm(){
        let region = this.getRegion('secondRegion');
        const loginForm = new LoginForm({user: this.user});
        region.show(loginForm);
    },

    showListForm(){
        let toggle = new ListToggleModel();
        let region = this.getRegion('secondRegion');
        const listForm = new ListForm({
            model: toggle,
            toggle: toggle,
            user: this.user
        });
        region.show(listForm);
    },

    showRegistrationForm(){
        let region = this.getRegion('secondRegion');
        const registrationForm = new RegistrationForm({user: this.user});
        region.show(registrationForm);
    },

    showViewForm(){
        let region = this.getRegion('secondRegion');
        let mark = new CasesReadyModel({ready: false});

        const viewForm = new ViewTodoForm({
            user: this.user,
            model: mark,
            mark: mark
        });
        region.show(viewForm);
    },

    showEditForm(){
        let region = this.getRegion('secondRegion');
        let mark = new CasesReadyModel({ready: false});

        const editForm = new EditTodoForm({
            user: this.user,
            model: mark,
            mark: mark
        });
        region.show(editForm);
    }
});

export {Root};