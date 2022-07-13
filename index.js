const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log(`Le run succed!`);
} catch (error) {
  core.setFailed(error.message);
}
