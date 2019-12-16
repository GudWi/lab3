import {Model} from 'backbone';

var UserModel = Model.extend({
    defaults: {
        login: "",
        name: "",
        isLogged: false,
        state: "login",
        currentCaseId: 0,
        vocabularyLoaded: false
    },
});

export {UserModel};