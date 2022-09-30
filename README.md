# ChatXtract

A fast & easy way to extract all of your WhatsApp chats!

## Setting up

1. Install [Node.JS](https://nodejs.org/en/download/)
2. Clone the repository the way you like it.
3. Install some required packages using ```npm install fs qrcode-terminal whatsapp-web.js```
4. You're ready to run ChatXtract now.


## Using ChatXtract

1. Run the code (```node .```).
2. A qr code will be displayed soon. Scan it. (Remember that the code will regenerate after a while.)
3. The console should now display the following:
![Console window](https://i.imgur.com/vFDffjB.png)
4. Check your directory where you installed ChatXtract. A folder called "loot" should appear there.
5. In this folder, there should be another folder including the ID (standard is 12750) which is specified in the 2nd line of main.js (You should change that if you want to extract multiple accounts).
6. In the subdirectory ```./loot/{ID}/``` should be a bunch of files. That is the extracted data.
7. If nothing is happening in the console, wait some time, because if the account has a large amount of data, ChatXtract needs a while checking all chats for media.
8. If you're really sure that the download is ended, stop the program with ```[CTRL] + [c]```.
