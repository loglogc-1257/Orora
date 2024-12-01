const axios = require('axios');
const defaultEmojiTranslate = "🌐";

module.exports = {
  name: 'translate',
  description: 'Translate text',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Handle -r (reaction) commands
    if (args[0] === "-r" || args[0] === "-react" || args[0] === "-reaction") {
      if (args[1] === "set") {
        // Set custom emoji for translation
        sendMessage(senderId, { text: `🌀 Please react to this message to set that emoji as emoji to translate message` }, pageAccessToken);
        return;
      }

      const isEnable = args[1] === "on" ? true : args[1] === "off" ? false : null;
      if (isEnable === null) {
        sendMessage(senderId, { text: `❌ Invalid argument, please choose on or off` }, pageAccessToken);
        return;
      }

      // Enable/disable automatic translation on reaction
      // (You'll need to replace this with your actual data storage logic)
      // ... store isEnable in your data store ...
      sendMessage(senderId, { text: isEnable ? `✅ Turn on translate message when reaction, try to react "${defaultEmojiTranslate}" to any message to translate it (not support bot message)\n Only translate message after turn on this feature` : `✅ Turn off translate message when reaction` }, pageAccessToken);
      return;
    }

    // Get the text to translate
    let content = args.join(' ');
    let langCodeTrans = null;

    // If the user replied to a message, get the text from the reply
    if (args[0] && args[0].startsWith('-')) {
      content = args.slice(1).join(' '); // Remove the command flag
    } else {
      // Otherwise, get the text from the message
      content = args.join(' ');
    }

    // Extract the target language code if provided
    const lastIndexSeparator = content.lastIndexOf("->");
    if (lastIndexSeparator !== -1 && (content.length - lastIndexSeparator === 4 || content.length - lastIndexSeparator === 5)) {
      langCodeTrans = content.slice(lastIndexSeparator + 2);
      content = content.slice(0, lastIndexSeparator); // Remove the language code from the content
    }

    // Inform the user that content is being generated
    sendMessage(senderId, { text: 'Translating... Please wait.' }, pageAccessToken);

    try {
      // Translate the text
      const { text, lang } = await translate(content.trim(), langCodeTrans || 'en'); // Default to English if no language is specified

      // Send the translated text to the user
      sendMessage(senderId, { text: `${text}\n\n🌐 Translate from ${lang} to ${langCodeTrans || 'en'}` }, pageAccessToken);
    } catch (error) {
      console.error('Error calling Translate API:', error);
      sendMessage(senderId, { text: 'There was an error translating the text. Please try again later.' }, pageAccessToken);
    }
  }
};

async function translate(text, langCode) {
  const res = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`);
  return { text: res.data[0].map((item) => item[0]).join(""), lang: res.data[2] };
}
