import {View} from 'backbone.marionette';
import filterTemplate from '../../../../html/permissionsTemplate.html';
import _ from 'underscore';
import {VocabularyController} from '../../controllers/VocabularyController';
import {ListController} from "../../controllers/ListController";
import {PermissionsController} from "../../controllers/PermissionsController";
import {CaseModel} from "../../model/CaseModel";

const UsersPermissionsForm = View.extend({
    user: null,
    template: _.template(filterTemplate),

    regions: {
        'secondRegion': '#list-form-region',
    },

    events: {
        'click #PermissionsSubmit': 'submitClick',
    },

    initialize(options){
        this.user = options.user;
    },

    onRender(){
        this.loadUsers();
    },

    loadUsers(){
        let controller = new PermissionsController();
        controller.setUser(this.user);
        controller.getAllUsers();
    },

    submitClick(){
        let controller = new PermissionsController();
        controller.setUser(this.user);
        controller.sendPermissions();
    }
});

export {UsersPermissionsForm};