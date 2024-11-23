import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { openAIConfig } from '../config/openai.config';

@Injectable()
export class ChatbotService {
  private chatHistory: { role: string; content: string }[] = []; // 대화 기록 저장

  async getChatResponse(prompt: string): Promise<string> {
    try {
      // KMDB 기반 사용자 요청을 생성
      const kmdbPrompt = `
      기준: 대한민국 영화
      요청: ${prompt}
      조건:
      - 답변은 60글자 이내
      - 추천/정보 제공은 KMDB 기준으로 작성
      - 간결하고 정확하게 응답
      `;

      // 새 대화 기록 배열 생성
      const updatedChatHistory = [
        ...this.chatHistory, // 기존 대화 기록 유지
        { role: 'user', content: kmdbPrompt }, // 사용자 요청 추가
      ];

      const response = await axios.post(
        openAIConfig.baseUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: updatedChatHistory, // 대화 기록 전달
          max_tokens: 1000, // 응답 제한 (60글자 이내)
          temperature: 0.8, // 창의성 조정
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAIConfig.apiKey}`,
          },
        },
      );

      // 응답 메시지 생성
      const assistantResponse = response.data.choices[0]?.message?.content.trim() || '응답 없음';

      // 새로운 대화 기록 배열 생성
      this.chatHistory = [
        ...updatedChatHistory, // 이전 대화 기록 포함
        { role: 'assistant', content: assistantResponse }, // OpenAI 응답 추가
      ];

      return assistantResponse;
    } catch (error) {
      console.error('Error calling OpenAI API:', error.response?.data || error.message);
      throw new HttpException(
        'OpenAI API 호출 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 대화 기록 초기화
   */
  clearChatHistory() {
    this.chatHistory = []; // 대화 기록을 비워 초기화
    console.log('Chat history cleared.');
  }
}
