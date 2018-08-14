import { View } from 'backbone.marionette';
import template from '../../templates/Users/user-list.jst';

import ListView from './list';
import FormView from './form';
import FormToggleView from './form-toggle';

import Radio from '../../Radio';

export default View.extend({
	template,
	regions: {
        list: '#list-wrapper',
        form: '#users-form',
        toggle: '#users-formToggle',
    },
    ui: {
        bulk: '#bulk-delete'
    },
    triggers: {
        'click @ui.bulk': {
            event: 'bulk:delete',
        },
    },
    onRender() {
        this.showChildView('list', new ListView());
        this.showChildView('form', new FormView());
        this.showChildView('toggle', new FormToggleView());
    },
    onBulkDelete(view, event){
        const users = this.getChildView('list').collection;
        users.remove(users.where({checked: true}));
    },
    onChildviewFormSubmit(childView, event) {
        const form = event.delegateTarget;
        this.getChildView('list').collection.create(null, {
            processData: false,
            contentType: false,
            data: new FormData(form),
            wait: true, // OH MY FUCKING GOD!!!
        })
        form.reset();
    },
    onChildviewFormToggled(childView, event) {
        this.getChildView('form').$el.parent().toggle()
        event.target.classList.toggle('clicked')
    },
    onChildviewCollectionChanged(childView) {
        const condition = childView.collection.where({checked: true}).length;
        this.ui.bulk.prop('hidden', condition < 2);
        Radio.trigger('users:changed', condition);
    },
});

