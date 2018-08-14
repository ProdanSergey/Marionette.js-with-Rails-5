import { View } from 'backbone.marionette';

//Templates
import template from '../../templates/User/user.jst';
//Views
import TodoListView from './todolist';
//Models
import List from '../../models/List';

export default View.extend({
	tagName: 'div',
	template,
	regions: {
		todolist: '.todolist',
	},
	modelEvents: {
		'change': 'render',
	},
	onRender() {
		const model = new List({id: this.model.get('list_id')});
		model.fetch().done(() => this.showChildView('todolist', new TodoListView({model})));
	},
});

