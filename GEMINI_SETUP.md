# Gemini AI Integration Setup Guide

## Overview
This health chatbot now uses Google's Gemini AI to provide personalized, contextual responses instead of hardcoded answers. This means when you ask "can you tailor me 1 week daily routine to eat to get rid of pimples", you'll get a specific acne-focused meal plan rather than a generic daily routine.

## Features
- **Contextual Responses**: Gemini considers your selected health condition, previous questions, and surgery type (if applicable)
- **Personalized Advice**: Each response is tailored to your specific health situation
- **Conversation Memory**: The AI remembers your recent questions to provide better context
- **Fallback Support**: If Gemini is unavailable, the system falls back to the original hardcoded responses

## Setup Instructions

### Option 1: Environment Variable (Recommended for Development)
1. Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open the `.env` file in your project root
3. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
4. Restart your development server

### Option 2: Runtime Configuration
1. Start the application without setting the API key
2. You'll see a configuration card at the top of the chatbot
3. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. Enter it in the configuration card
5. Click "Set Key" - the key will be stored locally in your browser

## How It Works

### Context Building
When you ask a question, the system sends Gemini:
- Your health condition (e.g., "skin problems", "diabetes", "pregnant")
- Surgery type (if you selected "recently had surgery")
- Your last 10 questions for conversation context
- Your current question

### Example Improvement
**Before (Hardcoded)**:
- Question: "can you tailor me 1 week daily routine to eat to get rid of pimples"
- Response: Generic daily routine about hydration and breathing exercises

**After (Gemini)**:
- Same question gets a specific 7-day anti-acne meal plan with foods that help reduce inflammation, specific recipes, and foods to avoid

### Smart Fallbacks
If Gemini is unavailable or returns an error, the system automatically falls back to the original hardcoded responses, ensuring the chatbot always works.

## Technical Implementation
- **Service Layer**: `src/services/geminiService.ts` handles all AI interactions
- **Context Management**: Tracks conversation history and health conditions
- **Error Handling**: Graceful degradation to hardcoded responses
- **Performance**: Responses typically take 2-3 seconds

## Privacy & Security
- API keys are never sent to any server other than Google's Gemini API
- When using runtime configuration, keys are stored only in your browser's localStorage
- Conversation context is not stored permanently
- All health discussions remain between you and the AI

## Development Notes
- The integration is designed to be easily extensible
- You can modify the system prompts in `geminiService.ts`
- The fallback responses in `ChatbotPanel.tsx` can still be updated
- Add new health conditions by updating the `conditions-data.ts` file

## Getting Your API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Keep it secure - treat it like a password

The free tier includes generous usage limits that should be sufficient for personal use and development.
