/// Data Scraping
/// Execute this file in the context of a loaded DMI

(() => {
    save(scrapeAllData(DMI), 'dmi_data.json');
})();

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

function save(data, filename) {

    if(!data) {
        console.error('save: No data');
        return;
    }

    if(!filename) filename = 'dmi_data.json';

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a');
    
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}
