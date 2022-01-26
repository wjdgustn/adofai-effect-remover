const readline = require('readline');
const fs = require('fs');

const utils = require('./utils');
const { inputs } = require('./cli_input.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const input = [];

process.stdout.write(inputs[0]);

rl.on('line', line => {
    input.push(line);
    if(input.length < inputs.length) process.stdout.write(inputs[input.length]);
    else rl.close();
}).on('close', () => {
    if(input.length < 2) {
        console.log('\n\n변환을 취소합니다.');
        process.exit(0);
    }

    const allowed = [ 'SetSpeed' , 'Twirl' ];
    if(input[1]) allowed.push(...input[1].split(',').map(a => a.trim()));

    const adofai = utils.ADOFAIParser(fs.readFileSync(input[0]));
    adofai.actions = adofai.actions.filter(e => allowed.includes(e.eventType));
    adofai.settings.relativeTo = 'Player';
    adofai.settings.zoom = 150;
    adofai.settings.position = [ 0 , 0 ];
    adofai.settings.trackColor = 'debb7b';
    adofai.settings.trackColorType = 'Single';
    adofai.settings.trackStyle = 'Standard';
    adofai.settings.trackAnimation = 'None';
    adofai.settings.trackDisappearAnimation = 'None';
    adofai.settings.bgImage = '';
    adofai.settings.backgroundColor = '000000';
    adofai.settings.showDefaultBGIfNoImage = 'Enabled';

    fs.writeFileSync('./noeffect.adofai', JSON.stringify(adofai, null, 2));
});