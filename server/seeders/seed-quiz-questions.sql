-- =====================================================
-- NDT E-Learning Quiz Questions Seed Data
-- Methods: MT, PT, RT (20 questions each)
-- Levels: Level I (10), Level II (10) per method
-- Based on ASNT SNT-TC-1A and ISO 9712 standards
-- =====================================================

-- =====================================================
-- MAGNETIC PARTICLE TESTING (MT) - 20 Questions
-- =====================================================

-- MT Level I Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'What is the primary purpose of Magnetic Particle Testing (MT)?',
  '["To detect internal volumetric flaws", "To detect surface and near-surface discontinuities in ferromagnetic materials", "To measure material thickness", "To determine chemical composition"]',
  1,
  'MT is specifically designed to detect surface and near-surface discontinuities in ferromagnetic materials by using magnetic fields and ferromagnetic particles.',
  'MT', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'Which type of material can be tested using Magnetic Particle Testing?',
  '["Aluminum alloys", "Ferromagnetic materials only", "All metals", "Plastics and composites"]',
  1,
  'MT only works on ferromagnetic materials such as iron, nickel, cobalt, and their alloys because these materials can be magnetized.',
  'MT', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'What happens when magnetic flux lines encounter a discontinuity at the surface?',
  '["They pass through unchanged", "They are absorbed by the discontinuity", "They leak out of the material surface", "They reverse direction"]',
  2,
  'When magnetic flux lines encounter a discontinuity, they leak out of the material surface creating a flux leakage field that attracts magnetic particles.',
  'MT', 'Level I', 'medium', 'theory', NOW(), NOW()
),
(
  'Which of the following is a dry MT particle application method?',
  '["Spraying particles suspended in oil", "Dusting powder directly on the surface", "Immersing the part in a bath", "Brushing on a slurry"]',
  1,
  'Dry MT uses finely divided ferromagnetic particles that are dusted or blown onto the magnetized surface.',
  'MT', 'Level I', 'easy', 'technique', NOW(), NOW()
),
(
  'The AC yoke is most effective for detecting which type of discontinuity?',
  '["Deep subsurface cracks", "Surface breaking cracks", "Internal porosity", "Inclusions at depth"]',
  1,
  'AC yokes produce a magnetic field concentrated at the surface, making them most effective for detecting surface breaking discontinuities.',
  'MT', 'Level I', 'medium', 'equipment', NOW(), NOW()
),
(
  'What color background is typically used with fluorescent MT particles?',
  '["White background under normal light", "Dark background under UV-A light", "Red background under white light", "Any color background"]',
  1,
  'Fluorescent particles are viewed under UV-A (black light) with a dark background to provide maximum contrast and visibility.',
  'MT', 'Level I', 'easy', 'technique', NOW(), NOW()
),
(
  'Which magnetization technique uses two probes placed on the part?',
  '["Yoke method", "Prod method", "Central conductor method", "Coil method"]',
  1,
  'The prod method uses two hand-held probes (prods) that are placed directly on the test surface to induce a circular magnetic field between them.',
  'MT', 'Level I', 'easy', 'equipment', NOW(), NOW()
),
(
  'What is the minimum recommended light intensity for examining parts using visible MT particles?',
  '["100 lux (10 fc)", "500 lux (50 fc)", "1000 lux (100 fc)", "50 lux (5 fc)"]',
  2,
  'ASNT standards recommend a minimum of 1000 lux (100 foot-candles) of visible light when using visible (non-fluorescent) particles.',
  'MT', 'Level I', 'medium', 'standards', NOW(), NOW()
),
(
  'What is the purpose of demagnetization after MT inspection?',
  '["To improve the appearance of the part", "To remove residual magnetism that may affect part performance or subsequent operations", "To increase particle adhesion", "To prepare for painting"]',
  1,
  'Residual magnetism can interfere with machining, welding, or part operation, so demagnetization is performed after inspection.',
  'MT', 'Level I', 'medium', 'technique', NOW(), NOW()
),
(
  'Which particle type provides better sensitivity for fine cracks?',
  '["Large particles", "Dry particles only", "Wet method particles", "Colored particles"]',
  2,
  'Wet method particles are finer and more mobile, providing better sensitivity for detecting fine surface cracks.',
  'MT', 'Level I', 'medium', 'technique', NOW(), NOW()
);

-- MT Level II Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'According to ASNT SNT-TC-1A, what is the minimum UV-A intensity required for fluorescent MT at the examination surface?',
  '["500 µW/cm²", "1000 µW/cm²", "1500 µW/cm²", "2000 µW/cm²"]',
  1,
  'ASNT SNT-TC-1A requires a minimum UV-A intensity of 1000 µW/cm² (microwatts per square centimeter) at the examination surface for fluorescent MT.',
  'MT', 'Level II', 'hard', 'standards', NOW(), NOW()
),
(
  'What is the formula for calculating magnetizing force (H) using the prod method?',
  '["H = NI/L", "H = I/(π × spacing)", "H = I × turns", "H = B/µ"]',
  1,
  'For the prod method, the field strength can be approximated by H = I/(π × d), where I is current and d is prod spacing.',
  'MT', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'When performing circular magnetization on a hollow part, why is a central conductor used?',
  '["To reduce current requirements", "To create a uniform circular field through the wall thickness", "To prevent arcing", "To speed up the inspection"]',
  1,
  'A central conductor creates a more uniform circular magnetic field through the wall of hollow parts compared to direct contact.',
  'MT', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'What is the recommended prod spacing for field MT inspection of welds?',
  '["50-100 mm (2-4 inches)", "150-200 mm (6-8 inches)", "250-300 mm (10-12 inches)", "Any spacing is acceptable"]',
  1,
  'Typical prod spacing is 150-200 mm (6-8 inches) to ensure adequate field strength between the prods for weld inspection.',
  'MT', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'Half-wave rectified DC (HWDC) produces stronger indications than full-wave DC because:',
  '["It has higher peak amperage", "It provides pulsating current that aids particle mobility", "It is safer to use", "It requires less power"]',
  1,
  'HWDC produces a pulsating field that helps move particles into position while still providing a directional field, giving stronger indications.',
  'MT', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'For longitudinal magnetization using a coil, the formula for calculating field strength is:',
  '["H = NI/L", "H = I/d", "H = 2πI/L", "H = B × A"]',
  0,
  'The Ampere-turn formula H = NI/L is used for coil magnetization, where N is the number of turns, I is current, and L is the effective length.',
  'MT', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'What is the maximum acceptable ambient visible light for fluorescent MT examination?',
  '["50 lux (5 fc)", "20 lux (2 fc)", "100 lux (10 fc)", "No limit"]',
  1,
  'According to ASNT, ambient visible light should not exceed 20 lux (2 foot-candles) during fluorescent MT examination to ensure proper contrast.',
  'MT', 'Level II', 'medium', 'standards', NOW(), NOW()
),
(
  'Which discontinuity orientation relative to the magnetic field will produce the strongest indication?',
  '["Parallel to the field", "Perpendicular to the field", "At 45 degrees to the field", "Orientation does not matter"]',
  1,
  'Discontinuities perpendicular (90°) to the magnetic field lines produce the strongest flux leakage and therefore the most pronounced indications.',
  'MT', 'Level II', 'medium', 'theory', NOW(), NOW()
),
(
  'The Ketos ring (tool steel ring) is used to verify:',
  '["UV light intensity", "System sensitivity and particle performance", "Magnetic field strength only", "Surface cleanliness"]',
  1,
  'The Ketos ring is a test piece with manufactured holes at various depths used to verify the overall MT system sensitivity, including equipment and particles.',
  'MT', 'Level II', 'medium', 'standards', NOW(), NOW()
),
(
  'When inspecting a part with both transverse and longitudinal discontinuities, the recommended approach is:',
  '["Use only circular magnetization", "Use only longitudinal magnetization", "Apply magnetization in at least two directions approximately 90° apart", "Higher current eliminates the need for multiple directions"]',
  2,
  'Two-directional magnetization (circular and longitudinal, approximately 90° apart) ensures detection of discontinuities regardless of their orientation.',
  'MT', 'Level II', 'medium', 'technique', NOW(), NOW()
);

-- =====================================================
-- PENETRANT TESTING (PT) - 20 Questions
-- =====================================================

-- PT Level I Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'What is the primary purpose of Liquid Penetrant Testing?',
  '["To detect internal defects", "To detect surface-breaking discontinuities", "To measure material hardness", "To determine material composition"]',
  1,
  'PT is designed specifically to detect surface-breaking discontinuities on non-porous materials by capillary action of the penetrant.',
  'PT', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'What physical property allows penetrant to enter surface discontinuities?',
  '["Gravity", "Capillary action", "Magnetic attraction", "Chemical reaction"]',
  1,
  'Capillary action is the physical phenomenon that draws penetrant into fine surface openings, regardless of orientation.',
  'PT', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'What is the purpose of the dwell time during penetrant testing?',
  '["To allow the penetrant to dry", "To allow sufficient time for penetrant to enter discontinuities", "To let the developer work", "To cool the part"]',
  1,
  'Dwell time (penetration time) is the period allowed for the penetrant to seep into discontinuities by capillary action.',
  'PT', 'Level I', 'easy', 'technique', NOW(), NOW()
),
(
  'Why is pre-cleaning important before penetrant application?',
  '["To make the part look better", "To remove contaminants that could block penetrant entry or cause false indications", "To heat the part", "It is not important"]',
  1,
  'Pre-cleaning removes oils, dirt, paint, and other contaminants that could block penetrant entry or interfere with the examination.',
  'PT', 'Level I', 'easy', 'technique', NOW(), NOW()
),
(
  'What is the function of the developer in penetrant testing?',
  '["To clean the surface", "To draw penetrant from discontinuities and provide contrast background", "To remove excess penetrant", "To prevent corrosion"]',
  1,
  'Developer draws entrapped penetrant back to the surface by reverse capillary action and provides a contrasting background for indication visibility.',
  'PT', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'Which type of penetrant uses ultraviolet light for examination?',
  '["Visible dye penetrant", "Fluorescent penetrant", "White contrast penetrant", "Color contrast penetrant"]',
  1,
  'Fluorescent penetrants contain dyes that fluoresce under UV-A light, providing high visibility in darkened conditions.',
  'PT', 'Level I', 'easy', 'technique', NOW(), NOW()
),
(
  'What color is typically used for visible dye penetrants?',
  '["Blue", "Red or pink", "Green", "Yellow"]',
  1,
  'Red or pink dyes are most commonly used because they provide good contrast against the white developer background.',
  'PT', 'Level I', 'easy', 'technique', NOW(), NOW()
),
(
  'The minimum surface temperature for most penetrant testing is:',
  '["0°C (32°F)", "5°C (40°F)", "10°C (50°F)", "20°C (68°F)"]',
  2,
  'Most penetrant manufacturers specify a minimum surface temperature of 10°C (50°F) for proper penetrant performance.',
  'PT', 'Level I', 'medium', 'standards', NOW(), NOW()
),
(
  'Over-washing during excess penetrant removal can result in:',
  '["Stronger indications", "Missed discontinuities due to removal of entrapped penetrant", "Faster inspection", "Better sensitivity"]',
  1,
  'Excessive washing can remove penetrant from shallow discontinuities, causing them to be missed during examination.',
  'PT', 'Level I', 'medium', 'technique', NOW(), NOW()
),
(
  'Which developer type is applied as a dry powder?',
  '["Type 1 - Dry powder", "Type 2 - Water soluble", "Type 3 - Water suspendible", "Type 4 - Nonaqueous"]',
  0,
  'Type 1 developer is a dry powder that is dusted or applied in a powder chamber onto dry surfaces.',
  'PT', 'Level I', 'medium', 'technique', NOW(), NOW()
);

-- PT Level II Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'According to ASTM E1417, what is the minimum recommended penetrant dwell time for aluminum alloys (Type I, Method A)?',
  '["5 minutes", "10 minutes", "20 minutes", "30 minutes"]',
  0,
  'ASTM E1417 recommends a minimum 5-minute dwell time for aluminum alloys using Type I (fluorescent), Method A (water washable) penetrant.',
  'PT', 'Level II', 'medium', 'standards', NOW(), NOW()
),
(
  'What determines the sensitivity level of a penetrant system?',
  '["Penetrant color only", "Combination of penetrant type, application method, and developer type", "Developer thickness", "Wash time only"]',
  1,
  'Penetrant sensitivity is determined by the complete system, including penetrant type, removal method, and developer type working together.',
  'PT', 'Level II', 'medium', 'theory', NOW(), NOW()
),
(
  'Why should solvent-based developer not be applied in heavy coats?',
  '["It is expensive", "Heavy application can mask indications and reduce sensitivity", "It takes too long to dry", "It is dangerous"]',
  1,
  'Heavy coats of nonaqueous developer can fill small discontinuities and mask fine indications, reducing examination sensitivity.',
  'PT', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'What is the purpose of a hydrophilic emulsifier?',
  '["To make penetrant visible", "To render excess oil-based penetrant water-washable through dipping or immersion", "To develop indications", "To clean the surface before testing"]',
  1,
  'Hydrophilic emulsifiers are water-based and work by emulsifying excess lipophilic (oil-based) penetrant, making it removable with water.',
  'PT', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'Post-emulsification (Method D) penetrant systems offer:',
  '["Faster processing", "Greater sensitivity and control over removal", "Lower cost", "Simpler procedure"]',
  1,
  'Post-emulsification systems offer higher sensitivity because the emulsification step is controlled separately from the penetrant application.',
  'PT', 'Level II', 'medium', 'theory', NOW(), NOW()
),
(
  'The maximum temperature limit for most conventional fluorescent penetrants is approximately:',
  '["50°C (122°F)", "65°C (150°F)", "80°C (176°F)", "100°C (212°F)"]',
  0,
  'Most standard fluorescent penetrants have a maximum temperature limit around 50°C (122°F). High-temperature penetrants are available for higher temperatures.',
  'PT', 'Level II', 'medium', 'standards', NOW(), NOW()
),
(
  'What causes a "false indication" in penetrant testing?',
  '["Actual discontinuities", "Non-relevant indications from surface conditions, geometry, or processing", "Incorrect penetrant color", "Wrong developer"]',
  1,
  'False indications are non-relevant indications caused by surface roughness, geometry, prior contamination, or processing marks rather than actual defects.',
  'PT', 'Level II', 'medium', 'interpretation', NOW(), NOW()
),
(
  'According to AMS 2644, what system sensitivity level is typically required for aerospace components?',
  '["Level 1 or 2", "Level 3 or 4", "Any level", "Level 1 only"]',
  1,
  'Aerospace applications typically require Level 3 or Level 4 sensitivity penetrant systems per AMS 2644 for critical components.',
  'PT', 'Level II', 'hard', 'standards', NOW(), NOW()
),
(
  'Chromate panels (PSM-5 or equivalent) are used to verify:',
  '["UV light intensity", "System sensitivity and proper processing", "Surface temperature", "Developer thickness"]',
  1,
  'Chromate panels with artificial defects verify the entire PT system performance, including penetrant sensitivity and proper processing techniques.',
  'PT', 'Level II', 'medium', 'standards', NOW(), NOW()
),
(
  'The "bleed-out" of a penetrant indication refers to:',
  '["Penetrant leaking from the container", "Spreading of indication as penetrant is drawn from the discontinuity by developer", "Excessive washing", "Penetrant evaporation"]',
  1,
  'Bleed-out describes the spreading of the indication over time as developer draws more penetrant out of the discontinuity.',
  'PT', 'Level II', 'medium', 'interpretation', NOW(), NOW()
);

-- =====================================================
-- RADIOGRAPHIC TESTING (RT) - 20 Questions
-- =====================================================

-- RT Level I Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'What is the primary purpose of Radiographic Testing?',
  '["To detect surface cracks only", "To detect internal and surface discontinuities using penetrating radiation", "To measure hardness", "To determine chemical composition"]',
  1,
  'RT uses penetrating radiation (X-rays or gamma rays) to detect internal and surface discontinuities in materials.',
  'RT', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'Which two types of radiation sources are commonly used in industrial radiography?',
  '["UV and infrared", "X-rays and gamma rays", "Alpha and beta particles", "Microwaves and radio waves"]',
  1,
  'Industrial radiography primarily uses X-rays (from X-ray tubes) and gamma rays (from radioactive isotopes like Ir-192 or Co-60).',
  'RT', 'Level I', 'easy', 'equipment', NOW(), NOW()
),
(
  'What is the term for the permanent image produced on radiographic film?',
  '["Photograph", "Radiograph", "Blueprint", "X-ray image"]',
  1,
  'A radiograph is the permanent image on the film showing the internal structure of the examined object.',
  'RT', 'Level I', 'easy', 'terminology', NOW(), NOW()
),
(
  'What film characteristic indicates how much the film has darkened?',
  '["Resolution", "Density (darkness)", "Sensitivity", "Contrast"]',
  1,
  'Film density measures the degree of darkness on the processed radiograph; higher density means more radiation exposure.',
  'RT', 'Level I', 'easy', 'film', NOW(), NOW()
),
(
  'Why are lead screens used in radiography?',
  '["To improve image sharpness and reduce scatter radiation effects", "To protect the film from damage", "To color the image", "To speed up processing"]',
  0,
  'Lead screens intensify the image by adding electrons to the exposure while absorbing scatter radiation that would reduce contrast.',
  'RT', 'Level I', 'medium', 'technique', NOW(), NOW()
),
(
  'What safety device is required when working in a radiation area?',
  '["Gloves only", "Personal dosimeter (film badge or TLD)", "Hard hat", "Safety glasses"]',
  1,
  'Personal dosimeters (film badges, TLDs, or electronic dosimeters) are mandatory to monitor and record personal radiation exposure.',
  'RT', 'Level I', 'easy', 'safety', NOW(), NOW()
),
(
  'Image Quality Indicators (IQIs) are placed on the radiograph to:',
  '["Identify the technician", "Verify radiographic technique quality and sensitivity", "Mark defect locations", "Measure film size"]',
  1,
  'IQIs (penetrameters) demonstrate that the radiographic technique has adequate sensitivity to detect the required discontinuity size.',
  'RT', 'Level I', 'medium', 'technique', NOW(), NOW()
),
(
  'What causes geometric unsharpness (Ug) in radiography?',
  '["Film grain", "Finite size of the radiation source", "Scatter radiation", "Film processing"]',
  1,
  'Geometric unsharpness is caused by the penumbra effect from a finite-sized radiation source, creating fuzzy edges.',
  'RT', 'Level I', 'medium', 'theory', NOW(), NOW()
),
(
  'Which isotope is commonly used for field radiography of steel welds up to about 75mm thick?',
  '["Cobalt-60", "Iridium-192", "Cesium-137", "Thulium-170"]',
  1,
  'Iridium-192 is widely used for field radiography of steel welds because of its suitable energy range and practical half-life.',
  'RT', 'Level I', 'medium', 'equipment', NOW(), NOW()
),
(
  'The areas on a radiograph that appear lighter (less dense) indicate:',
  '["More radiation reached the film", "Less radiation reached the film (thicker or denser material)", "Film defects", "Improper development"]',
  1,
  'Lighter areas indicate less radiation exposure, typically from thicker material or denser inclusions that absorbed more radiation.',
  'RT', 'Level I', 'medium', 'interpretation', NOW(), NOW()
);

-- RT Level II Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'The formula for geometric unsharpness (Ug) is:',
  '["Ug = F × t / d", "Ug = F × OFD / SOD", "Ug = SFD / F", "Ug = t / F"]',
  1,
  'Geometric unsharpness Ug = F × OFD / SOD, where F is source size, OFD is object-to-film distance, and SOD is source-to-object distance.',
  'RT', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'According to ASME Section V, the minimum required density for single-wall viewing technique is:',
  '["1.0", "1.8", "2.0", "2.5"]',
  1,
  'ASME Section V requires minimum film density of 1.8 for X-rays and 2.0 for gamma rays in the area of interest.',
  'RT', 'Level II', 'medium', 'standards', NOW(), NOW()
),
(
  'The half-value layer (HVL) is:',
  '["The distance at which radiation intensity doubles", "The thickness of material that reduces radiation intensity by half", "Half the source-to-film distance", "Half the exposure time"]',
  1,
  'HVL is the thickness of a specific material required to reduce the radiation intensity to half its original value.',
  'RT', 'Level II', 'medium', 'theory', NOW(), NOW()
),
(
  'To improve radiographic contrast, you should:',
  '["Increase kV", "Decrease kV (lower energy radiation)", "Use thinner screens", "Increase scatter"]',
  1,
  'Lower kV produces higher contrast because lower energy radiation is more readily absorbed by variations in material thickness.',
  'RT', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'The inverse square law states that radiation intensity:',
  '["Increases with distance", "Decreases inversely with the square of distance", "Remains constant", "Decreases linearly with distance"]',
  1,
  'The inverse square law: I₂ = I₁ × (D₁/D₂)². Doubling the distance reduces intensity to 1/4.',
  'RT', 'Level II', 'medium', 'theory', NOW(), NOW()
),
(
  'A 2-2T hole-type IQI indicates:',
  '["2% sensitivity is achievable", "The penetrameter is 2% of specimen thickness and the 2T hole should be visible", "Double exposure technique", "Two IQIs are required"]',
  1,
  'In a 2-2T designation, the IQI is 2% of the specimen thickness, and the 2T hole (diameter = 2× thickness of IQI) must be visible.',
  'RT', 'Level II', 'hard', 'standards', NOW(), NOW()
),
(
  'Computed radiography (CR) uses what type of detector?',
  '["Silver halide film", "Imaging plates with photostimulable phosphors", "Scintillator crystals", "Gas ionization chambers"]',
  1,
  'CR uses imaging plates coated with photostimulable phosphors (typically europium-doped barium fluorohalide) that store the latent image.',
  'RT', 'Level II', 'medium', 'equipment', NOW(), NOW()
),
(
  'Cobalt-60 has a half-life of approximately:',
  '["74 days", "5.27 years", "30 years", "1600 years"]',
  1,
  'Cobalt-60 has a half-life of approximately 5.27 years, requiring source activity recalculation for exposure times.',
  'RT', 'Level II', 'medium', 'equipment', NOW(), NOW()
),
(
  'Back scatter radiation is detected by placing a lead letter:',
  '["On the film side of the specimen", "On the source side of the cassette", "Inside the cassette", "On the back of the cassette"]',
  3,
  'A lead letter "B" is placed on the back of the cassette. If a light image of "B" appears on the radiograph, excessive backscatter exists.',
  'RT', 'Level II', 'hard', 'technique', NOW(), NOW()
),
(
  'The minimum SFD (Source-to-Film Distance) is primarily determined by:',
  '["Film size", "Required geometric unsharpness and source size", "Exposure time limits", "Safety considerations only"]',
  1,
  'Minimum SFD is calculated based on allowable geometric unsharpness (Ug) and source size: SFD ≥ F × OFD / Ug(max).',
  'RT', 'Level II', 'hard', 'technique', NOW(), NOW()
);

-- Update QuizHub method info where needed (optional update statement)
-- This ensures the QuizHub displays correct question counts
