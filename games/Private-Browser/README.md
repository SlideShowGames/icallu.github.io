# Brome
Chrome but better: Brome. The most minimal and private browser, for people that want
the best browsing experience. Runs on Windows, Mac and Linux (+ distros). 
Download the latest release from [here](https://github.com/Osiris-Team/Brome/releases/latest).

### Motivation
- Chrome is good, but I find myself having more than 100 tabs opened after using chrome for
a while. Thats why Brome doesn't have tabs! Instead each page has its own window.
- Chrome is good, but its top bar takes a big chunk of the screen space, thus there is less space left for the actual
website content. Thats why Brome has the smallest top bar possible and runs in the system tray.
- Chrome is good, but not really known for its outstanding privacy features or small disk size.
 Thats why all of Bromes' data can be found in the Brome directory that gets created in the same directory your Brome executable is. All the files are human readable btw and there are no more files created anywhere else. 
- Chrome is good, but sometimes opening a new tab and searching for something takes longer than necessary. Thats why
Brome is always accessible via the shortcut CRTL/COMMAND + SHIFT + B or by clicking the Brome icon in the system tray.
It also auto-fills your search bar with the previously copied text.

## Todo
- Since each website you visit gets treated as an app and has its own window
you can benefit from the window manager of your operating system.
Brome will save all the window locations/sizes and restore them on your next boot.

### Contribute
After cloning this repo, open a terminal in the repo root directory and enter `npm install` and then
`npm run start` to build and launch Brome with latest code.
