import { View } from 'backbone.marionette';
import parse from 'parse-link-header';

import template from '../../templates/Users/users-paging.jst';

import Radio from '../../Radio';

export default View.extend({
    tagName: 'ul',
    template,
    ui: {
        prev: '#prev-page',
        next: '#next-page',
    },
    triggers: {
        'click @ui.next': {
            event: 'next:clicked',
        },
        'click @ui.prev': {
            event: 'prev:clicked',
        },
    },
    initialize(){
        this.listenTo(Radio, 'links:recieved', this.updateLinks);
    },
    updateLinks(links){
        this.links = links;
    },
    onNextClicked(){
        const { links: {next}, options: {list} } = this;
        const self = this;
        if (next) {
            list.fetch({
                url: next.url,
                complete(response){
                    self.parseLinks(response)
                },
            });
        }
    },
    onPrevClicked(){
        const { links: {prev}, options: {list} } = this;
        const self = this;
        if (prev) {
            list.fetch({
                url: prev.url,
                complete(response){
                    self.parseLinks(response)
                },
            });
        }
    },
    parseLinks(response) {
        const parsed = parse(response.getResponseHeader('Link'));
        Radio.trigger('links:recieved', parsed);
    },
});