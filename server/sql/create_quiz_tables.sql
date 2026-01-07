-- ============================================
-- SNS NDT E-Learning: Quiz System Tables
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create QuizQuestions table
CREATE TABLE IF NOT EXISTS "QuizQuestions" (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]',
    "correctAnswer" INTEGER NOT NULL,
    explanation TEXT,
    category VARCHAR(255) NOT NULL DEFAULT 'general',
    method VARCHAR(50),  -- NDT method: UT, RT, MT, PT, ET, VT
    level VARCHAR(50) DEFAULT 'Level I',  -- Level I, II, III
    difficulty VARCHAR(20) DEFAULT 'medium',  -- easy, medium, hard
    "LectureId" INTEGER REFERENCES "Lectures"(id) ON DELETE SET NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Create QuizAttempts table
CREATE TABLE IF NOT EXISTS "QuizAttempts" (
    id SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    method VARCHAR(50),
    level VARCHAR(50),
    "totalQuestions" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    score FLOAT NOT NULL,
    answers JSONB DEFAULT '[]',  -- Array of { questionId, selectedAnswer, isCorrect }
    "timeSpent" INTEGER,  -- Time spent in seconds
    "completedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 3. Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quizquestions_method ON "QuizQuestions"(method);
CREATE INDEX IF NOT EXISTS idx_quizquestions_level ON "QuizQuestions"(level);
CREATE INDEX IF NOT EXISTS idx_quizquestions_category ON "QuizQuestions"(category);
CREATE INDEX IF NOT EXISTS idx_quizattempts_userid ON "QuizAttempts"("UserId");
CREATE INDEX IF NOT EXISTS idx_quizattempts_method ON "QuizAttempts"(method);

-- 4. Add comments for documentation
COMMENT ON TABLE "QuizQuestions" IS 'NDT practice quiz questions for e-learning platform';
COMMENT ON TABLE "QuizAttempts" IS 'User quiz attempt history and scores';
COMMENT ON COLUMN "QuizQuestions".method IS 'NDT method: UT, RT, MT, PT, ET, VT';
COMMENT ON COLUMN "QuizQuestions".level IS 'ASNT certification level: Level I, II, III';
COMMENT ON COLUMN "QuizAttempts".answers IS 'JSON array of user answers with questionId, selectedAnswer, isCorrect';

-- ============================================
-- SEED DATA: Sample UT Level I Questions
-- ============================================

INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, category, method, level, difficulty) VALUES

-- Basic UT Concepts
('What does UT stand for in NDT?', 
 '["Ultrasonic Testing", "Universal Testing", "Ultimate Testing", "Unit Testing"]',
 0,
 'UT stands for Ultrasonic Testing, a non-destructive testing method that uses high-frequency sound waves to detect internal flaws in materials.',
 'basics', 'UT', 'Level I', 'easy'),

('What is the typical frequency range used in ultrasonic testing?',
 '["0.5 - 25 MHz", "50 - 100 Hz", "1 - 10 kHz", "100 - 500 GHz"]',
 0,
 'Ultrasonic testing typically uses frequencies between 0.5 MHz to 25 MHz. Higher frequencies provide better resolution but less penetration.',
 'physics', 'UT', 'Level I', 'easy'),

('Which type of wave is primarily used for detecting flaws in metals during UT?',
 '["Longitudinal waves", "Surface waves", "Lamb waves", "Love waves"]',
 0,
 'Longitudinal (compression) waves are primarily used for flaw detection in metals because they can travel through solid materials effectively.',
 'physics', 'UT', 'Level I', 'medium'),

('What is the near field (Fresnel zone) in ultrasonic testing?',
 '["Region near the transducer where beam intensity fluctuates", "The area behind a defect", "The far end of the test piece", "The coupling medium layer"]',
 0,
 'The near field is the region close to the transducer where the beam intensity fluctuates due to wave interference. Accurate flaw sizing is difficult in this zone.',
 'physics', 'UT', 'Level I', 'medium'),

('What is Snell''s Law used for in ultrasonic testing?',
 '["Calculating refraction angles at interfaces", "Measuring defect depth", "Determining material hardness", "Calculating sound velocity"]',
 0,
 'Snell''s Law describes the relationship between angles of incidence and refraction when sound waves pass from one medium to another with different velocities.',
 'physics', 'UT', 'Level I', 'medium'),

('What happens when the incident angle exceeds the first critical angle?',
 '["Longitudinal waves are refracted to 90° and only shear waves enter the material", "All waves are reflected", "Sound velocity doubles", "The transducer stops working"]',
 0,
 'At the first critical angle, longitudinal waves are refracted to 90° (along the surface) and only shear waves propagate into the material.',
 'physics', 'UT', 'Level I', 'hard'),

('What is the purpose of a couplant in ultrasonic testing?',
 '["To eliminate air gap between transducer and test piece", "To cool the transducer", "To increase test speed", "To color the surface"]',
 0,
 'Couplant (water, oil, gel) eliminates the air gap between the transducer and test surface, allowing efficient transmission of ultrasonic waves.',
 'techniques', 'UT', 'Level I', 'easy'),

('What type of display shows amplitude vs. time of flight?',
 '["A-scan", "B-scan", "C-scan", "D-scan"]',
 0,
 'An A-scan displays amplitude (vertical axis) versus time of flight (horizontal axis), showing signal echoes from reflectors.',
 'equipment', 'UT', 'Level I', 'easy'),

('What is the relationship between frequency and wavelength?',
 '["Higher frequency = shorter wavelength", "Higher frequency = longer wavelength", "Frequency and wavelength are independent", "They are always equal"]',
 0,
 'Wavelength = Velocity / Frequency. As frequency increases, wavelength decreases (inverse relationship).',
 'physics', 'UT', 'Level I', 'easy'),

('What is the approximate longitudinal wave velocity in steel?',
 '["5900 m/s", "1480 m/s", "3230 m/s", "340 m/s"]',
 0,
 'Steel has a longitudinal wave velocity of approximately 5900 m/s. This is important for calculating depth and timing.',
 'materials', 'UT', 'Level I', 'medium'),

-- Equipment & Calibration
('What is DAC in ultrasonic testing?',
 '["Distance Amplitude Correction", "Digital Amplitude Control", "Defect Analysis Chart", "Dual Axis Calibration"]',
 0,
 'DAC (Distance Amplitude Correction) compensates for signal loss due to beam spread and attenuation as distance increases.',
 'equipment', 'UT', 'Level I', 'medium'),

('What is the purpose of a reference block in UT?',
 '["To calibrate equipment and set sensitivity", "To clean the transducer", "To store the equipment", "To measure temperature"]',
 0,
 'Reference blocks (calibration blocks) are used to calibrate equipment, verify performance, and set appropriate sensitivity levels.',
 'calibration', 'UT', 'Level I', 'easy'),

('Which block is commonly used for angle beam calibration?',
 '["IIW block", "Step wedge", "Flat plate", "Cylinder block"]',
 0,
 'The IIW (International Institute of Welding) block is the most common calibration block for angle beam transducers.',
 'calibration', 'UT', 'Level I', 'medium'),

-- Defect Detection
('What type of reflector produces the strongest echo?',
 '["Flat reflector perpendicular to beam", "Spherical void", "Slag inclusion", "Porosity cluster"]',
 0,
 'A flat reflector oriented perpendicular to the beam produces the strongest echo because it reflects sound directly back to the transducer.',
 'defects', 'UT', 'Level I', 'medium'),

('What causes a "dead zone" in pulse-echo testing?',
 '["Initial pulse width and ring-down time", "Transducer failure", "Couplant contamination", "Material too thick"]',
 0,
 'The dead zone is caused by the initial pulse width and transducer ring-down time, during which near-surface echoes cannot be distinguished.',
 'techniques', 'UT', 'Level I', 'medium');

-- Verify insertion
SELECT COUNT(*) as total_questions FROM "QuizQuestions";
