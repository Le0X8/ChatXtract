//@ts-check
// EDIT HERE
const id = 12750;//Math.random() * 10**5 |0;// needs tests
// EDIT HERE

/**working directory*/
const wd = `./loot/${id}/`;

const fs = require('fs');
const qrcode = require('qrcode-terminal');
const prompt = require("prompt-sync")();
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({authStrategy: new LocalAuth({clientId: id})});

/**
 * Writes a JSON file in the same way as `fs.writeFile`, but always UTF-8.
 * Appends ".json" to the path (unconditionally), so the extension is not necessary.
 * @param {string} path full path/filename (w/out ".json" ext)
 * @param {*} x value to `stringify` as formatted JSON
 * @param {fs.NoParamCallback} callback directly passed to `writeFile`
 */
const writeJSON = (path, x, callback) => fs.writeFile(
    path + '.json',
    JSON.stringify(x, null, 4),
    'utf-8',
    callback
);


fs.mkdirSync(wd + 'chats', {recursive:true});

client.on('qr', qr => { qrcode.generate(qr, {small: true}) });

client.on('ready', () => {
    console.log('Authenticated successfully.');
    prompt('Press [ENTER] when sync has ended. ');

    let mediacount = 0;

    writeJSON(wd + 'clientinfo', client.info, (e) => {
        if (e != null) console.error('An error occurred: ' + e);
        else console.log('Written client info successfully.');
    });

    client.getContacts().then(x => writeJSON(
        wd + 'contacts',
        x,
        (e) => {
            if (e != null) console.error('An error occurred: ' + e);
            else console.log('Written contacts successfully.');
        }
    ));

    client.getChats().then(val => {
        writeJSON(
            wd + 'chats',
            val,
            (e) => {
                if (e != null) console.error('An error occurred: ' + e);
                else console.log('Written chat history successfully.');
            }
        );
        val.forEach(chat => {
            chat.fetchMessages({limit: 100000}).then(mval => {
                fs.writeFile(
                    `${wd}chats/${chat.id._serialized}.json`,
                    JSON.stringify(mval, null, 4),
                    'utf-8',
                    (e) => {
                        if (e != null) console.error('An error occurred: ' + e);
                        else console.log('Written chat list successfully.');
                    }
                );
                mval.forEach(message => {
                    if (!message.hasMedia) return; // using guard clause, to avoid indent

                    fs.mkdirSync(`${wd}chats/${chat.id._serialized}`, {recursive:true});

                    message.downloadMedia().then(file => {
                        if (!file) return;

                        fs.writeFile(
                            `${wd}chats/${chat.id._serialized}/${message.id.id}.${file.mimetype.replaceAll('/', 'Slash')}`,
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
