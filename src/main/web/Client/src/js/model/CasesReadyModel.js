import {Model} from 'backbone';

var CasesReadyModel = Model.extend({
    defaults: {
        ready: false,
        numOfCurrentPage: 1,
        casesLength: 0,
        occupied: false,
    },
});

export {CasesReadyModel};