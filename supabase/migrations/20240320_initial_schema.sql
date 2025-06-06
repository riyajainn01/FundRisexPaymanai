-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    story TEXT NOT NULL,
    category TEXT NOT NULL,
    goal DECIMAL NOT NULL,
    raised DECIMAL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT NOT NULL,
    creator TEXT NOT NULL,
    location TEXT NOT NULL,
    donations JSONB DEFAULT '[]'::jsonb
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    amount DECIMAL NOT NULL,
    donor TEXT NOT NULL,
    message TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON campaigns(category);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON campaigns(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_campaign_id ON donations(campaign_id);

-- Enable Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON campaigns
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON campaigns
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON campaigns
    FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON donations
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON donations
    FOR INSERT WITH CHECK (true); 