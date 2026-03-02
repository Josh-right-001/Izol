import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...')

    // Create pages table
    const { error: pagesError } = await supabase.rpc('create_pages_table', {}, { count: 'exact' })
    
    // Create characters table
    console.log('Creating characters table...')
    const charactersSQL = `
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
    `

    // Create products table
    console.log('Creating products table...')
    const productsSQL = `
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
    `

    // Create articles table
    console.log('Creating articles table...')
    const articlesSQL = `
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
    `

    // Insert default characters
    console.log('Inserting default characters...')
    const characters = [
      {
        name_en: 'ZAIRE',
        name_fr: 'ZAIRE',
        slug: 'zaire',
        title_en: 'Prince of Kongo',
        title_fr: 'Prince du Kongo',
        description_en: 'Son of thunder and royalty, chosen by the Necklace of Destiny.',
        description_fr: 'Fils du tonnerre et de la royauté, choisi par le Collier de la Destinée.',
        image_url: '/characters/zaire-official.jpg',
        kingdom_en: 'Kingdom of Kongo',
        kingdom_fr: 'Royaume du Kongo',
        color: '#D4AF37'
      },
      {
        name_en: 'KIMOYA',
        name_fr: 'KIMOYA',
        slug: 'kimoya',
        title_en: 'The Reborn Kandake',
        title_fr: 'La Kandake Renaissante',
        description_en: 'Heir of warrior queens, shadow hunter and protector of the Ethercobalt.',
        description_fr: 'Héritière des reines guerrières, chasseuse d\'ombres et protectrice de l\'Ethercobalt.',
        image_url: '/characters/royal-court.jpg',
        kingdom_en: 'Kingdom of Kush',
        kingdom_fr: 'Royaume de Kush',
        color: '#B3541E'
      },
      {
        name_en: 'ZATTAR',
        name_fr: 'ZATTAR',
        slug: 'zattar',
        title_en: 'The Blood Architect',
        title_fr: 'L\'Architecte de Sang',
        description_en: 'Cursed genius of forbidden technology. Master of techno-mystical constructs.',
        description_fr: 'Génie maudit de la technologie interdite. Maître des constructions techno-mystiques.',
        image_url: '/characters/bakala-baku.jpg',
        kingdom_en: 'Iron Desert of Tsoro',
        kingdom_fr: 'Désert de Fer de Tsoro',
        color: '#8B0000'
      },
      {
        name_en: 'BAMBULA',
        name_fr: 'BAMBULA',
        slug: 'bambula',
        title_en: 'The Warrior',
        title_fr: 'Le Guerrier',
        description_en: 'Protector of the forest realm and keeper of ancient traditions.',
        description_fr: 'Protecteur du royaume forestier et gardien des traditions anciennes.',
        image_url: '/characters/bambula-warrior.jpg',
        kingdom_en: 'Forest of Mbanzya',
        kingdom_fr: 'Forêt de Mbanzya',
        color: '#228B22'
      }
    ]

    for (const character of characters) {
      const { error } = await supabase.from('characters').insert([character])
      if (error && error.code !== '23505') { // 23505 is duplicate key error
        console.error('Error inserting character:', error)
      }
    }

    console.log('Database initialization complete!')
  } catch (error) {
    console.error('Database initialization failed:', error)
    process.exit(1)
  }
}

initializeDatabase()
