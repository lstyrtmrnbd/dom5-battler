const uuid = require('uuid').v4;

//
///
//// Structure Examples
///
//

const UNIT_EXAMPLE = { type: 66, count: 77};

const COMMANDER_EXAMPLE = {
    type: 238, // Pan
    xp: 0,
    units: [UNIT_EXAMPLE],
    items: ["Vine Shield", "Frostbrand"],
    magic: {
        F:0,
        A:0,
        W:0,
        E:0,
        S:0,
        D:0,
        N:0,
        B:0
    }
};
//^^^^^^  Equivalent to  vvvvvvvvvv
const commander = newCommander(238);
commander.addUnit({type:66, count:10});
commander.addItem("Vine Shield");
commander.addItem("Frostbrand");

const ARMY_EXAMPLE = {
    nation: 'nat_id',
    commanders: [COMMANDER_EXAMPLE]
};
//^^^^^^  Equivalent to  vvvvvvvvvv
const army = newArmy(58);
army.addCommander(commander);

//
///
//// Primary Functionality
///
//

// creates essential Army structure, defaults to Archo
function blankArmy(nation = 5) {
    
    return {
        nation,
        commanders: []
    };
}

// creates a new Army object, defaults to Archo
function newArmy(nation = 5) {

    function setNation(nation) {
        setArmyNation(this, nation);
    }

    function addCommander(commander) {
        addArmyCommander(this, commander);
    }

    function removeCommander(commander) {
        removeArmyCommander(this, commander);
    }
    
    return {
        nation,
        commanders: [],
        currentCommander: null,

        setNation,
        addCommander,
        removeCommander
    };
}

function newCommander(type = 238) {

    function addUnit(unit) {
        addCommanderUnit(this, unit);
    }

    function removeUnit(unit) {
        removeCommanderUnit(this, unit);
    }

    function addItem(item) {
        addCommanderItem(this, item);
    }

    function removeItem(item) {
        removeCommanderItem(this, item);
    }

    return {
        id: uuid(),
        type,
        units: [],
        items: [],
        magic: newMagic(),
        
        addUnit,
        removeUnit,
        addItem,
        removeItem  
    };
}

//
///
//// Implementation and Raw Fns
///
//

function newMagic() {
    return {
        F:0,
        A:0,
        W:0,
        E:0,
        S:0,
        D:0,
        N:0,
        B:0
    };
}

function setArmyNation(army, nation) {
    army.nation = nation;
}

function addArmyCommander(army, commander) {
    army.commanders.push(commander);
}

function addArmyCommanderByType(army, type) {
    army.commanders.push(newCommander(type));
}

function removeArmyCommander(army, id) {
    const index = army.commanders.findIndex(c => c.id === id);
    if(index >= 0) army.commanders.splice(index, 1);
}

function addCommanderUnit(commander, unit) {

    const sameType = (u) => u.type === unit.type;
    const found = commander.units.find(sameType);
    
    if(found){
        const total = found.count + unit.count;

        if(total <= 0) {
            commander.units.splice(commander.units.findIndex(sameType), 1);
        } else {
            found.count = total;
        }
    } else {
        commander.units.push(unit);
    }
}

// inverts argument count if necessary and calls addCommanderUnit
function removeCommanderUnit(commander, unit) {
    const {type, count} = unit;
    const remUnit = count < 0 ? count : 0 - count;
    addCommanderUnit(commander, {type, count: remUnit});
}

function addCommanderItem(commander, item) {
    commander.items.push(item);
}

function removeCommanderItem(commander, item) {
    const index = commander.items.findIndex(e => e == item);
    if(index >= 0) commander.items.splice(index, 1);
}

module.exports = {
    blankArmy,
    newArmy,
    newCommander,
    setArmyNation,
    addArmyCommander,
    addArmyCommanderByType,
    removeArmyCommander,
    addCommanderUnit,
    removeCommanderUnit,
    addCommanderItem,
    removeCommanderItem,
    example: {army, commander}
};
