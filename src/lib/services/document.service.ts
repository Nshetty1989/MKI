import { supabase } from '@/integrations/supabase/client';
import { OpenAIService } from './openai.service';

export class DocumentService {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_TYPES = ['application/pdf'];

  static async validateFile(file: File): Promise<boolean> {
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file format. Only PDF files are allowed.');
    }
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit.');
    }
    return true;
  }

  static async processPropertyDocument(file: File) {
    try {
      await this.validateFile(file);
      const text = await this.extractTextFromPDF(file);
      const prompt = `Extract the following property information from this document:
        - Property name
        - Address
        - Type
        - Total units
        - Features
        - Amenities
        Format as JSON. Text: ${text}`;
      
      const response = await OpenAIService.generateResponse(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Property document processing error:', error);
      throw error;
    }
  }

  static async processTenantDocument(file: File) {
    try {
      await this.validateFile(file);
      const text = await this.extractTextFromPDF(file);
      const prompt = `Extract the following tenant information from this document:
        - First name
        - Last name
        - Email
        - Phone number
        - Emergency contact
        - Lease terms
        Format as JSON. Text: ${text}`;
      
      const response = await OpenAIService.generateResponse(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Tenant document processing error:', error);
      throw error;
    }
  }

  private static async extractTextFromPDF(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsText(file);
    });
  }
}