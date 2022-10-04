# ChatXtract

A fast & easy way to extract all of your WhatsApp chats!

![Made with heart](https://img.shields.io/badge/Made%20with-%E2%9D%A4-f00?style=for-the-badge) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Le0X8/chatxtract?style=for-the-badge) ![GitHub pull requests](https://img.shields.io/github/issues-pr/Le0X8/chatxtract?style=for-the-badge) ![GitHub Repo stars](https://img.shields.io/github/stars/Le0X8/chatxtract?style=for-the-badge)

## Setting up

1. Install [Node.JS](https://nodejs.org/en/download)
2. Clone the repository the way you like it.
3. Go to repo folder.
4. Install package + dependencies using `npm i` (If the installation stops at 99% or something, exit npm and try it again)
5. You're ready to run ChatXtract now.

## Using ChatXtract

1. Run the code using `node .`
2. A QR code will be displayed soon. Scan it with WA app. (Remember that the code will regenerate after a while)
3. The console should now display something like the following:
![Console window](https://i.imgur.com/vFDffjB.png)
4. Wait until the synchronization process is done, then press `[ENTER]`.
5. Check your directory where you installed ChatXtract. A folder named "loot" should appear there.
6. In this folder, there should be another folder named like the ID (default is "12750") which is specified in the [2nd line of `main.js`](main.js#L2) (You should change that if you want to extract multiple accounts).
7. In the subdirectory `./loot/{ID}/` should be a bunch of files. That is the extracted data.
8. If nothing is happening in the console, wait some time, because if the account has a large amount of data, ChatXtract needs a while checking all chats for media.
9. If you're really sure that the download is ended, stop the program with `[CTRL] + [C]`.
