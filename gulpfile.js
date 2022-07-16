const path = require('path');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

const { merge, plugins } = require('sol-merger');

/**
 * Promisify child_process.exec 
 * @param {*} cmd 
 * @returns 
 */
async function execAsync (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    })
  });  
}

/**
 * Merge all modules of a contract into one single file
 * @param {*} source 
 * @param {*} dest 
 * @param {*} license 
 */
async function mergeSolidityContract(source, dest, license) {
  let mergedCode = await merge(source, {
    exportPlugins: [
      plugins.SPDXLicenseRemovePlugin
    ]
  });

  mergedCode = (license || '// SPDX-License-Identifier: MIT') + os.EOL + mergedCode;

  fs.writeFileSync(dest, mergedCode, 'utf-8');  
}

/**
 * Merge all contract source codes into singular files for audit
 */
async function flatten() {
  await mergeSolidityContract(path.join(__dirname, './src/TestNFT.sol'), path.join(__dirname, './contracts/TestNFT.sol'));  
  await mergeSolidityContract(path.join(__dirname, './src/TestToken.sol'), path.join(__dirname, './contracts/TestToken.sol'));  
}

exports.flatten = flatten;
