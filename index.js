const core = require('@actions/core');
const github = require('@actions/github');
const { promises: fs } = require("fs");

async function getFiles(path = "./") {
  const entries = await fs.readdir(path, { withFileTypes: true });

  // Get files within the current directory and add a path key to the file objects
  const files = entries
    .filter(file => !file.isDirectory()) // Skip directories
    .map(file => ({ ...file, path: path + file.name }));

  // Get folders within the current directory
  const folders = entries.filter(folder => folder.isDirectory());

  for (const folder of folders)
    /*
      Add the found files within the subdirectory to the files array by calling the
      current function itself
    */
    files.push(...await getFiles(`${path}${folder.name}/`));

  return files;
}

// try {

//   const files = await getFiles()

//   console.log(files)
//   //console.log(`Le run succed!`);
// } catch (error) {
//   core.setFailed(error.message);
// }

// Call start
(async () => {
  console.log(await (await getFiles()))
})();