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
    const CLS_SWITCHABLE = 'card--switchable';
    const CLS_HIDDEN = 'card--switchable--hidden';

    let hideTimeout;

    let cards = [];

    let updateCardZIndexes = (cards) => {
        for (let card of cards) {
            card.style.zIndex = Math.abs(cards.indexOf(card) - cards.length);
        }
    }

    let transitionCards = (cards) => {
        let currentCard = cards[0];
        let lastCard = cards[cards.length - 1];
        let otherCards = cards.slice(1, cards.length - 1);

        for (let card of otherCards) {
            card.classList.add(CLS_HIDDEN);
        }

        window.requestAnimationFrame((time) => {
            currentCard.classList.add(CLS_HIDDEN);

            window.requestAnimationFrame((time) => {
                currentCard.classList.remove(CLS_HIDDEN);

                hideTimeout = window.setTimeout(() => {
                    lastCard.classList.add(CLS_HIDDEN);
                }, 1000);
            });
        });
    }

    let rotateCards = (cards) => {
        cards.push(cards.shift());
    }

    function handleClick () {
        if (hideTimeout) {
            window.clearTimeout(hideTimeout);
        }

        rotateCards(cards);
        updateCardZIndexes(cards);
    }

    for (let el of elements) {
        el.addEventListener('click', handleClick);
        el.classList.add(CLS_HIDDEN);
        cards.push(el);
    }

    updateCardZIndexes(cards);
    transitionCards(cards);
}

initCardSwitcher(...document.getElementsByClassName('space'));
