import { supabase } from '@/integrations/supabase/client';
import { OpenAIService } from './openai.service';

interface DocumentValidationResult {
  isValid: boolean;
  error?: string;
  progress?: number;
}

interface ExtractedContent {
  text: string;
  metadata: {
    pageCount: number;
    title?: string;
    author?: string;
  };
}

export class DocumentService {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_TYPES = ['application/pdf'];
  private static readonly MIN_TEXT_LENGTH = 10;
  private static readonly RAPID_API_KEY = '211e2948fdmsh85de154f4732deap1de7f8jsnc3f11924367e';
  private static readonly RAPID_API_HOST = 'pdf-to-text-converter.p.rapidapi.com';
  private static readonly RAPID_API_URL = 'https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert';
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000; // 1 second

  /**
   * Validates if the provided file meets the requirements
   */
  static async validateFile(file: File, onProgress?: (progress: number) => void): Promise<DocumentValidationResult> {
    try {
      if (!file) {
        return { isValid: false, error: 'No file provided' };
      }

      if (!this.ALLOWED_TYPES.includes(file.type)) {
        return { isValid: false, error: 'Invalid file format. Only PDF files are allowed.' };
      }

      if (file.size > this.MAX_FILE_SIZE) {
        return { isValid: false, error: 'File size exceeds 10MB limit.' };
      }

      onProgress?.(100);
      return { isValid: true };
    } catch (error) {
      console.error('File validation error:', error);
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : 'Unknown validation error' 
      };
    }
  }

  /**
   * Convert PDF to text using RapidAPI
   */
  private static async convertPDFToText(file: File, onProgress?: (progress: number) => void): Promise<ExtractedContent> {
    let retries = 0;
    
    while (retries < this.MAX_RETRIES) {
      try {
        onProgress?.(20);
        
        // Create form data
        const formData = new FormData();
        formData.append('file', file);
        
        // Convert FormData to URLSearchParams
        const params = new URLSearchParams();
        params.append('page', '1'); // Start with first page
        
        onProgress?.(40);
        
        // Make API request
        const response = await fetch(this.RAPID_API_URL, {
          method: 'POST',
          headers: {
            'x-rapidapi-key': this.RAPID_API_KEY,
            'x-rapidapi-host': this.RAPID_API_HOST,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        });

        onProgress?.(60);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || !data.text) {
          throw new Error('Invalid response from PDF conversion service');
        }

        onProgress?.(80);

        // Basic metadata extraction
        const pageCount = (data.text.match(/\f/g) || []).length + 1;
        const titleMatch = data.text.match(/^Title:\s*(.+)$/m);
        const authorMatch = data.text.match(/^Author:\s*(.+)$/m);

        onProgress?.(100);

        return {
          text: data.text,
          metadata: {
            pageCount,
            title: titleMatch?.[1],
            author: authorMatch?.[1]
          }
        };

      } catch (error) {
        console.error(`PDF conversion attempt ${retries + 1} failed:`, error);
        retries++;
        
        if (retries < this.MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * retries));
          continue;
        }
        
        throw new Error('PDF conversion failed after multiple attempts');
      }
    }

    throw new Error('PDF conversion failed');
  }

  /**
   * Process property documents and extract relevant information
   */
  static async processPropertyDocument(file: File, onProgress?: (progress: number) => void) {
    try {
      // Validate file
      const validation = await this.validateFile(file, (progress) => onProgress?.(progress * 0.2));
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Convert PDF to text
      const extractedContent = await this.convertPDFToText(file, (progress) => onProgress?.(20 + progress * 0.6));
      
      // Process with OpenAI
      const prompt = `Extract the following property information from this document:
        - Property name
        - Address
        - Type
        - Total units
        - Features
        - Amenities

        Document Content:
        ${JSON.stringify(extractedContent, null, 2)}`;
      
      onProgress?.(80);
      const response = await OpenAIService.generateResponse(prompt);
      onProgress?.(100);
      
      return JSON.parse(response);
    } catch (error) {
      console.error('Property document processing error:', error);
      throw new Error(error instanceof Error ? 
        `Property document processing failed: ${error.message}` : 
        'Property document processing failed');
    }
  }

  /**
   * Process tenant documents and extract relevant information
   */
  static async processTenantDocument(file: File, onProgress?: (progress: number) => void) {
    try {
      // Validate file
      const validation = await this.validateFile(file, (progress) => onProgress?.(progress * 0.2));
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Convert PDF to text
      const extractedContent = await this.convertPDFToText(file, (progress) => onProgress?.(20 + progress * 0.6));
      
      // Process with OpenAI
      const prompt = `Extract the following tenant information from this document:
        - First name
        - Last name
        - Email
        - Phone number
        - Emergency contact details
        - Government ID details
        - Address information
        - Employment information (if available)

        Document Content:
        ${JSON.stringify(extractedContent, null, 2)}`;
      
      onProgress?.(80);
      const response = await OpenAIService.generateResponse(prompt);
      onProgress?.(100);
      
      return JSON.parse(response);
    } catch (error) {
      console.error('Tenant document processing error:', error);
      throw new Error(error instanceof Error ? 
        `Tenant document processing failed: ${error.message}` : 
        'Tenant document processing failed');
    }
  }
}