import {View} from 'backbone.marionette';
import navWhenLoggedTemplate from '../../../../html/navWhenLoggedTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController.js';
import {RootController} from '../../controllers/RootController.js';

const NavBar = View.extend({
    user: null,

    template: _.template(navWhenLoggedTemplate),

    events: {
        'click #logout': 'logoutClick',
        'click #img': 'imgClick'
    },

    initialize(options){
        this.user = options.user;
    },

    logoutClick(){
        console.log("logout");
        let controller = new RootController();
        controller.setUser(this.user);
        controller.logOut();
    },

    imgClick(){
        this.user.set({state: ""});
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("navLoggedHeader").textContent =
            VocabularyController.ExtractTextFromVocabulary("navLoggedHeader");
        document.getElementById("logout").textContent =
            VocabularyController.ExtractTextFromVocabulary("logout");
    }
});

export {NavBar};