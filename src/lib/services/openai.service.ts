import { ENV } from '@/config/environment';

export class OpenAIService {
  private static readonly API_KEY = ENV.OPENAI.API_KEY;
  private static readonly API_URL = 'https://api.openai.com/v1/chat/completions';

  static async generateResponse(prompt: string) {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API request failed');
      }

      // Clone the response before reading it
      const responseClone = response.clone();
      const data = await responseClone.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  static async extractDocumentData(text: string, type: 'property' | 'tenant') {
    const prompts = {
      property: `Extract the following property information from this document:
        - Property name
        - Address
        - Type (residential/commercial)
        - Total units
        - Features
        - Amenities
        Format the response as valid JSON.
        
        Document text: ${text}`,
      
      tenant: `Extract the following tenant information from this document:
        - First name
        - Last name
        - Email
        - Phone number
        - Emergency contact details
        - Lease terms
        Format the response as valid JSON.
        
        Document text: ${text}`
    };

    const response = await this.generateResponse(prompts[type]);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      throw new Error('Failed to parse extracted data');
    }
  }
}