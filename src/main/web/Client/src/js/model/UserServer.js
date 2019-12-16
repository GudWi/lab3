import {Model} from 'backbone';

var UserServer = Model.extend({
    defaults: {
        login: "",
        password: "",
    },
});

export {UserServer};