import Backbone from 'backbone';
import Todo from '../models/Todo';

export default Backbone.Collection.extend({
    model: Todo,
    url: 'http://localhost:3000/todos'
});

// export default new Collection();