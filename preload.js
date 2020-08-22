const fs = require('fs');

const {newArmy, newCommander, example} = require('./src/army');
const {writeOut} = require('./src/battler');

const DATA_FILE = `${__dirname}/gamedata/dmi_data.json`;
const LOG_ID =  'pageLog';

/**
 *  Immediately executed initializer prepares all dynamic data
 */
(function initialize() {
    window.ARMY1 = newArmy(50);
    window.ARMY1.name = 'Army 1';
    window.ARMY1.displayId = 'army1Display';

    window.ARMY2 = newArmy(58);
    window.ARMY2.name = 'Army 2';
    window.ARMY2.displayId = 'army2Display';

    window.DMI_DATA = JSON.parse(fs.readFileSync(DATA_FILE,
                                                 {encoding:'utf8'}));

    window.generateCmdrListCallback = generateCmdrListCallback;
    window.generateUnitListCallback = generateUnitListCallback;
})();

/**
 *  Occurs in the context of the loaded page, 
 *    applies the data and functionality to the app
 */
window.addEventListener('DOMContentLoaded', () => {

    // populate lists of data
    fillSelectionLists(window.DMI_DATA);
    // add button callbacks
    loadEventListeners();
});

/**
 *  Implementations and utility
 */

const concat = (a,c) => a.concat(c);

const logWriter = (logId) => (message) => {
    document.getElementById(logId).innerText = message;
};

function fillSelectionLists(data) {

    const unitToOption = (unit) => {
        const {id, name} = unit;
        return `<option value="${id}">${name}</option>`;
    };
    
    ['units', 'cmdrs', 'nations'].forEach(name => {

        const listNode = document.getElementById(name + 'List');

        listNode.innerHTML = Object.keys(data[name])
            .map(key => unitToOption(data[name][key]))
            .reduce(concat);
    });

    const itemToOption = (item) => {
        return `<option>${item}</option>`;
    };
    
    document.getElementById('itemsList').innerHTML = data.items
        .map(item => itemToOption(item))
        .reduce(concat);
}

function loadEventListeners() {

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
    const callSpecs = [1,2].map(num => ['unit', 'cmdr'].map(name => {
        return {
            node: document.getElementById(`add${capitalize(name) + num}`),
            callbackGenName: `generate${capitalize(name)}ListCallback`,
            callbackParams: name === 'cmdr' ?
                [`${name + num}`, window[`ARMY${num}`]] :
                [`${name + num}`, `${name + num}Count`, window[`ARMY${num}`]]
        };
    })).reduce(concat);

    callSpecs.forEach(callSpec => {
        const {node, callbackGenName, callbackParams} = callSpec;
        const callback = window[callbackGenName].apply(null, callbackParams);
        node.addEventListener('click', callback); // the lone side effect
    });
}

function generateCmdrListCallback(listName, army) {

    const writeLog = logWriter(LOG_ID);
    
    return (event) => {
        const cmdrValue = document.getElementsByName(listName)[0].value;
        const {name} = window.DMI_DATA.cmdrs[cmdrValue];

        const cmdr = newCommander(cmdrValue);
        
        army.addCommander(cmdr);
        army.currentCommander = cmdr.id;

        // rerender army list
        renderArmyHTMLs(army, army.displayId);
        
        writeLog(`Added ${name} to ${army.name}`);
    };
};

function generateUnitListCallback(listName, countName, army) {

    const writeLog = logWriter(LOG_ID);
        
    return (event) => {
        const unitValue = document.getElementsByName(listName)[0].value;
        const unitCount = document.getElementsByName(countName)[0].value;

        const {id, name} = window.DMI_DATA.units[unitValue];
        
        // add unit
        // currentCommander1.addUnit({type: unit.id, count: unitCount});

        // rerender army list
        renderArmyHTMLs(army, army.displayId);
        
        writeLog(`Added ${unitCount} ${name} to ${army.name}`);
    };
};



function renderArmyHTMLs(army, armyDisplayId) {
    document.getElementById(armyDisplayId).innerHTML = armyToHMTL(army);
}

function armyToHMTL(army) {

    const li = (uuid, text) => {
        return `<li id=${uuid}>${text}</li>`;
    };

    const cmdrElts = army.commanders
          .map(cmdr => li(cmdr.id, cmdr.name))
          .reduce((a,c) => a.concat(c), '');

    return cmdrElts;
}
