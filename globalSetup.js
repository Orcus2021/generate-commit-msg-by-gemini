const path = require('path');

const execPromise = require('./utils/execPromise');

const scriptPath = path.resolve(__dirname, 'index.js');

async function setup() {
  try {
    await execPromise(`chmod +x ${scriptPath}`);
    console.log(`Successfully set executable permission on ${scriptPath}`);

    await execPromise('npm link');
    console.log('Successfully linked the package');
  } catch (error) {
    console.error('Error during setup:', error);
  }
}

setup();
