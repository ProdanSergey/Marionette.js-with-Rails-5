import { View } from 'backbone.marionette';

export default View.extend({
    tagName: 'input',
    className: 'form-control',
    attributes: {
        type: 'search',
        placeholder: 'Search...',
    },
    template: _.noop,
    triggers: {
        'keyup': {
            event: 'search:submit',
        },
    },
});