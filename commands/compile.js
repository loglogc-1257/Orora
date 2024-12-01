const axios = require("axios");

module.exports = {
  name: 'compile',
  description: 'Compile and execute code in various languages',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const code = args.join(" ");

      // Detect the language
      let language = 'unsupported';
      if (/^#!\s*\/bin\/bash/.test(code)) {
        language = 'bash';
      } else if (/public\s+class\s+\w+/.test(code) && /public\s+static\s+void\s+main\s*\(/.test(code)) {
        language = 'java';
      } else if (/def\s+\w+\s*\(/.test(code) || /import\s+\w+/.test(code) || code.includes('print(')) {
        language = 'python';
      } else if (/^\s*#include\s+<.*?>/.test(code) || /namespace\s+\w+/.test(code)) {
        language = 'cpp';
      } else if (/^\s*using\s+System/.test(code) || /namespace\s+\w+/.test(code)) {
        language = 'csharp';
      } else if (/^\s*require\s*\(\s*['"][^'"]+['"]\s*\)/.test(code) || /function\s+\w+\s*\(/.test(code) || /console\.log\(/.test(code)) {
        language = 'node';
      } else if (/^\s*import\s+\w+/.test(code) || /function\s+\w+\s*\(/.test(code)) {
        language = 'typescript';
      } else if ( /(\bfor\s+\w+\s+in\s+\w+|\bwhile\s+\w+|\becho\s+.*)/.test(code)) {
        language = 'bash';
      }

      // Inform the user that the code is being compiled
      sendMessage(senderId, { text: `Compiling code in ${language}... Please wait.` }, pageAccessToken);

      // Send the code to the API
      const { data } = await axios.post('https://apiv3-2l3o.onrender.com/compile', {
        language,
        code,
        input: ''
      });

      // Send the output to the user
      sendMessage(senderId, { text: data.output }, pageAccessToken);

    } catch (error) {
      console.error('Error compiling code:', error);
      sendMessage(senderId, { text: 'There was an error compiling the code. Please try again later.' }, pageAccessToken);
    }
  }
};
          
