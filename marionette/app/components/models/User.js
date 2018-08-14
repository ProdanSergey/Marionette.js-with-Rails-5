import Backbone from 'backbone';

export default Backbone.Model.extend({
    defaults: {
        avatar: {},
        firstName: '',
        lastName: '',
        checked: false,
    },
    urlRoot: 'http://localhost:3000/users',
    toggle() {
        this.set({checked: !this.get('checked')})
    },
});