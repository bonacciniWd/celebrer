// pages/api/chat.ts
import { CohereClient } from 'cohere-ai';
import type { NextApiRequest, NextApiResponse } from 'next';

// Cria o cliente Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || '',
});

interface ChatRequest {
  message: string;
  context?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context } = req.body as ChatRequest;
    
    const response = await cohere.chat({
      message,
      model: 'command',
      temperature: 0.3,
      maxTokens: 100,
      preamble: context // Adicione contexto se necessário
    });

    res.status(200).json({ 
      text: response.text
        ?.replace(/\n/g, ' ')
        .trim()
        .replace(/\[OPCOES:.*?\]/g, '') // Remove marcações de opções
    });

  } catch (error) {
    console.error('Cohere Error:', error);
    res.status(500).json({ error: 'Erro ao processar a mensagem' });
  }
}