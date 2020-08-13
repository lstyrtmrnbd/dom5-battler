// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {newArmy,writeOut} = require('./battler');
const {loadDataSync} = require('./dmi/loaddata');

const ARMY1 = {};

const mappedUnitToOption = (mappedUnit) => {
    const {id, name} = mappedUnit;
    return `<option value="${id}">${name}</option>`;
};

function addData(data) {

    console.log('Now loading...');

    let outHTML = '';
    
    Object.keys(data.unit).forEach(key => {
        outHTML += mappedUnitToOption(data.unit[key]);
    });

    unitList.innerHTML = outHTML;

    console.log('Done loading');
}

const DATALOCS = {
    nation: 'gamedata/nations.csv',
    unit: 'gamedata/BaseU.csv',
    item: 'gamedata/BaseI.csv'
};

window.addEventListener('DOMContentLoaded', () => {

    // load data
    //sessionStorage.setItem('data', loadData()); // save in sessionstorage
    
    const data = loadDataSync(DATALOCS);

    addData(data);
   
    // Object.keys(data.unit).forEach(key => {
    //     unitList.innerHTML += mappedUnitToOption(data.unit[key]);
    // });

    
});
