import {View} from 'backbone.marionette';
import headListFormTemplate from '../../../../html/headListFormTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController.js';

const ListHeadForm = View.extend({
    template: _.template(headListFormTemplate),
    toggle: null,

    regions: {
        'firstRegion': '#list-head-region'
    },

    events: {
        'click #headListAdd': 'addClick',
        'click #headListFilter': 'filterClick',
        'click #headListExport': 'exportClick'
    },

    initialize(options){
        this.toggle = options.toggle;
    },

    addClick(){
        this.toggle.set({formState: "add"});

        if(this.toggle.get("click")){
            this.toggle.set({click: false});
        }else{
            this.toggle.set({click: true});
        }
    },

    filterClick(){
        this.toggle.set({formState: "filter"});

        if(this.toggle.get("click")){
            this.toggle.set({click: false});
        }else{
            this.toggle.set({click: true});
        }
    },

    exportClick(){
        this.toggle.set({formState: "export"});

        if(this.toggle.get("click")){
            this.toggle.set({click: false});
        }else{
            this.toggle.set({click: true});
        }
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("headListAdd").textContent =
            VocabularyController.ExtractTextFromVocabulary("headListAdd");
        document.getElementById("headListFilter").textContent =
            VocabularyController.ExtractTextFromVocabulary("headListFilter");
        document.getElementById("headListExport").textContent =
            VocabularyController.ExtractTextFromVocabulary("headListExport");
    }
});

export {ListHeadForm};