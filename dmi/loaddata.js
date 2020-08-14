/**
 * This is the initial data implementation, mostly cribbed from the DMI
 *   it has been abandoned in favor of the scraping approach found in processdata.js
 */

const fs = require('fs');

const DATALOCS_EXAMPLE = {
    nation: 'gamedata/nations.csv',
    unit: 'gamedata/BaseU.csv',
    item: 'gamedata/BaseI.csv'
};

function loadDataSync(dataLocs) {

    const output = {};
    
    Object.keys(dataLocs).forEach(key => {
        const data = fs.readFileSync(dataLocs[key], {encoding:'utf8'});
        const parsed = parseTextToTable(data);
        const name = key === 'nation' ? 'nationname' : 'name';
        output[key + 'data'] = parsed;
        output[key] = createLookup(parsed, 'id', name);
    });

    return output;
}

function parseTextToTable(str) {
    var t = [];

    var lines = str.split("\n");
    var keynames = lines[0].split("\t");

    for (var i=1; i<lines.length; i++) {
	var values = lines[i].split("\t");

	if (values[0]=="")
	    continue;

	var o = new Object();
	for (var j=0; j<keynames.length; j++) {
	    var key = keynames[j];
	    var val = values[j];
	    if (val != "" && val != "\r") {
		//if (key == 'id#') key = 'id';
		o[key] = values[j];
	    }
	}
	t.push(o);
    }
    return t;
}

function isCmdr(u) {
    if (u.sorttype) {
	return u.sorttype.indexOf('cmdr') != -1 && !u.createdby;
    }
    return true;
}

function createLookup(t, k1, k2) {
    var lookup = {};
    for (var i=0; i<t.length; i++) {
	var line = t[i];

	var v1;
	if ((v1= line[k1]) && !lookup[v1])
	    lookup[v1] = line;

	// var v2;
	// if (k2 && (v2= line[k2])) {
	//     v2 = v2.toLowerCase();
	//     if (!lookup[v2])
	// 	lookup[v2] = line;
	// }
    }
    return lookup;
}

module.exports = {loadDataSync};
