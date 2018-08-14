import { View } from 'backbone.marionette';

export default View.extend({
    tagName: 'div',
    template: _.template('<button></button>'),
    ui: {
        button: 'button'
    },
    triggers: {
        'click @ui.button': {
            event: 'form:toggled',
        },
    },
});