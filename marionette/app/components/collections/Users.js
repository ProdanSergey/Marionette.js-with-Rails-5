import Backbone from 'backbone';
import User from '../models/User';

const Collection = Backbone.Collection.extend({
    model: User,
    url: 'http://localhost:3000/users'
});

export default new Collection();