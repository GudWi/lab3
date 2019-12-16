import {View} from 'backbone.marionette';
import registrationFormTemplate from '../../../../html/registrationFormTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController.js';
import {RootController} from '../../controllers/RootController.js';

const RegistrationForm = View.extend({
    template: _.template(registrationFormTemplate),
    user: null,

    events: {
        'click #registrationSubmit': 'registrationClick'
    },

    regions: {
        'centerRegion' : '#js-center-region'
    },

    initialize(options){
        this.user = options.user;
    },

    registrationClick() {
        let controller = new RootController();
        controller.setUser(this.user);
        controller.registrationUser();
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("registrationHeader").textContent =
            VocabularyController.ExtractTextFromVocabulary("registrationHeader");
        document.getElementById("registrationLogin").textContent =
            VocabularyController.ExtractTextFromVocabulary("registrationLogin");
        document.getElementById("registrationPassword").textContent =
            VocabularyController.ExtractTextFromVocabulary("registrationPassword");
        document.getElementById("registrationSubmit").value =
            VocabularyController.ExtractTextFromVocabulary("registrationSubmit");
    }
});

export {RegistrationForm};