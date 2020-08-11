const fs = require('fs');

/*****
 * BATTLER
 * - responsible for writing the battle map
 * - does so by interpreting army structures into output strings
 *   and embedding them into a template map
 */

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

/// Map constants
//  - these are specific to the template.map file
//  - could wrap writeOut in higher func to capture,
//    if it's necessary to generalize templates
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
        .reduce(concatter, ''); // array of strings reduced to single output string
}

function concatter(a,c) {
    return a.concat(c);
}

// flattens all args after and except for arg1 and returns a 1D array
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

module.exports = {
    writeOut
};
