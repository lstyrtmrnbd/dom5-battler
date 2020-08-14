
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
    
}
