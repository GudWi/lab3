import {View} from 'backbone.marionette';
import $ from 'jquery';
import editTodoTemplate from '../../../../html/editTodoTemplate.html';
import _ from 'underscore';
import {CaseModel} from '../../model/CaseModel.js';
import {ViewController} from '../../controllers/ViewController.js';
import moment from 'moment';
import {VocabularyController} from '../../controllers/VocabularyController.js';

const EditTodoForm = View.extend({
    template: _.template(editTodoTemplate),
    user: null,
    todo: null,

    modelEvents: {
        'change:ready': 'showCase'
    },

    events: {
        'click #editSave': 'saveClick',
        'click #editCancel': 'cancelClick',
    },

    initialize(options){
        this.user = options.user;
        this.todo = new CaseModel();
        this.mark = options.mark;
    },

    onRender(){
        this.loadCase();
    },

    cancelClick(){
        this.user.set({state: "viewTodo"});
    },

    saveClick(){
        let controller = new ViewController();
        controller.setUser(this.user);
        controller.setMark(this.mark);
        controller.updateCase(this.todo);
    },

    loadCase(){
        let controller = new ViewController();
        controller.setUser(this.user);
        controller.setMark(this.mark);
        controller.loadCase(this.todo);
    },

    showCase(){
        document.getElementById("editHead").textContent = "Редактирование дела № "
            + this.user.get("currentCaseId");
        document.getElementById("editTheme").value = this.todo.get("theme");
        document.getElementById("editDescription").value = this.todo.get("description");
        document.getElementById("editAuthor").value = this.todo.get("userName");
        document.getElementById("editCreationDate").value = this.getDate(this.todo.get("createdDate"));
        document.getElementById("editPriority").value = this.getPriority(this.todo.get("priority"));
        document.getElementById("editPlaneDate").value = this.getDate(this.todo.get("planeDate"));
        document.getElementById("editCategory").value = this.getCategory(this.todo.get("category"));
        document.getElementById("editCompleteDate").value = this.getDate(this.todo.get("completeDate"));
        document.getElementById("editSave").checked = this.todo.get("editSave");
        document.getElementById("editDone").checked = this.todo.get("done");
    },

    getPriority(priority){
        if(priority === "high"){
            return "Высокий"
        } else if(priority === "medium"){
            return "Средний"
        } else if(priority === "low"){
            return "Низкий"
        }
    },

    getCategory(category){
        if(category === "programming"){
            return "Программирование"
        } else if(category === "administrating"){
            return "Администрирование"
        } else if(category === "education"){
            return "Обучение"
        }
    },

    getDate(date){
        if(date !== null){
            return moment(new Date(date)).format('DD MM YYYY HH:mm:ss');
        } else {
            return ""
        }
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("editHead").textContent =
            VocabularyController.ExtractTextFromVocabulary("editHead");
        document.getElementById("editTodoTheme").textContent =
            VocabularyController.ExtractTextFromVocabulary("editTodoTheme");
        document.getElementById("editTodoDescription").textContent =
            VocabularyController.ExtractTextFromVocabulary("editTodoDescription");
        document.getElementById("editTodoAuthor").textContent =
            VocabularyController.ExtractTextFromVocabulary("editTodoAuthor");
        document.getElementById("editTodoCreationDate").textContent =
            VocabularyController.ExtractTextFromVocabulary("editTodoCreationDate");
        document.getElementById("editTodoPlaneDate").textContent =
            VocabularyController.ExtractTextFromVocabulary("editTodoPlaneDate");
        document.getElementById("editTodoCategory").textContent =
            VocabularyController.ExtractTextFromVocabulary("editTodoCategory");
        document.getElementById("editTodoCompleteDate").textContent =
            VocabularyController.ExtractTextFromVocabulary("editTodoCompleteDate");
        document.getElementById("editTodoDone").textContent =
            VocabularyController.ExtractTextFromVocabulary("editTodoDone");
        document.getElementById("editCancel").value =
            VocabularyController.ExtractTextFromVocabulary("editCancel");
    }
});

export {EditTodoForm};

