const fs = require('fs');

/*****
 * BATTLER
 * - responsible for writing the battle map
 * - does so by interpreting army structures into output strings
 *   and embedding them into a template map
 */

const DOM5_DIR = '/home/skinner/.dominions5/';

const TEMPLATE_LOC = __dirname + '/template.map';
const TEMPLATE_MARKER = '---TEMPLATE-MARKER---';
const NAME_MARKER = '---TEMPLATE-NAME---';

// load template from file, sub in output, write to file
function writeOut(army1, army2) {

    const name = generateBattleName(army1.nation, army2.nation);
    
    const template = fs.readFileSync(TEMPLATE_LOC, {encoding:'utf8'});
    
    const subString = generateOutput(army1, army2);
    const outString = template.replace(TEMPLATE_MARKER, subString)
          .replace(NAME_MARKER, name);

    const filename = name + '.map';

    fs.writeFileSync(`${process.cwd()}/battler/` + filename, outString);
    fs.writeFileSync(DOM5_DIR + 'maps/battler/' + filename, outString);
}

function generateBattleName(nation1, nation2) {

    const prefix = 'BATTLER';
    
    return `${prefix}_${nation1}_vs_${nation2}_${Date.now()}`;
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
                      army.commanders.map(commanderOut)) // what if it's empty?
        .reduce(concatter, ''); // array of strings reduced to single output string
}

function concatter(a,c) {
    return a.concat(c);
}

// arg1 is added to an array
// all following arguments are flattened 1 level into the same array
function concatOuts(arg1) {
    const rest = [...arguments].slice(1);
    return rest.reduce(concatter, [arg1]);
}

// nation and land data are tied together by the 'specstart' directive
// - necessary? yes, but set_land can be pulled out
function nationOut(nation_id, land_no) {
    return `
#allowedplayer ${nation_id}
#specstart ${nation_id} ${land_no}
#setland ${land_no}
`;
}

function commanderOut(commander) {
    return concatOuts(`#commander ${commander.type}\n`,
                      commander.units.map(unitOut),
                      commander.items.map(itemOut))
        .reduce(concatter, '');
}

function unitOut(unit) {
    return `#units ${unit.count} ${unit.type}\n`;
}

function itemOut(item) {
    return `#additem ${item}\n`;
}

module.exports = {
    writeOut,
    armyOut
};
