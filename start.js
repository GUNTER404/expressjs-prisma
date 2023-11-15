const { exec } = require('child_process');

const sdkManagerPath = 'D:\\a\\expressjs-prisma\\expressjs-prisma\\android-sdk\\tools\\bin\\sdkmanager.bat';
const licensesFilePath = 'licenses.txt';

const acceptLicenses = async () => {
  try {
    // Read the licenses file and modify it to accept all licenses
    let licenses = await fs.promises.readFile(licensesFilePath, 'utf-8');
    licenses = licenses.replace(/Accept\? \(y\/N\)/g, 'y');

    // Write the modified licenses file
    await fs.promises.writeFile(licensesFilePath, licenses, 'utf-8');

    // Run the sdkmanager.bat with licenses file as input
    exec(`cmd.exe /C "${sdkManagerPath} --licenses < ${licensesFilePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

acceptLicenses();
