
function scrapeAllData(DMI) {

    return {
        units: scrapeUnitData(DMI.modctx.unitlookup),
        nations: scrapeNationData(DMI.modctx.nationlookup),
        items: scrapeItemData(DMI.modctx.itemlookup)
    };
}

function scrapeUnitData(unitlookup) {

    function isCmdr(u) {
        if (u.sorttype) {
	    return u.sorttype.indexOf('cmdr') != -1 && !u.createdby;
        }
        return true;
    }

    const output = {};

    Object.keys(unitlookup).forEach(key => {
        
        const u = unitlookup[key];
        if(output[u.id]) return; // no duplicates
        
        output[key] = {
            id: u.id,
            name: u.name,
            cmdr: isCmdr(u)
        };
    });

    return output;
}

function scrapeNationData(nationlookup) {

    const output = {};
    
    Object.keys(nationlookup).forEach(key => {
        const n = nationlookup[key];
        output[key] = {
            id: n.id,
            name: n.shortname
        };
    });

    return output;
}

function scrapeItemData(itemlookup) {
    return Object.keys(itemlookup).map(k => itemlookup[k].name);
}
