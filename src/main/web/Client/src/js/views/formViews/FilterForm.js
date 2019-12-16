import {View} from 'backbone.marionette';
import filterTemplate from '../../../../html/filterTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController';

const FilterForm = View.extend({
    template: _.template(filterTemplate),

    regions: {
        'secondRegion': '#list-form-region',
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("filterTheme").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterTheme");
        document.getElementById("filterPriority").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterPriority");
        document.getElementById("filterDone").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterDone");
        document.getElementById("filterCategory").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterCategory");
        document.getElementById("filterAuthor").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterAuthor");
        document.getElementById("filterDoneWith").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterDoneWith");
        document.getElementById("filterPlanningWith").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterPlanningWith");
        document.getElementById("filterCreatedWith").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterCreatedWith");
        document.getElementById("filterDoneBy").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterDoneBy");
        document.getElementById("filterPlanningBy").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterPlanningBy");
        document.getElementById("filterCreatedBy").textContent =
            VocabularyController.ExtractTextFromVocabulary("filterCreatedBy");
        document.getElementById("filterApply").value =
            VocabularyController.ExtractTextFromVocabulary("filterApply");
    }
});

export {FilterForm};