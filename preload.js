const fs = require('fs');

const {newArmy,example} = require('./src/army');
const {writeOut} = require('./src/battler');

const ARMY1 = newArmy(50);
ARMY1.name = 'Army 1';
const ARMY2 = newArmy(58);
ARMY2.name = 'Army 2';

const dmiData = (() => {
    const filedata = fs.readFileSync(__dirname + '/gamedata/dmi_data.json', {encoding:'utf8'});
    return JSON.parse(filedata);
})();


const unitToOption = (unit) => {
    const {id, name} = unit;
    return `<option value="${id}">${name}</option>`;
};

const itemToOption = (item) => {
    return `<option>${item}</option>"`;
};

function addDmiData(data) {

    let unitHTML = '';
    
    Object.keys(data.units).forEach(key => {
        unitHTML += unitToOption(data.units[key]);
    });

    unitList.innerHTML = unitHTML;

    let cmdrHTML = '';
    
    Object.keys(data.cmdrs).forEach(key => {
        cmdrHTML += unitToOption(data.cmdrs[key]);
    });

    cmdrList.innerHTML = cmdrHTML;

    let nationHTML = '';
    
    Object.keys(data.nations).forEach(key => {
        nationHTML += unitToOption(data.nations[key]);
    });

    nationList.innerHTML = nationHTML;

    let itemHTML = '';
    
    data.items.forEach(item => {
        itemHTML += itemToOption(data.items[item]);
    });

    itemList.innerHTML = itemHTML;
}

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    
    addDmiData(dmiData);

    loadEventListeners();
});

function loadEventListeners() {
    addCmdr1.addEventListener('click', addCmdrCallback);
    addCmdr2.addEventListener('click', addCmdrCallback);

    addUnit1.addEventListener('click', callbackForUnitList('unit1', 'unit1Count', ARMY1));
    addUnit2.addEventListener('click', callbackForUnitList('unit2', 'unit2Count', ARMY2));
}

function addCmdrCallback(event) {
    pageLog.innerText = "Added commander";
}

function callbackForUnitList(listName, countName, army) {

    return (event) => {
        const unitValue = document.getElementsByName(listName)[0].value;
        const unit = dmiData.units[unitValue];
        const unitCount = document.getElementsByName(countName)[0].value;

        // currentCommander1.addUnit({type: unit.id, count: unitCount});
        
        pageLog.innerText = `Added ${unit.name} to ${army.name}`;
    };
}

function renderArmyHTMLs(army, armyDisplayId) {
    armyDisplayId.innerHTML = armyToHMTL(army);
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
