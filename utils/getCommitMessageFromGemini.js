const getPrompt = require('./getPrompt');

async function getCommitMessageFromGemini(changes, model) {
  const prompt = getPrompt(changes);

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text
      .replace(/^Git commit message:\s*/, '')
      .replace(/\n/g, '')
      .trim();
  } catch (error) {
    console.error('Error during commit message generation:', error);
    throw new Error('Failed to generate commit message.');
  }
}

module.exports = getCommitMessageFromGemini;
