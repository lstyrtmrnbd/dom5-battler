// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {
    newArmy,
    writeOut
} = require('./batter');

const ARMY1 = {};

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, 'stupid function');
    }
});
