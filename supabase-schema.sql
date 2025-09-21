-- Create custom types
CREATE TYPE user_role AS ENUM ('PRACTITIONER', 'ADMIN');
CREATE TYPE gender_type AS ENUM ('MALE', 'FEMALE', 'OTHER');
CREATE TYPE smoking_status AS ENUM ('NEVER', 'FORMER', 'LIGHT', 'MODERATE', 'HEAVY');
CREATE TYPE diabetes_type AS ENUM ('NONE', 'TYPE1', 'TYPE2', 'GESTATIONAL');
CREATE TYPE stress_level AS ENUM ('LOW', 'MODERATE', 'HIGH');
CREATE TYPE oral_hygiene_freq AS ENUM ('RARELY', 'ONCE_DAILY', 'TWICE_DAILY', 'MORE_THAN_TWICE');
CREATE TYPE flossing_freq AS ENUM ('NEVER', 'OCCASIONALLY', 'WEEKLY', 'DAILY');
CREATE TYPE dietary_habits AS ENUM ('BALANCED', 'HIGH_SUGAR', 'LOW_NUTRITION', 'ACIDIC');
CREATE TYPE alcohol_consumption AS ENUM ('NONE', 'LIGHT', 'MODERATE', 'HEAVY');
CREATE TYPE risk_level AS ENUM ('LOW_RISK', 'MODERATE_RISK', 'HIGH_RISK');
CREATE TYPE priority_level AS ENUM ('ROUTINE', 'MODERATE', 'HIGH', 'URGENT');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role user_role DEFAULT 'PRACTITIONER',
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patients table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Demographics
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender gender_type,
  phone TEXT,
  email TEXT,
  address TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  
  -- Insurance
  insurance_provider TEXT,
  policy_number TEXT,
  group_number TEXT,
  
  -- Medical History (stored as arrays)
  medical_conditions TEXT[],
  medications TEXT[],
  allergies TEXT[],
  previous_dental_work TEXT[],
  
  -- Risk Factors
  smoking_status smoking_status DEFAULT 'NEVER',
  smoking_pack_years DECIMAL,
  diabetes_type diabetes_type DEFAULT 'NONE',
  diabetes_hba1c TEXT,
  family_history_perio BOOLEAN DEFAULT FALSE,
  stress_level stress_level DEFAULT 'LOW',
  
  -- Lifestyle
  oral_hygiene_freq oral_hygiene_freq DEFAULT 'TWICE_DAILY',
  flossing_freq flossing_freq DEFAULT 'DAILY',
  mouthwash_use BOOLEAN DEFAULT FALSE,
  dietary_habits dietary_habits DEFAULT 'BALANCED',
  alcohol_consumption alcohol_consumption DEFAULT 'NONE',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Periodontal charts
CREATE TABLE perio_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  assessment_id UUID,
  chart_data JSONB NOT NULL, -- 32-tooth chart data
  uploaded_image_url TEXT, -- Supabase storage URL
  analysis_results JSONB, -- AI analysis results
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessments
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  
  -- Calculated metrics
  bop_percentage DECIMAL NOT NULL,
  sites_with_ppd_5mm INTEGER NOT NULL,
  missing_teeth INTEGER NOT NULL,
  avg_cal DECIMAL,
  max_cal DECIMAL,
  estimated_bone_loss DECIMAL,
  
  -- Risk assessment
  overall_risk risk_level NOT NULL,
  treatment_priority priority_level NOT NULL,
  maintenance_interval TEXT NOT NULL,
  
  -- BSP Classification
  bsp_stage TEXT NOT NULL,
  bsp_grade TEXT NOT NULL,
  
  -- PRA Results
  pra_risk_factors JSONB NOT NULL,
  combined_risk_score DECIMAL NOT NULL,
  confidence DECIMAL NOT NULL,
  
  assessment_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- OTP tokens for admin authentication
CREATE TABLE otp_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for assessment_id in perio_charts
ALTER TABLE perio_charts 
ADD CONSTRAINT fk_perio_charts_assessment 
FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE SET NULL;

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE perio_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only see their own record
CREATE POLICY "Users can view own record" ON users
  FOR SELECT USING (auth.uid() = id);

-- Admin can see all users
CREATE POLICY "Admin can view all users" ON users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Users can only see their own patients
CREATE POLICY "Users can manage own patients" ON patients
  FOR ALL USING (user_id = auth.uid());

-- Admin can see all patients
CREATE POLICY "Admin can view all patients" ON patients
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Users can only access charts for their patients
CREATE POLICY "Users can manage own patient charts" ON perio_charts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM patients WHERE id = patient_id AND user_id = auth.uid())
  );

-- Users can only access assessments for their patients
CREATE POLICY "Users can manage own patient assessments" ON assessments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM patients WHERE id = patient_id AND user_id = auth.uid())
  );

-- Only admin can manage OTP tokens
CREATE POLICY "Only admin can manage OTP" ON otp_tokens
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
  );
