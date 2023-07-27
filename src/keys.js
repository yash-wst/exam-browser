const { globalShortcut } = require('electron');
const { Notify } = require('./utility');


function registerGlobalShortcuts() {
    // globalShortcut.register('CommandOrControl+C', () => {
    //      Handler for Copy function
    //     console.log("Ctrl used")
    //   });

      globalShortcut.register('CommandOrControl+Shift+Esc', () => {
        // Handler for Ctrl+Shift+Esc
        console.log("Taskmanager invoked")
      });

    //   globalShortcut.register('CommandOrControl+T', () => {
    //     // Handler for Ctrl+T
    //     console.log("New Tab opened")
    //   });

    //   globalShortcut.register('Super', () => {
    //     // Handler for super_key
    //     console.log("Super key used")
    //   });

      globalShortcut.register('Alt+Tab', () => {
        // Handler for switch apps action
        console.log("Tried to switch apps")
      });

      globalShortcut.register('CommandOrControl+V', () => {
        // Handler for switch apps action
        console.log("Attempted paste")
      });

      globalShortcut.register('F11', async () => {
        // Handler for switch apps action
        console.log("Minimize shortcut F11 used")
        Notify('Warning', 'Don\'t attempt to switch apps!');
      });


}

function unregisterGlobalShortcuts() {
  // Unregister all global shortcuts
  globalShortcut.unregisterAll();
}

module.exports = {
  registerGlobalShortcuts,
  unregisterGlobalShortcuts,
};
