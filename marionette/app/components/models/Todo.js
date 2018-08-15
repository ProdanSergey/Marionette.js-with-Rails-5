import Backbone from 'backbone';

export default Backbone.Model.extend({
    defaults: {
        todo_text: '',
        todo_done: false,
    },
    urlRoot: 'http://localhost:3000/todos',
    toggle() {
        this.save({todo_done: !this.get('todo_done')})
    },
});