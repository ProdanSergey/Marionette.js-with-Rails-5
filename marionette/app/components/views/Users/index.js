import { View } from 'backbone.marionette';

// Templates
import template from '../../templates/Users/user-list.jst';

// Views
import SearchView       from './search';
import ListView         from './list';
import PagingView       from './list-paging';
import FormView         from './form';
import FormToggleView   from './form-toggle';

//Radio
import Radio from '../../Radio';

export default View.extend({
	template,
	regions: {
        search: '#users-search',
        list: '#list-wrapper',
        paging: '#list-paging',
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
        this.showChildView('search', new SearchView());
        this.showChildView('list', new ListView({collection: this.options.fetched}));
        this.showChildView('paging', new PagingView({list: this.getChildView('list').collection}));
        this.showChildView('form', new FormView());
        this.showChildView('toggle', new FormToggleView());
    },
    onBulkDelete(view, event){
        const users = this.getChildView('list').collection;
        users.where({checked: true}).forEach(model => model.destroy());
    },
    onChildviewSearchSubmit(childView, event) {
        const list = this.getChildView('list');
        const query = event.target.value.toLowerCase();
        list.setFilter(child => {
            const { firstName, lastName } = child.attributes;
            return firstName.toLowerCase().includes(query) || lastName.toLowerCase().includes(query);
        });
    },
    onChildviewFormSubmit(childView, event) {
        const form = event.delegateTarget;
        this.getChildView('list').collection.create(null, {
            processData: false,
            contentType: false,
            data: new FormData(form),
            wait: true,
        });
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

