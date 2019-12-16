import {View} from 'backbone.marionette';
import addListTemplate from '../../../../html/addListTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController.js';
import {ListController} from '../../controllers/ListController.js';

const AddListForm = View.extend({
    template: _.template(addListTemplate),
    mark: null,
    cases: null,

    initialize(options){
        this.mark = options.mark;
        this.cases = options.cases;
    },

    events: {
        'click #addListApply': 'addClick',
    },

    regions: {
        'secondRegion': '#list-form-region',
    },

    addClick(){
        if(!this.mark.get("occupied")) {
            this.mark.set({occupied: true});
            let mark = true;

            if (document.getElementById("themeAdd").value === "") {
                document.getElementById("themeAdd").style.borderColor = "#ff0000";
                mark = false;
            } else {
                document.getElementById("themeAdd").style.borderColor = "";
            }

            if (document.getElementById("priorityAdd").value === "") {
                document.getElementById("priorityAdd").style.borderColor = "#ff0000";
                mark = false;
            } else {
                document.getElementById("priorityAdd").style.borderColor = "";
            }

            if (document.getElementById("plannedDateAdd").value === "") {
                document.getElementById("plannedDateAdd").style.borderColor = "#ff0000";
                mark = false;
            } else {
                document.getElementById("plannedDateAdd").style.borderColor = "";
            }

            if (document.getElementById("category").value === "") {
                document.getElementById("category").style.borderColor = "#ff0000";
                mark = false;
            } else {
                document.getElementById("category").style.borderColor = "";
            }

            if (mark) {
                document.getElementById("addListWarn").style.visibility = "hidden";
                let controller = new ListController();
                controller.setMark(this.mark);
                controller.setCases(this.cases);
                controller.addCase();
            } else {
                document.getElementById("addListWarn").style.visibility = "visible";
                document.getElementById("addListWarn").textContent =
                    VocabularyController.ExtractTextFromVocabulary("addListWarn");
            }
        }
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("addListTheme").textContent =
            VocabularyController.ExtractTextFromVocabulary("addListTheme");
        document.getElementById("addListPriority").textContent =
            VocabularyController.ExtractTextFromVocabulary("addListPriority");
        document.getElementById("addListCategory").textContent =
            VocabularyController.ExtractTextFromVocabulary("addListCategory");
        document.getElementById("addListDescription").textContent =
            VocabularyController.ExtractTextFromVocabulary("addListDescription");
        document.getElementById("addListPlaneDate").textContent =
            VocabularyController.ExtractTextFromVocabulary("addListPlaneDate");
        document.getElementById("addListAuthor").textContent =
            VocabularyController.ExtractTextFromVocabulary("addListAuthor");
        document.getElementById("addListApply").value =
            VocabularyController.ExtractTextFromVocabulary("addListApply");
        document.getElementById("authorAdd").placeholder = localStorage.getItem("user").name;
    },

});

export{AddListForm};