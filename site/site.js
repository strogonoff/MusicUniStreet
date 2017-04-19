import { button, autoInit } from 'material-components-web';
import '@material/button/mdc-button.scss';
import '@material/fab/mdc-fab.scss';

import _ from 'lodash';


// Webpack: include these assets

import './facebook.svg';
import './line.svg';
import './map.svg';

import './style.css';


// Initialize MDC

autoInit()


// Initialize card content switcher

let initCardSwitcher = (...elements) => {
    const STARTING_ZINDEX = 1000;
    let cards = [];

    function handleClick () {
        this.style.zIndex = _.min(cards.map((el) => {
            return el.style.zIndex;
        })) - 1;
    }

    for (let el of elements) {
        var zIndex = -1 * elements.indexOf(el) + STARTING_ZINDEX;
        el.style.zIndex = zIndex;

        el.addEventListener('click', handleClick);

        cards.push(el);
    }
}

initCardSwitcher(...document.getElementsByClassName('space'));
