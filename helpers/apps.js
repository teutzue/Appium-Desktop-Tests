if (process.env.DEV) {
  exports.macTestApp = undefined;
  exports.windowsTestApp = undefined;
} else {
  exports.macTestApp = "https://github.com/teutzue/penneo-mac-desktop/blob/master/Penneo-2.2.3.dmg";
  exports.windowsTestApp = "C:\\Program Files (x86)\\Penneo\\Penneo.exe";
}
