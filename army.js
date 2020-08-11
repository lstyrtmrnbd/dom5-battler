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

    function addUnit(unit) {
        addArmyUnit(this, unit);
    }

    function addItem(item) {
        addArmyItem(this, item);
    }

    function removeArmyCommander(commander) {
        removeArmyCommander(this, commander);
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

function addArmyUnit(army, unit) {

    const sameType = (u) => u.type === unit.type;
    const found = army.units.find(sameType);
    
    if(found){
        const total = found.count + unit.count;

        if(total <= 0) {
            army.units.splice(army.units.findIndex(sameType));
        } else {
            found.count = total;
        }
    } else {
        army.units.push(unit);
    }
}

function addArmyItem(army, item) {
    army.items.push(item);
}

function removeArmyCommander(army, commander) {
    army.commanders.splice(army.commanders.findIndex(e => e == commander));
}

function removeArmyUnit(army, unit) {
    
}
