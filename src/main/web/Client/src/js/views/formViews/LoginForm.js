import {View} from 'backbone.marionette';
import loginFormTemplate from '../../../../html/loginFormTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController.js';
import {RootController} from "../../controllers/RootController";

const LoginForm = View.extend({
    template: _.template(loginFormTemplate),
    user: null,

    events: {
        'click #loginBut': 'loginClick',
        'click #registrationBut': 'registrationClick'
    },

    regions: {
        'centerRegion' : '#js-center-region'
    },

    initialize(options){
        this.user = options.user;
    },

    loginClick() {
        let controller = new RootController();
        controller.setUser(this.user);
        controller.checkUser();
    },

    registrationClick() {
        this.user.set({state: "registration"})
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("loginFormHeader").textContent =
            VocabularyController.ExtractTextFromVocabulary("loginFormHeader");
        document.getElementById("loginFormLogin").textContent =
            VocabularyController.ExtractTextFromVocabulary("loginFormLogin");
        document.getElementById("loginFormName").placeholder =
            VocabularyController.ExtractTextFromVocabulary("loginFormName");
        document.getElementById("loginFormPassword").textContent =
            VocabularyController.ExtractTextFromVocabulary("loginFormPassword");
        document.getElementById("loginFormPass").placeholder =
            VocabularyController.ExtractTextFromVocabulary("loginFormPass");
        document.getElementById("loginBut").value =
            VocabularyController.ExtractTextFromVocabulary("loginBut");
        document.getElementById("registrationBut").value =
            VocabularyController.ExtractTextFromVocabulary("registrationBut");
    }
});

export {LoginForm};