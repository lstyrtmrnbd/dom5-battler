// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require('fs');
const {newArmy,writeOut} = require('./src/battler');

const ARMY1 = {};

const mappedUnitToOption = (mappedUnit) => {
    const {id, name} = mappedUnit;
    return `<option value="${id}">${name}</option>`;
};

function addData(data) {

    let unitHTML = '';
    
    Object.keys(data.units).forEach(key => {
        unitHTML += mappedUnitToOption(data.units[key]);
    });

    unitList.innerHTML = unitHTML;

    let cmdrHTML = '';
    
    Object.keys(data.cmdrs).forEach(key => {
        cmdrHTML += mappedUnitToOption(data.cmdrs[key]);
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
