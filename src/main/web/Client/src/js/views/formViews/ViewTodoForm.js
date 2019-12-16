import {View} from 'backbone.marionette';
import viewTodoTemplate from '../../../../html/viewTodoTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController.js';
import {ViewController} from '../../controllers/ViewController.js';
import {CaseModel} from '../../model/CaseModel.js';
import moment from 'moment';
import {ListHeadForm} from "./ListHeadForm";
import {UsersPermissionsForm} from "./UsersPermissionsForm";

const ViewTodoForm = View.extend({
    template: _.template(viewTodoTemplate),
    user: null,
    todo: null,
    access: false,

    modelEvents: {
          'change:ready': 'showCase'
    },

    events: {
          'click #viewBack': 'backClick',
          'click #viewDelete': 'deleteClick',
          'click #viewEdit': 'editClick',
          'click #viewPermissions': 'permissionsClick',
    },

    regions: {
        'firstRegion': '#permission-region',
    },

    initialize(options){
        this.user = options.user;
        this.todo = new CaseModel();
        this.mark = options.mark;
    },

    onRender(){
        this.checkAccess();
        this.loadCase();
    },

    permissionsClick(){
        let region = this.getRegion('firstRegion');
        const usersPermissionsForm = new UsersPermissionsForm({user: this.user});
        region.show(usersPermissionsForm);
    },

    backClick(){
        this.user.set({state: ""});
    },

    checkAccess(){
        let controller = new ViewController();
        controller.setUser(this.user);
        controller.setAccess(this.access);
        controller.checkAccess();
    },

    deleteClick(){
        let controller = new ViewController();
        controller.setUser(this.user);
        controller.setMark(this.mark);
        controller.deleteCase(this.todo);
    },

    editClick(){
        this.user.set({state: "editTodo"});
    },

    loadCase(){
        let controller = new ViewController();
        controller.setUser(this.user);
        controller.setMark(this.mark);
        controller.loadCase(this.todo);
    },

    showCase(){
        document.getElementById("viewHead").textContent = VocabularyController.ExtractTextFromVocabulary("viewTodoHead") + " " + this.user.get("currentCaseId");
        document.getElementById("viewThemeName").textContent = this.todo.get("theme");
        document.getElementById("viewDescription").textContent = this.todo.get("description");
        document.getElementById("viewName").textContent = this.todo.get("userName");
        document.getElementById("viewCreationDate").textContent = this.getDate(this.todo.get("createdDate"));
        document.getElementById("viewPriority").textContent = this.getPriority(this.todo.get("priority"));
        document.getElementById("viewPlaneDate").textContent = this.getDate(this.todo.get("planeDate"));
        document.getElementById("viewCategory").textContent = this.getCategory(this.todo.get("category"));
        document.getElementById("viewCompleteDate").textContent = this.getDate(this.todo.get("completeDate"));
        document.getElementById("viewDone").textContent = this.getDone(this.todo.get("done"));
    },

    getPriority(priority){
        if(priority === "high"){
            return VocabularyController.ExtractTextFromVocabulary("optionsPriorityHigh");
        } else if(priority === "medium"){
            return VocabularyController.ExtractTextFromVocabulary("optionsPriorityMedium");
        } else if(priority === "low"){
            return VocabularyController.ExtractTextFromVocabulary("optionsPriorityLow");
        }
    },

    getCategory(category){
        if(category === "programming"){
            return VocabularyController.ExtractTextFromVocabulary("optionsCategoryProgramming");
        } else if(category === "administrating"){
            return VocabularyController.ExtractTextFromVocabulary("optionsCategoryAdministrating");
        } else if(category === "education"){
            return VocabularyController.ExtractTextFromVocabulary("optionsCategoryEducation");
        }
    },

    getDone(done){
        if(done){
            return VocabularyController.ExtractTextFromVocabulary("optionsDoneYes");
        }else{
            return VocabularyController.ExtractTextFromVocabulary("optionsDoneNo");
        }
    },

    getDate(date){
        if(date !== null){
            return moment(new Date(date)).format('DD MM YYYY hh:mm:ss');
        } else {
            return ""
        }
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("viewHead").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewHead");
        document.getElementById("viewEdit").value =
            VocabularyController.ExtractTextFromVocabulary("viewEdit");
        document.getElementById("viewDelete").value =
            VocabularyController.ExtractTextFromVocabulary("viewDelete");
        document.getElementById("viewTheme").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewTheme");
        document.getElementById("viewDescriptionLabel").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewDescriptionLabel");
        document.getElementById("viewAuthor").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewAuthor");
        document.getElementById("viewCreationDateLabel").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewCreationDateLabel");
        document.getElementById("viewPriorityLabel").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewPriorityLabel");
        document.getElementById("viewPlaneDateLabel").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewPlaneDateLabel");
        document.getElementById("viewCategoryLabel").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewCategoryLabel");
        document.getElementById("viewCompleteDateLabel").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewCompleteDateLabel");
        document.getElementById("viewDoneLabel").textContent =
            VocabularyController.ExtractTextFromVocabulary("viewDoneLabel");
        document.getElementById("viewBack").value =
            VocabularyController.ExtractTextFromVocabulary("viewBack");
        document.getElementById("viewPermissions").value =
            VocabularyController.ExtractTextFromVocabulary("viewPermissions");
    }
});

export {ViewTodoForm};