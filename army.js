/**** 
 * ARMY is a nation with commanders, units, and items
 * - two implementations, simple struct and common functions
 *   or object with associated methods
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

// creates essential Army structure, defaults to Archo
function blankArmy(nation = 5) {
    
    return {
        nation,
        commanders: [],
        units: [],
        items: []
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

    function addUnit(unit) {
        addArmyUnit(this, unit);
    }

    function removeUnit(unit) {
        removeArmyUnit(this, unit);
    }

    function addItem(item) {
        addArmyItem(this, item);
    }

    function removeItem(item) {
        removeArmyItem(this, item);
    }
    
    return {
        nation,
        commanders: [],
        units: [],
        items: [],

        setNation,
        addCommander
    };
}

function setArmyNation(army, nation) {
    army.nation = nation;
}

function addArmyCommander(army, commander) {
    army.commanders.push(commander);
}

function removeArmyCommander(army, commander) {
    const index = army.commanders.findIndex(e => e == commander);
    if(index >= 0) army.commanders.splice(index, 1);
}

function addArmyUnit(army, unit) {

    const sameType = (u) => u.type === unit.type;
    const found = army.units.find(sameType);
    
    if(found){
        const total = found.count + unit.count;

        if(total <= 0) {
            army.units.splice(army.units.findIndex(sameType), 1);
        } else {
            found.count = total;
        }
    } else {
        army.units.push(unit);
    }
}

// just inverts argument count if necessary and calls addArmyUnit
function removeArmyUnit(army, unit) {
    const {type, count} = unit;
    const remUnit = count < 0 ? count : 0 - count;
    addArmyUnit(army, {type, count: remUnit});
}

function addArmyItem(army, item) {
    army.items.push(item);
}

function removeArmyItem(army, item) {
    const index = army.items.findIndex(e => e == item);
    if(index >= 0) army.items.splice(index, 1);
}


