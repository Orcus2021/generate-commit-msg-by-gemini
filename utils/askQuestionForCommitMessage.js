const inquirer = require('inquirer');

const terminalPrompt = inquirer.createPromptModule();

const makeAskQuestionForCommitMessage =
  (prompt) =>
  async ({ getCommitMessage, defaultMessage }) => {
    console.log(`Generated commit message: ${defaultMessage}`);

    let updatedMessage = '';

    const action = await prompt({
      type: 'list',
      name: 'action',
      message: 'Choose an action for the commit message:',
      choices: [
        { name: 'Use the provided commit message', value: 'use' },
        { name: 'Regenerate commit message', value: 'regenerate' },
        { name: 'Edit the commit message directly', value: 'edit' },
      ],
    });

    if (action.action === 'use') {
      updatedMessage = defaultMessage;
    } else if (action.action === 'regenerate') {
      const regeneratedMsg = await getCommitMessage();

      updatedMessage = await makeAskQuestionForCommitMessage(terminalPrompt)({
        getCommitMessage,
        defaultMessage: regeneratedMsg,
      });
    } else if (action.action === 'edit') {
      const answers = await prompt({
        type: 'input',
        name: 'commitMessage',
        message: 'Please confirm or modify the commit message:',
        default: defaultMessage,
      });

      updatedMessage = answers.commitMessage;
    }

    return updatedMessage;
  };

module.exports = makeAskQuestionForCommitMessage(terminalPrompt);
