import { Application } from 'backbone.marionette';
import Root from './views/root'

import Router from './Router'

export default Application.extend({
    region: '#app',
    
    onStart(options) {
        this.showView(new Root());
        new Router(options);
        Backbone.history.start();
    },
});

