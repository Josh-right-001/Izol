# ISOLELE - Quick Start Guide

## 🚀 Get Live in 30 Minutes!

### Step 1: Clone & Setup (5 min)

```bash
# Clone repository
git clone <your-repo-url>
cd isolele

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your Supabase credentials to .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### Step 2: Initialize Database (5 min)

```bash
# Run database setup
npm run init-db

# Verify in Supabase console
# Go to https://app.supabase.com
# Check that tables exist in SQL Editor
```

### Step 3: Add Content (10 min)

**Option A: Using Admin Dashboard**
```bash
# Start local dev server
npm run dev

# Go to http://localhost:3000/admin/home/refact
# Add characters, products, articles
```

**Option B: Using Supabase Console**
```sql
-- Add a character
INSERT INTO characters (name_en, name_fr, slug, title_en, title_fr, description_en, description_fr, image_url, color, published)
VALUES ('ZAIRE', 'ZAIRE', 'zaire', 'Prince of Kongo', 'Prince du Kongo', 'Son of thunder...', 'Fils du tonnerre...', '/characters/zaire-official.jpg', '#D4AF37', true);

-- Add a product
INSERT INTO products (name_en, name_fr, slug, description_en, description_fr, price, image_url, published)
VALUES ('ZAIIRE Comic', 'Comic ZAIIRE', 'zaiire-comic', 'Thrilling adventure', 'Aventure palpitante', 24.99, '/books/mokele-crowned-by-streets.jpg', true);
```

### Step 4: Deploy to Vercel (10 min)

```bash
# Push to GitHub
git add .
git commit -m "ISOLELE ready for production"
git push origin main

# Go to https://vercel.com/new
# Select your repository
# Add env variables
# Click Deploy

# Done! Your site is live!
```

---

## ✅ Verify It Works

- [ ] Homepage loads
- [ ] Images display
- [ ] Language switching works
- [ ] Mobile menu works
- [ ] Admin dashboard accessible
- [ ] Content appears on pages

---

## 📚 Full Documentation

- **Deployment:** See `VERCEL_DEPLOYMENT_GUIDE.md`
- **Content Management:** See `CMS_CONTENT_MANAGEMENT.md`
- **Pre-Launch Checklist:** See `DEPLOYMENT_CHECKLIST.md`
- **Full Summary:** See `FINAL_IMPLEMENTATION_SUMMARY.md`

---

## 🎯 What's Included

✅ Beautiful loading screen
✅ Professional admin dashboard
✅ Complete database system
✅ API endpoints for content
✅ Mobile-optimized design
✅ Multilingual support (8 languages)
✅ Security configured
✅ Performance optimized

---

**That's it! You're ready to launch ISOLELE! 🚀**
