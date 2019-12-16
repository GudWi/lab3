import {Model} from 'backbone';

var ListToggleModel = Model.extend({
    defaults: {
        click: false,
        formState: "none",
        previousState: "none"
    },
});

export {ListToggleModel};