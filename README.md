# Generate Commit Message by Gemini

This tool leverages the power of Gemini AI to automatically generate meaningful Git commit messages. With this tool, you can streamline your commit process by obtaining well-structured commit messages based on your changes.

## Getting Started

### Obtain Your API Key

1. Visit [Google AI Studio](https://ai.google.dev/aistudio).
2. Sign in and obtain your API key from the dashboard.
   > [!WARNING]  
   > If you are using a free plan, the data will be sent to Google as training data. Paid plans do not send data to Google. For more details, please refer to the [Plan information](https://aistudio.google.com/app/plan_information).

### Installation Steps

1. **Initialize the Project**

   Run the following command to install necessary packages and copy the `.env.example` file to `.env`:

   ```bash
   npm run init-setup
   ```

2. **Configure Your API Key**

   Open the newly created `.env` file and paste your API key in the appropriate place:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Global Setup (Optional)**

   To use the tool globally from any repository path, execute the following command:

   ```bash
   npm run global-setup
   ```

   This will link the tool globally so you can use the `ggc` command in any Git repository.

### Verification

- **Check Executable Permission**

  You can verify that the script is executable by running:

  ```bash
  ls -l path/to/index.js
  ```

- **Verify Global Link**

  Ensure the global link is created successfully with:

  ```bash
  npm ls -g --depth=0
  ```

### Editing Commit Messages

When choosing the "Edit the commit message directly" option, you can press the `Tab` key to show and modify the default value provided. This allows you to easily make changes to the suggested commit message.

### Usage

Once the setup is complete, navigate to your repository and run:

```bash
ggc
```

The tool will automatically generate a Git commit message based on the changes in your staged files.

### Customizing the Prompt

If you want to customize the prompt used to generate the commit message, you can modify it in the `utils/getCommitMessageFromGemini` file. Adjust the prompt text to suit your needs and preferences.

### Models

Currently, the tool supports the following models for message generation:

- `gemini-1.5-flash`
- `gemini-1.0-pro`

You can specify the model to use in the `.env` file by setting the `GEMINI_MODEL` variable:

```
GEMINI_MODEL=gemini-1.5-flash
```

### Removing Global Link

If you need to remove the global symbolic link, run:

```bash
npm unlink -g generate-commit-msg-by-gemini
```

### Removing Executable Permission

To remove the executable permission from the script, run:

```bash
chmod -x path/to/index.js
```

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License
