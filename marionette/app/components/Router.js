import { AppRouter } from 'backbone.marionette';

import Index from './views/Users';
import User from './views/User';

import UserModel from './models/User';

export default AppRouter.extend({
    routes: {
        '': 'index', 
        'users/:id': 'showUser',
    },
    onRoute(name, path, args) {
        
    },
    index() {
        this.options.getView().getRegion('main').show(new Index());
    },
    showUser(id){
        const model = new UserModel({id});
        model.fetch().done(() => this.options.getView().getRegion('main').show(new User({model})))
    },
});