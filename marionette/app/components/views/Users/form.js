import { View } from 'backbone.marionette';
import form from '../../templates/Users/users-form.jst';

export default View.extend({
    tagName: 'form',
    template: form,
    ui: {
        button: 'button',
    },
    triggers: {
        'click @ui.button': {
            event: 'form:submit',
        }
    },
});