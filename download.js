const
    osmosis = require('osmosis'),
    fs = require('fs'),
    request = require('request'),
    urls = require('./data.json').data;

async function func() {
    let i = 0;
    for (let url of urls) {
        i++;
        await new Promise((resolve, reject) => {
            osmosis
            .get(url)
            .set({'related': ['.mp3_file@href']})
            .data(res => {
                let name = i+'__'+res.related[0].slice(-16);
                let tempUrl = 'https://freesound.org' + res.related[0];
                request
                    .get(tempUrl)
                    .on('error', reject )
                    .pipe(fs.createWriteStream('sounds/'+name));
                console.log('url № ' + i + ' is done');
                resolve()
            })
            .error(reject)
            .done()
        }).catch(err => console.log(err))
    }
}

func();