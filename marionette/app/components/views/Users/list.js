import { View, CollectionView } from 'backbone.marionette';
import item from '../../templates/Users/user.jst';
import collection from '../../collections/Users';

import Radio from '../../Radio';

collection.fetch();

const userView = View.extend({
    tagName: 'li',
    template: item,
    ui: {
        checkbox: 'input[type="checkbox"]',
        delete: 'button',
        link: 'a',
    },
    triggers: {
        'change @ui.checkbox': {
            event: 'user:checked',
        },
        'click @ui.delete': {
            event: 'user:removed',
        },
        'click @ui.link': {
            event: 'user:selected',
        }
    },
    modelEvents: {
        'change:checked': 'userIsChecked',
    },
    initialize() {
        this.listenTo(Radio, 'users:changed', this.toggleDeleteButtonsClass);
    },
    toggleDeleteButtonsClass(condition){
        if(condition > 1) {
            this.ui.delete.hide();
        } else {
            this.ui.delete.show();
        }
    },
    userIsChecked(model, value) {
        this.ui.delete.prop('hidden', !value);
    },
});

export default CollectionView.extend({
    tagName: 'ul',
    collection,
    childView: userView,
    collectionEvents: {
        'remove': 'userIsRemoveFromCollection',
    },
    childViewEvents: {
        'user:checked' : 'userChecked',
        'user:removed' : 'userRemoved',
        'user:selected': 'userSelected',
    },
    userIsRemoveFromCollection(user) {
        user.destroy();
        this.trigger('collection:changed', this);
    },
    userChecked(childView, event){ 
        childView.model.toggle();
        this.trigger('collection:changed', this);
    },
    userSelected(childView, event) {
        Backbone.history.navigate(`users/${event.target.dataset.user}`, {trigger: true});
    },
    userRemoved(childView, event) {
        childView.model.collection.remove(childView.model);
    },
});