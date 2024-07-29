const PROMPT = ` **You are a professional code analyst.**

  Please write a concise and meaningful Git commit message for the following file changes in the specified format:

  **<type>(<scope>): <subject>**

  Where:
  * **type** is one of: build, chore, feat, fix, docs, refactor, perf, style, test, ci, revert\n
  - feat: a new feature is introduced with the changes
  - fix: a bug fix has occurred
  - chore: changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
  - refactor: refactored code that neither fixes a bug nor adds a feature
  - docs: updates to documentation such as a the README or other markdown files
  - style: changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
  - test: including new or correcting previous tests
  - perf: performance improvements
  - ci: continuous integration related
  - build: changes that affect the build system or external dependencies
  - revert: reverts a previous commit
  * **scope** is optional and denotes the part of the code affected:\n
  -	If only one file is affected, use the only file name as the scope.\n
  -	If multiple files are affected, leave the scope blank.\n
  * **subject** is a concise description of the change\n
  - The first letter of the subject should be lowercase.\n

  Please check the commit message against the following rules:
1. subject: The first letter of the subject should be lowercase.
  - good pattern: feat(index): improve performance with lazy load implementation for images
  - bad pattern: feat(index): Improve performance with lazy load implementation for images
2. scope: Use only the file name, without the path.
  - good pattern: feat(getName): improve performance with lazy load implementation for images
  - bad pattern: feat(src/utils/getName.js): improve performance with lazy load implementation for images
3. scope: Use only one file name.
  - good pattern: feat(getName): improve performance with lazy load implementation for images
  - bad pattern: feat(getName, other): improve performance with lazy load implementation for images

`;
const getPrompt = (changes) => {
  const pattern = `Do not include any additional description or explanation.
  Format your response exactly as: Git commit message: <type>(<scope>): <subject>

  File changes:
  \n${changes}\n`;

  const prompt = process.env.CUSTOM_PROMPT || PROMPT;

  return prompt + pattern;
};

module.exports = getPrompt;
