const core = require('@actions/core');
const fs = require('fs');

function getFiles(path) {
  if ((/(^|\/)\.[^\/\.]/g).test(path)) return []

  const entries = fs.readdirSync(path, { withFileTypes: true });

  const files = entries
    .filter(file => !file.isDirectory())
    .map(file => ({ ...file, path: path + file.name }));

  for (const folder of entries.filter(folder => folder.isDirectory()))
    files.push(...getFiles(`${path}${folder.name}/`));

  return files;
}

try {
  const fileNameRegex = new RegExp(core.getInput('file_name_regex', { required: true }))
  const fileContentRegex = new RegExp(core.getInput('file_content_regex', { required: true }))

  const matchesCount = getFiles('./')
    .filter(file => fileNameRegex.test(file.path))
    .map(file => (fs.readFileSync(file.path, `utf-8`).match(fileContentRegex) || []).length)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    core.setOutput('count', matchesCount);
} catch (error) {
  core.setFailed(error.message);
}
