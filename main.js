// EDIT HERE
const id = 12750;
// EDIT HERE

const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({authStrategy: new LocalAuth({clientId: id})});

if (!fs.existsSync('./loot')){fs.mkdirSync('./loot');};
if (!fs.existsSync('./loot/' + id)){fs.mkdirSync('./loot/' + id);};
if (!fs.existsSync('./loot/' + id + '/chats')){fs.mkdirSync('./loot/' + id + '/chats');};

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Authenticated successfully.');
    var mediacount = 0;
    fs.writeFile('./loot/' + id + '/clientinfo.json', JSON.stringify(client.info, null, 4), 'utf-8', (e) => {if (e != null) {console.error('An error occurred: ' + e);} else {console.log('Written client info successfully.');};});
    client.getContacts().then(val => fs.writeFile('./loot/' + id + '/contacts.json', JSON.stringify(val, null, 4), 'utf-8', (e) => {if (e != null) {console.error('An error occurred: ' + e);} else {console.log('Written contacts successfully.');};}));
    client.getChats().then(val => {
        fs.writeFile('./loot/' + id + '/chats.json', JSON.stringify(val, null, 4), 'utf-8', (e) => {if (e != null) {console.error('An error occurred: ' + e);} else {console.log('Written chat history successfully.');};});
        val.forEach(chat => {
            chat.fetchMessages({limit: 100000}).then(mval => {
                fs.writeFile('./loot/' + id + '/chats/' + chat.id._serialized + '.json', JSON.stringify(mval, null, 4), 'utf-8', (e) => {if (e != null) {console.error('An error occurred: ' + e);} else {console.log('Written chat list successfully.');};});
                mval.forEach(message => {if (message.hasMedia) {
                    if (!fs.existsSync('./loot/' + id + '/chats/' + chat.id._serialized)){fs.mkdirSync('./loot/' + id + '/chats/' + chat.id._serialized);};
                    message.downloadMedia().then(file => {
                        if (file) {
                            fs.writeFile('./loot/' + id + '/chats/' + chat.id._serialized + '/' + message.id.id + '.' + file.mimetype.split('/')[1], Buffer.from(file.data, 'base64'), 'utf-8', (e) => {if (e != null) {console.error('An error occurred: ' + e);} else {mediacount++; console.log('Downloaded media successfully. (' + mediacount + ')');};});
                        };
                    })
                };
                });
            });
        });
    });
});

client.initialize();