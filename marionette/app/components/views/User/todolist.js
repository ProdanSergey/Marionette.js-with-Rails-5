import { View, CollectionView } from 'backbone.marionette';

// Templates
import template from '../../templates/User/todolist.jst';
import item from '../../templates/User/todo.jst';

//Collections
import TodoCollection from '../../collections/Todos';

const listItem = View.extend({
    tagName: 'li',
    template: item,
    ui: {
        toggle: 'input[type="checkbox"]',
        button: 'button',
    },
    triggers: {
        'change @ui.toggle': {
            event: 'todo:toggle',
        },
        'click @ui.button': {
            event: 'todo:remove',
        },
    },
    onRender() {
        
        this.ui.toggle.prop('checked', this.model.get('todo_done'));
    },
})

const List = CollectionView.extend({
    tagName: 'ul',
    template: _.noop,
    childView: listItem,
    childViewEvents: {
        'todo:toggle': 'toggleTodoState',
        'todo:remove': 'removeTodo',
    },
    toggleTodoState(childView){
        childView.model.toggle();
    },
    removeTodo(childView){
        childView.model.destroy();
    },
})

const Input = View.extend({
    tagName: 'input',
    attributes: {
        type: 'text',
        placeholder: 'Add todo to list',
    },
    template: _.noop,
    triggers: {
        'keyup': {
            event: 'todo:add',
        }
    }
})

export default View.extend({
    tagName: 'div',
    className: 'todolist__wrapper box',
    template,
    regions: {
        list: '.todolist__list',
        input: '.todolist__input',
    },
    ui: {
        addtodo: '.todolist__input input',
        todolist: '.todolist__list ul',
    },
    onRender() {
        const collection = new TodoCollection(this.model.get('todos'))
        this.showChildView('input', new Input());
        this.showChildView('list', new List({collection}));
    },
    onChildviewTodoAdd(childView, event) {
        if (event.keyCode === 13) {
            const list = this.getChildView('list');
            list.collection.create({
                list_id: this.model.get('id'),
                todo_text: event.target.value,
            })
        }
    },
});