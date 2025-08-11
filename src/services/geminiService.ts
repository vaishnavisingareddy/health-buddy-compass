import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConditionKey } from '@/components/health/conditions-data';

interface ChatContext {
  conditions: ConditionKey[];
  surgeryType?: string;
  previousQuestions: string[];
  currentQuestion: string;
  attachments?: { name: string; type: string; content: string }[];
}

interface GeminiServiceConfig {
  apiKey: string;
}

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(config: GeminiServiceConfig) {
    this.genAI = new GoogleGenerativeAI(config.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  private buildSystemPrompt(context: ChatContext): string {
    const conditionNames = context.conditions.map(c => c.replace(/_/g, " ")).join(", ");
    
    let systemPrompt = `You are a helpful, caring health assistant providing personalized advice for someone in India with multiple health conditions: ${conditionNames}. 

Key guidelines:
- Always be warm, empathetic, and supportive
- Provide specific, actionable advice tailored to their conditions and Indian context
- Consider Indian climate, traditional foods, and lifestyle patterns
- Keep responses concise but detailed enough to be helpful (max 200 words)
- Use **bold** for important points and *italics* for emphasis
- Always include a disclaimer that this doesn't replace professional medical advice
- If asked about diet plans, provide specific Indian meal suggestions and foods to include/avoid
- If asked about routines, create detailed daily schedules suitable for Indian lifestyle
- If asked about exercises, suggest safe activities that work in Indian climate/settings
- Be very specific rather than generic, with Indian cultural context
- Consider how their multiple conditions might interact
- Format your response with clear sections using **headers** and bullet points where helpful

Patient context (India-based):
- Current health conditions: ${conditionNames}`;

    if (context.surgeryType && context.surgeryType.trim() !== "" && context.conditions.includes("recent_surgery")) {
      systemPrompt += `\n- Recent surgery type: ${context.surgeryType}`;
    }

    if (context.previousQuestions.length > 0) {
      systemPrompt += `\n- Previous questions asked: ${context.previousQuestions.join(', ')}`;
    }

    if (context.attachments && context.attachments.length > 0) {
      systemPrompt += `\n- Medical documents provided: ${context.attachments.map(a => a.name).join(', ')}`;
      systemPrompt += `\n- Document contents for reference:\n${context.attachments.map(a => `${a.name}: ${a.content}`).join('\n\n')}`;
      systemPrompt += `\n\nIMPORTANT: The patient has provided medical documents. Please reference these documents in your response when relevant and provide advice based on the information contained in them. If lab results or previous prescriptions are mentioned, incorporate this information into your recommendations.`;
    }

    systemPrompt += `\n\nCurrent question: ${context.currentQuestion}

Respond naturally and specifically to their question, considering all their health conditions and how they might interact with each other.`;

    return systemPrompt;
  }

  async generateResponse(context: ChatContext): Promise<string> {
    try {
      const prompt = this.buildSystemPrompt(context);
      console.log('Generated prompt for Gemini:', prompt);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('Gemini raw response:', text);
      return text.trim();
    } catch (error) {
      console.error('Error generating response from Gemini:', error);
      
      // Fallback to a generic helpful response
      const conditionNames = context.conditions.map(c => c.replace(/_/g, " ")).join(", ");
      return `I understand you're asking about "${context.currentQuestion}". While I'm having trouble connecting to my knowledge base right now, I'd recommend discussing this specific question with your healthcare provider who can give you personalized advice for your ${conditionNames} conditions. In the meantime, focus on staying hydrated, eating balanced meals, and getting adequate rest.`;
    }
  }

  async generateWarmIntro(conditions: ConditionKey[]): Promise<string> {
    try {
      const conditionNames = conditions.map(c => c.replace(/_/g, " ")).join(", ");
      const prompt = `Generate a warm, welcoming greeting (max 30 words) for someone who just selected that they have these health conditions: ${conditionNames}. Be empathetic and supportive, letting them know you're here to help with their health journey.`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error generating intro from Gemini:', error);
      
      // Fallback to generic intro based on primary condition
      const primaryCondition = conditions[0];
      const fallbackIntros: Partial<Record<ConditionKey, string>> = {
        pregnant: "I'm so glad you're here. Let's make this journey comfortable and safe.",
        recent_surgery: "Welcome back. Gentle recovery steps can help you heal smoothly.",
        mental_health: "You're not alone. Let's take this one gentle step at a time.",
        skin: "I understand skin concerns can be frustrating. Let's find gentle, effective solutions together.",
        diabetes: "Managing diabetes can feel overwhelming, but small steps make a big difference. I'm here to help.",
        pcos: "PCOS affects everyone differently. Let's find approaches that work specifically for you."
      };
      
      return fallbackIntros[primaryCondition] ?? "I'm here for you. Let's explore supportive, practical steps together.";
    }
  }
}

// Singleton instance
let geminiService: GeminiService | null = null;

export const initializeGeminiService = (apiKey?: string) => {
  // Try to get API key from parameter, environment, or localStorage
  const key = apiKey || 
              import.meta.env.VITE_GEMINI_API_KEY || 
              (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : null);
  
  console.log('Gemini service initialization attempt:', {
    providedKey: apiKey ? 'Provided' : 'Not provided',
    envKey: import.meta.env.VITE_GEMINI_API_KEY ? 'Found' : 'Not found',
    finalKey: key ? 'Available' : 'Not available'
  });
  
  if (key && key !== 'your_gemini_api_key_here') {
    try {
      geminiService = new GeminiService({ apiKey: key });
      console.log('Gemini service created successfully');
    } catch (error) {
      console.error('Error creating Gemini service:', error);
      geminiService = null;
    }
  } else {
    console.log('Gemini service not created: No valid API key');
  }
  
  return geminiService;
};

export const getGeminiService = (): GeminiService | null => {
  return geminiService;
};

export type { ChatContext };
