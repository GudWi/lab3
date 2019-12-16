import {View} from 'backbone.marionette';
import _ from 'underscore';
import listRegionTemplate from '../../../../html/listRegionTemplate.html';
import {VocabularyController} from '../../controllers/VocabularyController.js';
import {CasesReadyModel} from '../../model/CasesReadyModel';
import {ListHeadForm} from './ListHeadForm.js';
import {AddListForm} from './AddListForm.js';
import {FilterForm} from './FilterForm.js';
import {SortModel} from '../../model/SortModel.js';
import {TableForm} from './TableForm.js';
import {IndexForm} from './IndexForm.js';

const ListForm = View.extend({
    template: _.template(listRegionTemplate),
    toggle: null,
    mark: null,
    user: null,
    cases: [],


    modelEvents: {
        'change:click': 'clickChange'
    },

    regions: {
        'firstRegion': '#list-head-region',
        'secondRegion': '#list-form-region',
        'thirdRegion': '#list-body-region',
        'fourthRegion': '#list-index-region'
    },

    initialize(options){
        this.toggle = options.toggle;
        this.mark = new CasesReadyModel();
        this.mark.set({ready: false, num: 1});
        this.user = options.user;
    },

    onRender(){
        this.showHeadForm();
        this.showBodyForm();
        this.showIndexForm();
    },

    clickChange(){
        if(this.toggle.get("formState") === "none"){
            this.getRegion('secondRegion').empty();
            this.toggle.set({previousState: "none"});
        }else if(this.toggle.get("formState") === "add"){
            if(this.toggle.get("previousState") === "add"){
                this.getRegion('secondRegion').empty();
                this.toggle.set({previousState: "none"});
            }else{
                this.showAddForm();
                this.toggle.set({previousState: "add"})}
        }else if(this.toggle.get("formState") === "filter"){
            if(this.toggle.get("previousState") === "filter"){
                this.getRegion('secondRegion').empty();
                this.toggle.set({previousState: "none"});
            }else{
                this.showFilterForm();
                this.toggle.set({previousState: "filter"})
            }
        }else if(this.toggle.get("formState") === "export"){
            this.getRegion('secondRegion').empty();
            this.toggle.set({previousState: "none"});
        }
    },

    showHeadForm(){
        let region = this.getRegion('firstRegion');
        const listHeadForm = new ListHeadForm({toggle: this.toggle});
        region.show(listHeadForm);
    },

    showAddForm(){
        let currentUser = JSON.parse(localStorage.getItem("user"));

        let region = this.getRegion('secondRegion');
        const addForm = new AddListForm({
            mark: this.mark,
            cases: this.cases
        });
        region.show(addForm);
        document.getElementById("authorAdd").placeholder = currentUser.name;
    },

    showFilterForm(){
        let region = this.getRegion('secondRegion');
        const filterForm = new FilterForm();
        region.show(filterForm);
    },

    showBodyForm(){
        let region = this.getRegion('thirdRegion');
        let sort = new SortModel({
            theme: false,
            category: false,
            planeDate: false,
            priority: false,
            author: false,
            createdDate: false,
            done: false,
            completeDate: false
        });

        this.mark.set({ready: false});
        const tableForm = new TableForm({
            model: this.mark,
            mark: this.mark,
            cases: this.cases,
            user: this.user,
            sort: sort
        });
        region.show(tableForm);
    },

    showIndexForm(){
        let region = this.getRegion('fourthRegion');

        const indexForm = new IndexForm({
            model: this.mark,
            mark: this.mark
        });
        region.show(indexForm);
    },

});

export {ListForm};