const { GoogleGenerativeAI } = require('@google/generative-ai');

const getGenAIModel = () => {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    console.error('Error: GEMINI_API_KEY is not defined in .env file.');
    process.exit(1);
  }

  const geminiModel = process.env.GEMINI_MODEL;

  if (!geminiModel) {
    console.error('Error: GEMINI_MODEL is not defined in .env file.');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: geminiModel });

  return model;
};

module.exports = getGenAIModel;
