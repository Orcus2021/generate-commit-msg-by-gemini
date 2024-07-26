#!/usr/bin/env node

const dotenv = require('dotenv');
const path = require('path');

const getGenAIModel = require('./utils/getGenAIModel');
const getCommitMessageFromGemini = require('./utils/getCommitMessageFromGemini');
const execPromise = require('./utils/execPromise');
const askQuestionForCommitMessage = require('./utils/askQuestionForCommitMessage');

const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

const args = process.argv.slice(2);
const directory = args[0] ? path.resolve(args[0]) : process.cwd();

generateCommitMessage(directory);

async function generateCommitMessage(directory) {
  try {
    await checkIfGitRepositoryExist(directory);

    const model = getGenAIModel();

    const { stdout: changedFiles } = await execPromise('git diff --staged', { cwd: directory });
    if (!changedFiles.trim()) {
      console.log('No staged changes found.');
      return;
    }

    const initialMessage = await getCommitMessageFromGemini(changedFiles, model);

    const updatedMessage = await askQuestionForCommitMessage({
      defaultMessage: initialMessage,
      getCommitMessage: async () => await getCommitMessageFromGemini(changedFiles, model),
    });

    console.log(`Git commit message: ${updatedMessage}`);

    await execPromise(`git commit -m '${updatedMessage}'`, { cwd: directory });
  } catch (error) {
    console.error('Error during commit message generation:', error);
  }
}

async function checkIfGitRepositoryExist(directory) {
  try {
    await execPromise('git rev-parse --is-inside-work-tree', { cwd: directory });
  } catch (error) {
    throw new Error(`Error: The directory "${directory}" is not a git repository.`);
  }
}
