const fs = require('fs');

const {newArmy,example} = require('./src/army');
const {writeOut} = require('./src/battler');

const ARMY1 = newArmy(50);
const ARMY2 = newArmy(58);

const unitToOption = (unit) => {
    const {id, name} = unit;
    return `<option value="${id}">${name}</option>`;
};

const itemToOption = (item) => {
    return `<option>${item}</option>"`;
}

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
        itemHTML += unitToOption(data.items[item]);
    });

    itemList.innerHTML = itemHTML;
}

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

    const filedata = fs.readFileSync(__dirname + '/gamedata/dmi_data.json', {encoding:'utf8'});
    const dmiData = JSON.parse(filedata);
    
    addDmiData(dmiData);
});
