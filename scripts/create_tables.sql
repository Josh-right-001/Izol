-- ISOLELE Content Management Database Schema

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  description_en TEXT,
  description_fr TEXT,
  content_en JSONB,
  content_fr JSONB,
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Characters table
CREATE TABLE IF NOT EXISTS characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  image_url TEXT,
  kingdom_en TEXT,
  kingdom_fr TEXT,
  powers JSONB,
  color TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Products/Books table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'comic',
  stock_quantity INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- News/Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_en TEXT NOT NULL,
  content_fr TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_fr TEXT,
  image_url TEXT,
  category TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Homepage settings table
CREATE TABLE IF NOT EXISTS homepage_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title_en TEXT,
  hero_title_fr TEXT,
  hero_description_en TEXT,
  hero_description_fr TEXT,
  hero_image_url TEXT,
  updated_at TIMESTAMP DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  language TEXT DEFAULT 'en',
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Insert default homepage settings
INSERT INTO homepage_settings (hero_title_en, hero_title_fr, hero_description_en, hero_description_fr)
VALUES (
  'ISOLELE - AFRICAN MYTHOLOGY REAWAKENED',
  'ISOLELE - MYTHOLOGIE AFRICAINE RÉVEILLÉE',
  'A visionary universe where superheroes are chosen by destiny, where Kongo kingdoms are alive, and each story carries the soul of a continent.',
  'Un univers visionnaire où les super-héros sont choisis par le destin, où les royaumes kongo sont vivants, et où chaque histoire porte l''âme d''un continent.'
);

-- Enable Row Level Security (RLS)
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read access
CREATE POLICY "allow_public_read_pages" ON pages FOR SELECT USING (published = true);
CREATE POLICY "allow_public_read_characters" ON characters FOR SELECT USING (published = true);
CREATE POLICY "allow_public_read_products" ON products FOR SELECT USING (published = true);
CREATE POLICY "allow_public_read_articles" ON articles FOR SELECT USING (published = true);
CREATE POLICY "allow_public_subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_characters_slug ON characters(slug);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(published, published_at DESC);
