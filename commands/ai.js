const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8').trim();
const useFontFormatting = true;

module.exports = {
  name: 'ai',
  description: 'Interagissez avec Orochi AI et obtenez une image correspondante.',
  author: 'Arn & MakoyQx',

  async execute(senderId, args) {
    const pageAccessToken = token;
    const query = args.join(" ").trim();

    if (!query) {
      const defaultMessage = 
        "✨ Bonjour et bienvenue ! " +
        "Posez-moi vos questions 🤖 " +
        "\n\nVotre satisfaction est ma priorité ! 🚀\n\n_(Édité par Stanley Stawa)_";

      const formattedMessage = useFontFormatting ? formatResponse(defaultMessage) : defaultMessage;
      return await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
    }

    if (["sino creator mo?", "qui t'a créé ?"].includes(query.toLowerCase())) {
      const creatorMessage = "Stanley Stawa";
      const formattedMessage = useFontFormatting ? formatResponse(creatorMessage) : creatorMessage;
      return await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
    }

    await handleChatResponse(senderId, query, pageAccessToken);
  },
};

// Traitement de la réponse AI + génération d'images
const handleChatResponse = async (senderId, input, pageAccessToken) => {
  const apiUrl = "https://kaiz-apis.gleeze.com/api/bert-ai";

  try {
    const { data } = await axios.get(apiUrl, { params: { q: input, uid: senderId } });
    const response = data.response;

    const formattedMessage = useFontFormatting ? formatResponse(response) : response;
    await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);

    // Génération d'une image avec Flux et recherche sur Pinterest
    const [fluxImageUrl, pinterestImageUrl] = await Promise.all([
      generateImageWithFlux(input),
      searchPinterest(input)
    ]);

    // Envoi des images si elles sont valides
    if (fluxImageUrl) {
      await sendMessage(senderId, { 
        attachment: { type: 'image', payload: { url: fluxImageUrl } } 
      }, pageAccessToken);
    }

    if (pinterestImageUrl) {
      await sendMessage(senderId, { 
        attachment: { type: 'image', payload: { url: pinterestImageUrl } } 
      }, pageAccessToken);
    }

  } catch (error) {
    console.error('Erreur AI:', error.message);
    const errorMessage = "⚠️ Veuillez patienter un instant !";
    const formattedMessage = useFontFormatting ? formatResponse(errorMessage) : errorMessage;
    await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
  }
};

// Génération d'image avec Flux
const generateImageWithFlux = async (prompt) => {
  const apiUrl = `https://kaiz-apis.gleeze.com/api/imagine?prompt=${encodeURIComponent(prompt)}`;
  try {
    return apiUrl;
  } catch (error) {
    console.error('Erreur Flux:', error.message);
    return null;
  }
};

// Recherche d'image sur Pinterest
const searchPinterest = async (searchQuery) => {
  try {
    const { data } = await axios.get(`https://hiroshi-api.onrender.com/image/pinterest?search=${encodeURIComponent(searchQuery)}`);
    return data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error('Erreur Pinterest:', error.message);
    return null;
  }
};

// Mise en forme du texte (gras)
function formatResponse(responseText) {
  const fontMap = { 
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
    'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽',
    'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
    'y': '𝘆', 'z': '𝘇', 'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙',
    'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡',
    'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩',
    'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭'
  };

  return responseText.split('').map(char => fontMap[char] || char).join('');
};
