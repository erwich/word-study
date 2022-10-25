import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';

import data from './data.js';

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const generateAudio = async (text) => {
  // Construct the request
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`${text}.mp3`, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${text}.mp3`);
};

const words = data.map((columns) => columns.words).flat();
words.forEach((word) => generateAudio(word));
