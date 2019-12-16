import {Model} from 'backbone';

var SortModel = Model.extend({
    defaults:{
        theme: false,
        category: false,
        planeDate: false,
        priority: false,
        author: false,
        createdDate: false,
        done: false,
        completeDate: false,
        sortMode: "ascending"
    }
});

export {SortModel};