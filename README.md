# medical-assistant
![Image](https://github.com/user-attachments/assets/ada4aa2b-198a-4b02-b46d-4d7fc1d9d143)

Next.js application that uses ChatGPT API for queries. You can input one or more symptoms (ailments) and the application asks advice from ChatGPT. The results are shown and can be copied to clipboard for further usage.

This project has been tested with:
- MS Visual Studio 2022 (Windows 10)

Features
- Theme can be selected (light, dark).
- Language can be selected (English, Finnish).
- Automatically constructed ChatGPT queries based on the given symptoms (ailments) and currently selected language option.
- Quick button action to copy the results (output) into your clipboard.
- Client/server communication uses a simple custom REST API.

## Requirements
Visual Studio Code  
https://code.visualstudio.com/

Node.js and npm (node package manager)  
It is recommended to use Node version manager for installation.  
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

You can use nvm-window for Windows operating system.  
https://github.com/coreybutler/nvm-windows/tags

## Setup
Download the project and open it with Visual Studio Code.

Run the following terminal commands:
- npm install
- npm run build

### OpenAI API Key
Project uses PHP code for ChatGPT queries.  
For this to work, you need your own OpenAI API key.  
https://platform.openai.com/settings/organization/api-keys

Open the following source code file:  
server\openai.php

Replace the following PHP code line with your own OpenAI API key:  
$OPENAI_API_KEY = 'YOUR OPENAI API KEY HERE';

## Testing
### Hosting PHP Code
This project is using PHP code. You can host PHP code locally with MAMP or XAMPP (for example).

MAMP  
https://www.mamp.info/en/downloads/

XAMPP  
https://www.apachefriends.org/

### MAMP Setup
We need to change the default server document folder of MAMP.

Open MAMP and select the following menu:  
MAMP -> Preferences -> Server -> Document Root

Change the folder into the following one:  
"this project"\server

Remember to start the MAMP server by clicking the "Start Servers" button.

### Run the Project as Developer
Open the project with Visual Studio Code.

Run the following terminal command:
- npm run dev

This terminal command starts a development server and provides you with a link to your localhost. Open the link to run the Next.js application.
