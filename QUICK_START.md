# 🚀 ISOLELE - Quick Start Guide (Phase 2)

Welcome! Get started in just a few minutes.

---

## ⚡ 60-Second Setup

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Add Environment Variable
```bash
# Create .env.local file
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_key_here" > .env.local
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser
```
http://localhost:3000
```

**✅ Done!** Your site is running.

---

## 📖 Documentation Reading Order

**First Time?** Read these in order:

1. **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** (2 min)
   - Overview of all docs
   - Navigation by role
   
2. **[PHASE_2_COMPLETION.md](PHASE_2_COMPLETION.md)** (5 min)
   - What's new in Phase 2
   - Success metrics

3. **[NEW_FEATURES_GUIDE.md](NEW_FEATURES_GUIDE.md)** (10 min)
   - How to use new features
   - Testing checklist

4. **[GEMINI_SETUP.md](GEMINI_SETUP.md)** (5 min)
   - API configuration
   - Usage examples

---

## 🎯 What's New in Phase 2

### 🎨 Chatbot Redesign
- Modern gradient bubbles
- Smooth animations
- Glassmorphic sidebar
- Better mobile experience

### 📱 Mobile Navigation
- Bottom floating nav bar on mobile
- Appears only on small screens
- Disappears on desktop
- Smooth icon buttons

### 📸 Character Images
- Real artwork integrated
- High-quality images
- Proper aspect ratios
- Smooth loading

### 🌐 Gemini API
- Multi-language translation
- AI descriptions
- 100+ languages supported
- Easy to use

---

## 🔑 Get Gemini API Key

### Quick Setup (2 minutes)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API Key"
3. Copy the key
4. Paste in `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

**That's it!** API is ready to use.

---

## 🧪 Test the Features

### Test Chatbot
```bash
# 1. Go to http://localhost:3000/chatbot
# 2. Type a message
# 3. See gradient response
```

### Test Translation API
```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello world",
    "targetLanguage": "French"
  }'
```

### Test Mobile Nav
```bash
# 1. Open DevTools (F12)
# 2. Toggle Device Toolbar (mobile)
# 3. See bottom nav appear
# 4. Go back to desktop
# 5. Bottom nav disappears
```

---

## 📁 Project Structure

```
isolele/
├─ app/
│  ├─ (public)/          # Public pages
│  │  └─ chatbot/        # Chat page
│  ├─ api/
│  │  └─ translate/      # Translation API
│  └─ layout.tsx         # Root layout
├─ components/
│  ├─ home/              # Homepage sections
│  ├─ ui/                # UI components
│  └─ site-header.tsx    # Navigation
├─ lib/
│  ├─ gemini-service.ts  # NEW: Translation service
│  ├─ theme-context.tsx  # Theme system
│  └─ language-context.tsx # Language system
├─ public/
│  └─ images/            # Static images
├─ .env.local            # Environment variables (YOU ADD THIS)
├─ package.json          # Dependencies
└─ tailwind.config.js    # Styling

KEY NEW FILES:
✨ lib/gemini-service.ts
✨ app/api/translate/route.ts
✨ Updated: app/(public)/chatbot/page.tsx
✨ Updated: components/home/characters-section.tsx
✨ Updated: components/site-header.tsx
```

---

## 🎬 Common Tasks

### Add New Translation
```typescript
// In lib/gemini-service.ts
import { translateWithGemini } from '@/lib/gemini-service';

const result = await translateWithGemini({
  text: "Your text here",
  targetLanguage: "French"
});

console.log(result.translatedText); // "Votre texte ici"
```

### Generate Product Description
```typescript
import { generateDescription } from '@/lib/gemini-service';

const desc = await generateDescription(
  "Royal Crown",
  "ISOLELE African Superhero Merchandise"
);
```

### Access Chatbot Page
```
http://localhost:3000/chatbot
```

### View Different Languages
```
http://localhost:3000?lang=fr  (French)
http://localhost:3000?lang=es  (Spanish)
http://localhost:3000?lang=de  (German)
```

---

## 🐛 Troubleshooting

### Chatbot looks broken?
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check console for errors (F12)

### API not working?
- Check `.env.local` is created
- Verify API key is correct
- Check network tab for errors

### Images not showing?
- Check image URLs in components
- Verify they're from valid sources
- Look for CORS errors

### Navigation issues?
- Check viewport is not zoomed
- Try different browser
- Clear cookies

**Still stuck?** Check the appropriate documentation:
- API issues → [GEMINI_SETUP.md](GEMINI_SETUP.md)
- Feature issues → [NEW_FEATURES_GUIDE.md](NEW_FEATURES_GUIDE.md)
- Architecture → [IMPROVEMENTS_PHASE_2.md](IMPROVEMENTS_PHASE_2.md)

---

## 📦 Build for Production

### Build Static Site
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys!
# Just add env var in Vercel dashboard:
# NEXT_PUBLIC_GEMINI_API_KEY=your_key
```

---

## 🎨 Customize Appearance

### Change Colors
```typescript
// lib/theme-context.tsx
const themes = {
  dark: {
    colors: {
      accentPrimary: "#FF6B6B",   // Change this
      accentSecondary: "#4ECDC4", // And this
      background: "#1A1A1A",
      // ... more colors
    }
  }
}
```

### Change Fonts
```typescript
// app/layout.tsx
import { YourFont } from 'next/font/google'

const font = YourFont({ subsets: ['latin'] })
```

### Change Animations
```typescript
// components/home/chatbot/page.tsx
// Look for motion.div components
// Adjust duration, delay, transition
```

---

## 🚀 Next Steps

### For Developers
1. Review [IMPROVEMENTS_PHASE_2.md](IMPROVEMENTS_PHASE_2.md)
2. Read [GEMINI_SETUP.md](GEMINI_SETUP.md)
3. Check [NEW_FEATURES_GUIDE.md](NEW_FEATURES_GUIDE.md) → Testing Checklist
4. Start coding!

### For Designers
1. Check [NEW_FEATURES_GUIDE.md](NEW_FEATURES_GUIDE.md) → Design Highlights
2. Review component colors in `lib/theme-context.tsx`
3. Customize in Vercel v0 Design Mode

### For Product Team
1. Read [PHASE_2_COMPLETION.md](PHASE_2_COMPLETION.md)
2. Review [PHASE_3_ROADMAP.md](PHASE_3_ROADMAP.md)
3. Plan next features

---

## 📊 Useful Links

| Link | Purpose |
|------|---------|
| [localhost:3000](http://localhost:3000) | Local dev site |
| [Gemini API Docs](https://ai.google.dev) | API reference |
| [Google AI Studio](https://aistudio.google.com/app/apikey) | Get API key |
| [Next.js Docs](https://nextjs.org/docs) | Framework docs |
| [Tailwind CSS](https://tailwindcss.com) | Styling reference |
| [Framer Motion](https://www.framer.com/motion/) | Animation docs |

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Dev server runs without errors
- [ ] Homepage loads correctly
- [ ] Mobile nav appears on small screens
- [ ] Chatbot page opens and styles show
- [ ] Images load (characters section)
- [ ] Theme switching works
- [ ] Language switcher works
- [ ] Console has no errors
- [ ] No images are broken

**All checked?** ✅ You're ready to go!

---

## 📞 Questions?

### Check Documentation First
- General questions → [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
- How-to questions → [NEW_FEATURES_GUIDE.md](NEW_FEATURES_GUIDE.md)
- API questions → [GEMINI_SETUP.md](GEMINI_SETUP.md)
- Code questions → [IMPROVEMENTS_PHASE_2.md](IMPROVEMENTS_PHASE_2.md)

### Feature Requests
- Check [PHASE_3_ROADMAP.md](PHASE_3_ROADMAP.md) first
- Add to GitHub issues if not listed
- Tag as enhancement

### Bug Reports
- Clear cache and try again
- Check console for errors
- Search existing issues
- Create new issue with details

---

## 🎉 You're All Set!

**Welcome to Team ISOLELE!**

The project is ready to use, develop, and deploy. Everything you need is documented and the codebase is clean and maintainable.

**Happy coding! 🚀**

---

**Last Updated:** March 10, 2026  
**Status:** Ready for development  
**Next:** Read [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
