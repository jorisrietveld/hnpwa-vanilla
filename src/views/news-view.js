import { div } from '../core/dom-api';
import { urls } from '../urls';

import { ArticleElement } from '../elements/article-element';

export const NewsView = () => {
    let articles = [];
    let template;
    let count = 30;
    let pageNumber = 1;

    const nextPage = () => {
        pageNumber += 1;
        loadData();
    };

    const previousPage = () => {
        pageNumber -= 1;
        pageNumber = Math.max(pageNumber, 1);

        // Load the data afterwards
        loadData();
    };

    const loadData = () => {
        fetch(urls.new(pageNumber))
            .then(res => res.json())
            .then(res => {
                articles = res.map(itemData => {
                    return ArticleElement({ ...itemData  });
                });

                render();
            });
    };

    function createTemplate() {
        return div({
            className: 'new-view'
        }, articles);
    }

    function render() {
        template.parentElement.replaceChild(createTemplate(), template);
    }

    template = createTemplate();
    loadData();

    return template;
};