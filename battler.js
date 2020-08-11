const fs = require('fs');

//// File Output

const TEMPLATE_LOC = __dirname + '/template.map';
const TEMPLATE_MARKER = '---TEMPLATE-MARKER---';

// load template from file, sub in output, write to file
function writeOut(army1, army2) {

    const template = fs.readFileSync(TEMPLATE_LOC, {encoding:'utf8'});

    const subString = generateOutput(army1, army2);
    const outString = template.replace(TEMPLATE_MARKER, subString);

    const filename = generateFilename(army1.nation, army2.nation);    
    fs.writeFileSync(filename, outString);
}

function generateFilename(nation1, nation2) {

    const prefix = 'BATTLER';
    
    return `${process.cwd()}/${prefix}_${nation1}_vs_${nation2}_${Date.now()}.map`;
}


/// Map specific constants
//  - could wrap writeOut in higher func to capture
const LAND1 = 5;
const LAND2 = 8;

function generateOutput(army1, army2) {

    return armyOut(army1, LAND1) + armyOut(army2, LAND2);
}

function armyOut(army, land_no) {

    return concatOuts(nationOut(army.nation, land_no),
                      army.commanders.map(commanderOut), // what if these fields are empty?
                      army.units.map(unitOut),
                      army.items.map(itemOut))
        .reduce(concatter, ''); // array of strings reduced to single string
}

function concatter(a,c) {
    return a.concat(c);
}

/**
 * Returns concat of all args
 * arg1: single value
 * further arguments: 1D arrays
 */
function concatOuts(arg1) {
    const rest = [...arguments].slice(1);
    return rest.reduce(concatter, [arg1]); // flatten rest
}

// nation and land data are tied together by the 'specstart' directive
// - necessary?
function nationOut(nation_id, land_no) {
    return `
#allowedplayer ${nation_id}
#specstart ${nation_id} ${land_no}
#setland ${land_no}
`;
}

function commanderOut(commander) {
    return `#commander ${commander}\n`;
}

function unitOut(unit) {
    return `#units ${unit.count} ${unit.type}\n`;
}

function itemOut(item) {
    return `#additem ${item}\n`;
}

/** 
 *  "army" is a nation with commanders, units, and items
 */
const ARMY_EXAMPLE = {
    nation: 'nat_id',
    commanders: [
        'com_id', 'com_id2'  
    ],
    units: [
        {
            type: 'u_id',
            count: 666
        },
        {
            type: 'u_id2',
            count: 777
        }
    ],
    items: [
        'it_id', 'it_id2'
    ]
};

function newArmy(nation) {
    return {
        nation,
        commanders: [],
        units: [],
        items: []
    };
}
