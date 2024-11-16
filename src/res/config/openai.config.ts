import { registerAs } from '@nestjs/config';

export default registerAs('openaiConfig', () => ({
  organization: process.env.OPENAI_ORGANIZATION || '',
  apiKey: process.env.OPENAI_API_KEY || '',
}));
