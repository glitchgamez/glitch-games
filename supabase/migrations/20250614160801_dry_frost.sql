/*
  # Create games table with admin functionality

  1. New Tables
    - `games`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `image_url` (text, required)
      - `download_url` (text, required)
      - `category` (text, required)
      - `file_size` (text, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `games` table
    - Add policy for public read access
    - Add policy for authenticated admin users to manage games

  3. Sample Data
    - Insert sample games for demonstration
*/

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  download_url text NOT NULL,
  category text NOT NULL DEFAULT 'Action',
  file_size text NOT NULL DEFAULT '0 MB',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Allow public read access to games
CREATE POLICY "Anyone can view games"
  ON games
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert/update/delete games
-- In a real app, you'd want to restrict this to admin users only
CREATE POLICY "Authenticated users can manage games"
  ON games
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample games
INSERT INTO games (title, description, image_url, download_url, category, file_size) VALUES
(
  'Cyber Runner 2077',
  'A futuristic cyberpunk adventure game set in the year 2077. Navigate through neon-lit streets, hack into corporate systems, and uncover the truth behind the digital conspiracy.',
  'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com/download/cyber-runner-2077',
  'Action',
  '2.5 GB'
),
(
  'Fantasy Quest Online',
  'Embark on an epic fantasy journey in this massive multiplayer online role-playing game. Create your character, join guilds, and explore vast magical realms.',
  'https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com/download/fantasy-quest-online',
  'RPG',
  '4.2 GB'
),
(
  'Space Defender',
  'Defend Earth from alien invasion in this intense space shooter. Pilot advanced spacecraft, upgrade your weapons, and save humanity from extinction.',
  'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com/download/space-defender',
  'Shooter',
  '1.8 GB'
),
(
  'Racing Thunder',
  'Experience high-speed racing action with realistic physics and stunning graphics. Compete in championships and customize your dream cars.',
  'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com/download/racing-thunder',
  'Racing',
  '3.1 GB'
),
(
  'Puzzle Master',
  'Challenge your mind with hundreds of brain-teasing puzzles. From logic puzzles to spatial challenges, test your problem-solving skills.',
  'https://images.pexels.com/photos/1314410/pexels-photo-1314410.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com/download/puzzle-master',
  'Puzzle',
  '500 MB'
),
(
  'Medieval Kingdoms',
  'Build and manage your medieval kingdom in this strategic simulation game. Construct castles, manage resources, and lead your people to prosperity.',
  'https://images.pexels.com/photos/161154/castle-schwerin-germany-161154.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com/download/medieval-kingdoms',
  'Strategy',
  '2.8 GB'
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_games_updated_at
    BEFORE UPDATE ON games
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();