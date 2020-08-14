// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require('fs');
const {newArmy,writeOut} = require('./src/battler');

const ARMY1 = {};

const unitToOption = (unit) => {
    const {id, name} = unit;
    return `<option value="${id}">${name}</option>`;
};

function addData(data) {

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
}

window.addEventListener('DOMContentLoaded', () => {

    const filedata = fs.readFileSync(__dirname + '/gamedata/dmi_data.json', {encoding:'utf8'});

    console.log(filedata);

    const data = JSON.parse(filedata);

    console.log(data);
    
    addData(data);
});
