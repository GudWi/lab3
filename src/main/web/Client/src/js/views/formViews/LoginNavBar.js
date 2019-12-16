import {View} from 'backbone.marionette';
import navTemplate from '../../../../html/navTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController.js';

const LoginNavBar = View.extend({
    template: _.template(navTemplate),

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("navHeader").textContent =
            VocabularyController.ExtractTextFromVocabulary("navHeader");
    }
});

export {LoginNavBar};