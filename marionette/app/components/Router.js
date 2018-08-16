import { AppRouter } from 'backbone.marionette';
import parse from 'parse-link-header';

import Index from './views/Users';
import User from './views/User';

// Models
import UserModel from './models/User';

// Collections
import collection from './collections/Users';

import Radio from './Radio';

export default AppRouter.extend({
    routes: {
        '': 'index', 
        'users/:id': 'showUser',
    },
    onRoute(name, path, args) {
        
    },
    index() {
        collection.fetch({
            complete(response){
                const links = parse(response.getResponseHeader('Link'));
                const total = response.getResponseHeader('X-Total-Count');
                var parsed = Object.assign({}, links,{total});
                Radio.trigger('links:recieved', parsed);
            },
        }).done(() => this.options.getView().getRegion('main').show(new Index({fetched: collection})));
    },
    showUser(id){
        const model = new UserModel({id});
        model.fetch().done(() => this.options.getView().getRegion('main').show(new User({model})));
    },
});