//@ts-check
// EDIT HERE
const id = 12750;//Math.random() * 10**5 |0;// needs tests
// EDIT HERE

const root = './loot/';
const wd = root + id; // working dir

const fs = require('fs');
const qrcode = require('qrcode-terminal');
const prompt = require("prompt-sync")();
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({authStrategy: new LocalAuth({clientId: id})});

fs.mkdirSync(wd + '/chats', {recursive:true});

client.on('qr', qr => { qrcode.generate(qr, {small: true}) });

client.on('ready', () => {
    console.log('Authenticated successfully.');
    prompt('Press [ENTER] when sync has ended. ');

    let mediacount = 0;

    fs.writeFile(
        wd + '/clientinfo.json',
        JSON.stringify(client.info, null, 4),
        'utf-8',
        (e) => {
            if (e != null) console.error('An error occurred: ' + e);
            else console.log('Written client info successfully.');
        }
    );

    client.getContacts()
        .then(val => fs.writeFile(
            wd + '/contacts.json',
            JSON.stringify(val, null, 4),
            'utf-8',
            (e) => {
                if (e != null) console.error('An error occurred: ' + e);
                else console.log('Written contacts successfully.');
            }
        ));

    client.getChats().then(val => {
        fs.writeFile(
            wd + '/chats.json',
            JSON.stringify(val, null, 4),
            'utf-8',
            (e) => {
                if (e != null) console.error('An error occurred: ' + e);
                else console.log('Written chat history successfully.');
            }
        );
        val.forEach(chat => {
            chat.fetchMessages({limit: 100000}).then(mval => {
                fs.writeFile(
                    `${wd}/chats/${chat.id._serialized}.json`,
                    JSON.stringify(mval, null, 4),
                    'utf-8',
                    (e) => {
                        if (e != null) console.error('An error occurred: ' + e);
                        else console.log('Written chat list successfully.');
                    }
                );
                mval.forEach(message => {
                    if (!message.hasMedia) return; // using guard clause, to avoid indent

                    fs.mkdirSync(`${wd}/chats/${chat.id._serialized}`, {recursive:true});

                    message.downloadMedia().then(file => {
                        if (!file) return;

                        fs.writeFile(
                            `${wd}/chats/${chat.id._serialized}/${message.id.id}.${file.mimetype.replaceAll('/', 'Slash')}`,
                            Buffer.from(file.data, 'base64'),
                            null,
                            (e) => {
                                if (e != null) console.error('An error occurred: ' + e);
                                else {mediacount++; console.log(`Downloaded media successfully. (${mediacount})`);};
                            }
                        );
                    })
                });
            });
        });
    });
});

client.initialize();
