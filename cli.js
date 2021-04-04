const readline = require('readline');
const fs = require('fs');

const utils = require('./utils');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const input = [];

process.stdout.write('이펙 삭제할 맵 파일 이름 입력(확장자까지) : ');

rl.on('line', line => {
    input.push(line);
    switch(input.length) {
        case 1:
            rl.close();
            break;
    }
}).on('close', () => {
    if(input.length < 1) {
        console.log('\n\n변환을 취소합니다.');
        process.exit(0);
    }

    const allowed = [ 'SetSpeed' , 'Twirl' , 'SetHitsound' , 'Checkpoint' ];

    const adofai = utils.ADOFAIParser(fs.readFileSync(input[0]));
    adofai.actions = adofai.actions.filter(e => allowed.includes(e.eventType));
    adofai.settings.relativeTo = 'Player';
    adofai.settings.zoom = 150;
    adofai.settings.position = [ 0 , 0 ];

    fs.writeFileSync('./noeffect.adofai', JSON.stringify(adofai, null, 2));
});