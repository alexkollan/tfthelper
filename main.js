const electron =  require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;
// Listen for the app to be ready

app.on('ready', ()=>{
    //Create new Window
    mainWindow = new BrowserWindow({});
    //Load html file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    mainWindow.on('closed',()=>{
        app.quit();
    })
    // Build menu from template (m2)
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert the menu  (m3)
    Menu.setApplicationMenu(mainMenu);
})

// Handle create add window
function createAddWindow(){
    //Create new Window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Say hi..!'
    });
    //Load html file into the window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Garbage collection handle (if we don't set the addWindow to null when it's closed,
    // it will keep existing as a window in memory. 
    // In other words we do this for perdormance optimization)
    addWindow.on('close', ()=>{
        addWindow = null;
    })
}



// Create menu template (m1)

const mainMenuTemplate=[
    {
        label: 'File',
        submenu:[
            {
                label: 'Gen Button',
                click(){
                    createAddWindow()
                }
            },
            {
                label: 'Reset'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// Add developer tools IF NOT in production mode
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }            
            },
            {
                role: 'reload'
            }
    ]
    })
}