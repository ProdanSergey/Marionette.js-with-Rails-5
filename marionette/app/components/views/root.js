import { View } from 'backbone.marionette';
import template from '../templates/root.jst';

import Header from './header';
import Main from './main';
import Footer from './footer';


export default View.extend({
    className: 'grid',
	template,
	regions: {
		header: '#header',
        main: '#main',
        footer: '#footer',
    },
    onRender() {
        this.showChildView('header', new Header());
        this.showChildView('main', new Main());
        this.showChildView('footer', new Footer());
    },
});

