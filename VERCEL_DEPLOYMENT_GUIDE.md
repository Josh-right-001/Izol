# ISOLELE - Vercel Deployment & Content Management Guide

## 📋 Table of Contents
1. Preparing for Vercel Deployment
2. Deploying to Vercel
3. Managing Content via Database
4. Publishing Updates
5. Monitoring & Analytics

---

## 🚀 Step 1: Preparing for Vercel Deployment

### Prerequisites
- Vercel account (https://vercel.com)
- Supabase account with active database
- GitHub account with repository

### Environment Variables

Ensure these are set in your Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_postgres_prisma_url
```

### Initialize Database

Run the database initialization script:

```bash
npm run init-db
```

This will create all necessary tables and insert default data.

---

## 📤 Step 2: Deploying to Vercel

### Option A: Deploy from Git (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Select "Import Git Repository"
4. Choose your ISOLELE repository
5. Add environment variables (see above)
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option C: Deploy from Dashboard

1. Connect your GitHub account to Vercel
2. Click "New Project"
3. Select the ISOLELE repository
4. Configure settings
5. Click "Deploy"

---

## 📝 Step 3: Managing Content via Database

### Adding/Editing Characters

Use the Admin Dashboard at `/admin/home/refact`:

1. Select "Characters" from the sidebar
2. Edit existing or add new character
3. Upload character image
4. Set colors and powers
5. Click "Save" to publish

Alternatively, use SQL:

```sql
INSERT INTO characters (name_en, name_fr, slug, title_en, title_fr, description_en, description_fr, image_url, color, published)
VALUES (
  'CHARACTER_NAME',
  'NOM_PERSONNAGE',
  'character-slug',
  'English Title',
  'Titre Français',
  'Description in English...',
  'Description en Français...',
  '/characters/image.jpg',
  '#D4AF37',
  true
);
```

### Adding/Editing Products

1. Go to Admin Dashboard > Products
2. Add product details
3. Set price and stock
4. Upload product image
5. Save

### Publishing Articles/News

```sql
INSERT INTO articles (
  title_en, title_fr, slug, content_en, content_fr,
  excerpt_en, excerpt_fr, image_url, category, published, published_at
)
VALUES (
  'English Title', 'Titre Français', 'article-slug',
  'Full content in English...', 'Contenu complet en Français...',
  'Short excerpt', 'Court résumé', '/articles/image.jpg',
  'news', true, now()
);
```

### Updating Homepage

Edit homepage settings in database:

```sql
UPDATE homepage_settings
SET
  hero_title_en = 'New Title',
  hero_title_fr = 'Nouveau Titre',
  hero_description_en = 'New description',
  hero_description_fr = 'Nouvelle description'
WHERE id = (SELECT id FROM homepage_settings LIMIT 1);
```

---

## 🔄 Step 4: Publishing Updates

### Automatic Deployment

Any push to main branch triggers automatic deployment:

```bash
git add .
git commit -m "Update content: Add new character Zaire"
git push origin main
```

Vercel will automatically:
- Build the project
- Run tests
- Deploy to production
- Update live site (~ 5 minutes)

### Manual Redeploy

If you need to redeploy without code changes:

1. Go to Vercel Dashboard
2. Select "ISOLELE" project
3. Go to "Deployments"
4. Click "..." on latest deployment
5. Select "Redeploy"

---

## 📊 Step 5: Monitoring & Analytics

### Vercel Analytics

View in Vercel Dashboard:
- Page views and performance
- Real-time errors
- Deployment history
- Environment monitoring

### Database Monitoring

In Supabase Dashboard:
- Query performance
- Storage usage
- API calls
- Real-time events

### Check Site Health

Use tools like:
- Google PageSpeed Insights
- GTmetrix
- Lighthouse (in DevTools)

---

## 🔐 Security Best Practices

1. **Keep secrets safe** - Never commit API keys
2. **Use environment variables** - Always use .env.local
3. **Enable RLS** - Row Level Security is enabled by default
4. **Regular backups** - Supabase auto-backups daily
5. **Monitor errors** - Check Vercel Error Tracking

---

## 🐛 Troubleshooting

### Page not updating after database change
- Wait 5-10 minutes for ISR (Incremental Static Regeneration)
- Or manually redeploy via Vercel Dashboard

### Images not displaying
- Check image path in database (should start with `/`)
- Ensure image exists in `/public` folder
- Check image format (JPG, PNG recommended)

### Database connection errors
- Verify SUPABASE_URL and keys in Vercel settings
- Check Supabase is online
- Restart environment

### Build failures
- Check build logs in Vercel Dashboard
- Ensure all dependencies are installed
- Check for TypeScript errors

---

## 📞 Support

For issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Check Supabase docs: https://supabase.com/docs
3. View build logs in Vercel Dashboard
4. Check database in Supabase console

---

## 🎉 You're Live!

Your ISOLELE site is now live on Vercel and ready to scale!

Happy publishing! 🚀
