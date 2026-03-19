# ISOLELE CMS - Content Management System Guide

## 🎯 Overview

ISOLELE uses Supabase as its database backend with a professional content management system. All content (characters, products, articles, homepage settings) is stored in PostgreSQL and managed through APIs.

---

## 📊 Database Structure

### 1. Characters Table
Stores all superhero character information.

**Fields:**
- `id` (UUID) - Unique identifier
- `name_en`, `name_fr` - Character name in English/French
- `slug` - URL-friendly identifier (e.g., "zaire")
- `title_en`, `title_fr` - Character title
- `description_en`, `description_fr` - Character description
- `image_url` - Path to character image
- `kingdom_en`, `kingdom_fr` - Character's kingdom
- `powers` - JSON array of character powers
- `color` - Hex color for character branding (#D4AF37)
- `published` - Boolean (true/false)
- `created_at`, `updated_at` - Timestamps

**Example:**
```sql
INSERT INTO characters (
  name_en, name_fr, slug, title_en, title_fr,
  description_en, description_fr, image_url, kingdom_en, kingdom_fr, color, published
) VALUES (
  'ZAIRE', 'ZAIRE', 'zaire',
  'Prince of Kongo', 'Prince du Kongo',
  'Son of thunder and royalty...', 'Fils du tonnerre et de la royauté...',
  '/characters/zaire-official.jpg',
  'Kingdom of Kongo', 'Royaume du Kongo',
  '#D4AF37', true
);
```

### 2. Products Table
Manages books, comics, and merchandise.

**Fields:**
- `id` (UUID) - Unique identifier
- `name_en`, `name_fr` - Product name
- `slug` - URL-friendly identifier
- `description_en`, `description_fr` - Product description
- `price` - Decimal price (e.g., 24.99)
- `image_url` - Product image path
- `category` - Product category (comic, book, merchandise)
- `stock_quantity` - Available stock
- `published` - Is product visible?
- `created_at`, `updated_at` - Timestamps

**Example:**
```sql
INSERT INTO products (
  name_en, name_fr, slug, description_en, description_fr,
  price, image_url, category, stock_quantity, published
) VALUES (
  'ZAIIRE - Prince of Kongo', 'ZAIIRE - Prince du Kongo', 'zaiire-prince',
  'A thrilling adventure...', 'Une aventure palpitante...',
  24.99, '/books/mokele-crowned-by-streets.jpg', 'comic', 150, true
);
```

### 3. Articles Table
Content for news, blog posts, and cultural commentary.

**Fields:**
- `id` (UUID) - Unique identifier
- `title_en`, `title_fr` - Article title
- `slug` - URL-friendly identifier
- `content_en`, `content_fr` - Full article content
- `excerpt_en`, `excerpt_fr` - Short summary
- `image_url` - Featured image
- `category` - Article category (news, culture, research)
- `published` - Is article published?
- `published_at` - Publication timestamp
- `created_at`, `updated_at` - Timestamps

**Example:**
```sql
INSERT INTO articles (
  title_en, title_fr, slug, content_en, content_fr,
  excerpt_en, excerpt_fr, image_url, category, published, published_at
) VALUES (
  'The Rise of African Mythology', 'L''Ascension de la Mythologie Africaine', 'african-mythology',
  'Full article content here...', 'Contenu complet ici...',
  'How ISOLELE reclaims...', 'Comment ISOLELE reprend...',
  '/articles/mythology.jpg', 'culture', true, now()
);
```

### 4. Homepage Settings Table
Global homepage configuration.

**Fields:**
- `id` (UUID) - Unique identifier
- `hero_title_en`, `hero_title_fr` - Main hero title
- `hero_description_en`, `hero_description_fr` - Hero description
- `hero_image_url` - Hero image
- `updated_at` - Last update timestamp

---

## 🔧 How to Manage Content

### Method 1: Admin Dashboard (Easiest)

Navigate to `/admin/home/refact` to use the visual CMS interface:

1. **Select Content Type** (Characters, Products, Articles, Homepage)
2. **View all items** in the sidebar
3. **Edit existing** - Click item → Edit → Save
4. **Create new** - Click "+" → Fill form → Save
5. **Publish/Unpublish** - Toggle "Published" checkbox

### Method 2: Direct Database (Supabase Console)

1. Go to https://app.supabase.com
2. Select your ISOLELE project
3. Click "SQL Editor"
4. Write SQL queries to insert/update data
5. Execute

### Method 3: API Endpoints

Use REST API endpoints to manage content:

**Get all characters:**
```bash
curl https://your-site.com/api/content/characters
```

**Create character:**
```bash
curl -X POST https://your-site.com/api/content/characters \
  -H "Content-Type: application/json" \
  -d '{
    "name_en": "NEW CHARACTER",
    "name_fr": "NOUVEAU PERSONNAGE",
    "slug": "new-character",
    ...
  }'
```

**Get all products:**
```bash
curl https://your-site.com/api/content/products
```

**Get articles (limited to 5):**
```bash
curl https://your-site.com/api/content/articles?limit=5
```

---

## 📤 Publishing Workflow

### Step 1: Prepare Content
- Write content in English and French
- Prepare high-quality images (2MB max recommended)
- Upload images to `/public` folder

### Step 2: Add to Database
- Use Admin Dashboard or API
- Fill all required fields
- Set `published = false` initially (for review)

### Step 3: Review
- Check preview on live site
- Verify translations
- Test all links

### Step 4: Publish
- Set `published = true` in database
- Deploy to Vercel (if needed)
- Site updates within 5 minutes (ISR)

### Step 5: Monitor
- Check Vercel Analytics
- Monitor Supabase for errors
- Update if needed

---

## 🖼️ Image Management

### Recommended Images Locations:
```
/public/
├── characters/
│   ├── zaire-official.jpg
│   ├── bambula-warrior.jpg
│   └── ...
├── books/
│   ├── mokele-crowned-by-streets.jpg
│   └── ...
├── articles/
│   └── ...
└── events/
    └── ...
```

### Image Requirements:
- **Format:** JPG, PNG (JPG recommended for quality)
- **Size:** 1-2 MB maximum
- **Resolution:** 1200x1200px minimum
- **Aspect Ratio:** Square (1:1) for thumbnails, 16:9 for hero images

### Upload Image:
1. Prepare image locally
2. Add to correct folder in `/public`
3. Reference in database: `/characters/image-name.jpg`
4. Deploy to Vercel

---

## 🌐 Multilingual Content

All content supports English and French:

**When adding content:**
- Fill BOTH `_en` and `_fr` fields
- Use professional translations
- Maintain consistent tone

**Database fields with translations:**
- `name_en` / `name_fr`
- `title_en` / `title_fr`
- `description_en` / `description_fr`
- `content_en` / `content_fr`
- `excerpt_en` / `excerpt_fr`

---

## 📋 Content Checklist

### Before Publishing Any Content:

- [ ] Content is in English and French
- [ ] All required fields are filled
- [ ] Images are uploaded to correct folder
- [ ] Image paths are correct (`/folder/image.jpg`)
- [ ] Links are verified
- [ ] Spelling and grammar checked
- [ ] SEO slug is descriptive
- [ ] `published` is set to `true`
- [ ] Preview looks good on mobile/desktop

---

## 🔍 Database Queries Reference

### View all published characters:
```sql
SELECT * FROM characters WHERE published = true ORDER BY created_at DESC;
```

### Update character:
```sql
UPDATE characters
SET description_en = 'New description...', updated_at = now()
WHERE slug = 'zaire';
```

### Delete article:
```sql
DELETE FROM articles WHERE id = 'uuid-here';
```

### Update homepage hero:
```sql
UPDATE homepage_settings
SET hero_title_en = 'New Title'
WHERE id = (SELECT id FROM homepage_settings LIMIT 1);
```

### Count published products:
```sql
SELECT COUNT(*) FROM products WHERE published = true;
```

---

## 🚀 Going Live

### When ready to launch:

1. Ensure all core content is published:
   - At least 5 characters
   - At least 3 products
   - At least 2 articles
   - Homepage settings configured

2. Test everything:
   - All pages load correctly
   - Images display properly
   - Links work
   - Languages switch correctly

3. Deploy to Vercel:
   ```bash
   git push origin main
   ```

4. Monitor:
   - Check Vercel Analytics
   - Monitor Supabase
   - Fix any issues

---

## 💡 Best Practices

1. **Always backup** - Export data regularly
2. **Version control** - Keep code in Git
3. **Test before publish** - Use draft mode
4. **Consistent naming** - Use slugs like `article-title`
5. **Image quality** - Use high-res images
6. **Mobile first** - Test on mobile devices
7. **SEO friendly** - Use descriptive titles and slugs

---

## 🆘 Troubleshooting

**Content not appearing?**
- Check if `published = true`
- Verify database connection
- Clear browser cache
- Wait 5 minutes for ISR

**Images not loading?**
- Verify image path starts with `/`
- Check image exists in `/public`
- Check file extension
- Verify file size < 2MB

**Can't access admin dashboard?**
- Verify you're logged in
- Check `/admin` route exists
- Clear cookies and refresh

**Database errors?**
- Check Supabase connection
- Verify environment variables set
- Check Vercel logs
- Restart app

---

## 📞 Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs

Good luck managing your ISOLELE content! 🎊
