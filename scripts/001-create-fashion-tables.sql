-- Create fashion_videos table
CREATE TABLE IF NOT EXISTS fashion_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  video_url VARCHAR(500),
  category VARCHAR(100),
  price NUMERIC(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create video_interactions table
CREATE TABLE IF NOT EXISTS video_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES fashion_videos(id) ON DELETE CASCADE,
  user_id VARCHAR(255),
  liked BOOLEAN DEFAULT FALSE,
  favorited BOOLEAN DEFAULT FALSE,
  shared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(video_id, user_id)
);

-- Create video_comments table
CREATE TABLE IF NOT EXISTS video_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES fashion_videos(id) ON DELETE CASCADE,
  user_id VARCHAR(255),
  username VARCHAR(100),
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_video_interactions_video_id ON video_interactions(video_id);
CREATE INDEX IF NOT EXISTS idx_video_interactions_user_id ON video_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_video_comments_video_id ON video_comments(video_id);

-- Insert sample fashion videos
INSERT INTO fashion_videos (title, description, image_url, category, price) VALUES
('Royal Golden Crown', 'Premium golden crown accessory with intricate patterns', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0021-gtTE1FKIqHREoscLmcpydLPt09nn5M.jpg', 'Accessories', 245.00),
('Zaiire Character Cap', 'Exclusive cap featuring Zaiire the Prince of Kongo', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0026-4lJtHXPlKDW0ETYoKxj3uOCscFCFaS.jpg', 'Hats', 89.99),
('African Mask Spirit', 'Traditional ceremonial mask with vibrant colors', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0019-lIccvDFS0C5Trkq38r6VUxlbFh2pNM.jpg', 'Masks', 199.99),
('Panthera Sneaker', 'Premium sneaker with colorful geometric design', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0050-0EvGwiQ882fDOlbsmBN4uqEYvV1ET4.jpg', 'Sneakers', 159.99),
('Panthera Black Cap', 'Black trucker cap with golden Panthera emblem', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0035-knScMbzJ5xP7tyAqfpu2tnMS7lnMqY.jpg', 'Hats', 79.99),
('Lion Heritage Shoes', 'Premium cream and lime green heritage sneaker', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0020-QkPSM9PkuNZjPgSbmnc7maS8CTg08j.jpg', 'Sneakers', 189.99),
('Golden Lion Mask', 'Golden lion mask with ceremonial crown', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0018-b7vCEEV8dcj2HcSPNAvy2GMLnu1ltK.jpg', 'Masks', 229.99),
('Isolele Black Belt', 'Premium black leather belt with golden ISO buckle', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0027-Zaxp5cCFMz8JCYzEoJuO1GvaU2vSMV.jpg', 'Belts', 129.99),
('ZAIIRE Perfume', 'Luxury fragrance inspired by Prince Zaiire', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0022-0AnfJyAKrcoziXwMQgRd3Msy6tcEhY.jpg', 'Perfumes', 99.99),
('Lionpard Premium Cap', 'White premium cap with Lionpard emblem', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0024-Qmafphzz2kmhWoxGu8DlqLvrwgNdrU.jpg', 'Hats', 84.99),
('Zaiire Black Cap', 'Character-inspired black cap with orange logo', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0025-pDeFCqGikquZGnccU3l8gcdqCIoB3m.jpg', 'Hats', 74.99);
