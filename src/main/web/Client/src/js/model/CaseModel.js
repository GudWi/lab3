import {Model} from 'backbone';

var CaseModel = Model.extend({
    defaults: {
        theme: "",
        category: "",
        planeDate: new Date(),
        priority: "",
        userName: "",
        description: "",
        done: false,
    },
});

export {CaseModel}