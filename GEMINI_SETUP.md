# Setup Guide: Google Gemini API Integration

## 🔐 Step 1: Get Your Gemini API Key

### Option A: Google AI Studio (Recommended for Development)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **"Get API Key"**
3. Select or create a Google Cloud project
4. Copy the generated API key

### Option B: Google Cloud Console (For Production)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the "Generative Language API"
4. Create an API key in "Credentials"

## 📝 Step 2: Add to Environment Variables

### Local Development (.env.local)
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

### Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add new variable:
   - **Name**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Value**: Your API key
   - **Environments**: Select all (Production, Preview, Development)
4. Save and redeploy

## ✅ Step 3: Test the Integration

### Test via API Endpoint
```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how are you?",
    "targetLanguage": "French"
  }'
```

### Expected Response
```json
{
  "originalText": "Hello, how are you?",
  "translatedText": "Bonjour, comment allez-vous?",
  "targetLanguage": "French"
}
```

## 🎯 Usage Examples

### 1. Translation
```typescript
import { translateWithGemini } from '@/lib/gemini-service';

const result = await translateWithGemini({
  text: "Welcome to ISOLELE",
  targetLanguage: "French"
});
// Result: { originalText: "...", translatedText: "Bienvenue à ISOLELE", targetLanguage: "French" }
```

### 2. Batch Translation
```typescript
import { translateBatch } from '@/lib/gemini-service';

const results = await translateBatch(
  ["Character", "Shop", "About"],
  "Spanish"
);
// Result: ["Carácter", "Tienda", "Acerca de"]
```

### 3. Generate Description
```typescript
import { generateDescription } from '@/lib/gemini-service';

const desc = await generateDescription(
  "King Kufulula",
  "ISOLELE Universe - African Superhero"
);
// Result: "The ancestral king of New York..."
```

## 🌍 Supported Languages

All languages supported:
- English (en)
- French (fr)
- Spanish (es)
- German (de)
- Italian (it)
- Portuguese (pt)
- Zulu (zu)
- Xhosa (xh)
- Swahili (sw)
- Lingala (ln)
- And 100+ more!

## 🔒 Security Best Practices

### DO:
✅ Use `NEXT_PUBLIC_` prefix only for client-safe keys  
✅ Rotate keys regularly  
✅ Monitor API usage in Google Cloud Console  
✅ Set quotas/limits if needed  

### DON'T:
❌ Commit API keys to Git  
❌ Expose keys in frontend code  
❌ Share keys publicly  
❌ Use same key across multiple projects  

## 🐛 Troubleshooting

### "API key not valid"
- Check `.env.local` is loaded
- Verify key copied correctly (no spaces)
- Ensure NEXT_PUBLIC_ prefix

### "Rate limit exceeded"
- Check Google Cloud Console quotas
- Implement request caching
- Use batch endpoints when possible

### "CORS error"
- Use API through `/api/translate` endpoint
- Don't call Gemini directly from client
- Backend handles authentication

## 📚 Documentation Links

- [Google Generative AI Docs](https://ai.google.dev/)
- [API Reference](https://ai.google.dev/tutorials/rest_quickstart)
- [Python Library](https://github.com/google/generative-ai-python)
- [Node.js Library](https://github.com/google/generative-ai-js)

## 💡 Tips

1. **Cache Translations**: Store results to avoid re-translating
2. **Batch Requests**: Group multiple translations for efficiency
3. **Error Handling**: Always wrap calls in try/catch
4. **Rate Limiting**: Implement backoff strategy for production

---

**Setup Status**: Ready to use!
**Last Updated**: March 10, 2026
