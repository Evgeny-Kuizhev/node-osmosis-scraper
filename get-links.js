const
    osmosis = require('osmosis'),
    fs = require('fs'),

    url = `https://datasets.freesound.org/fsd/explore/%252Ft%252Fdd00128/?page=`,
    COUNT_PAGES = 299,
    data = [];

async function func() {
    for (let i = 1; i <= COUNT_PAGES; i++) {
        let j = await osmosis
            .get(url+`${i}`)
            .find('#node_sounds')
            .set({'related': ['tbody td a']})
            .data(res => {
                data.push(...res.related)
                console.log(i)
            })
            .error(console.error)
            .done()
    }
    fs.writeFile('data.json', {"data": JSON.stringify( data, null, 4)}, err => {
        if(err) console.error(err);
        else console.log('Data Saved to data.json file');
      });
}
func();