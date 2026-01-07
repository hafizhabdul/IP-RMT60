-- =====================================================
-- NDT E-Learning Quiz Questions - Additional Methods
-- UT Level II, VT (Level I & II), ET (Level I & II)
-- Based on ASNT SNT-TC-1A and ISO 9712 standards
-- =====================================================

-- =====================================================
-- ULTRASONIC TESTING (UT) - Level II (10 Questions)
-- =====================================================

INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'The formula for calculating the near field length (N) is:',
  '["N = D²f/4V", "N = V/f", "N = λ × D", "N = D/4λ"]',
  0,
  'Near field length N = D²f/4V = D²/4λ, where D is the transducer diameter, f is frequency, V is velocity, and λ is wavelength.',
  'UT', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'According to Snell''s Law, when the incident angle increases in angle beam testing:',
  '["The refracted angle decreases", "The refracted angle increases proportionally", "Reflection increases while refraction decreases", "Wavelength changes but angle remains same"]',
  1,
  'Snell''s Law: sin(θ₁)/V₁ = sin(θ₂)/V₂. As incident angle increases, refracted angle also increases (until critical angles are reached).',
  'UT', 'Level II', 'medium', 'theory', NOW(), NOW()
),
(
  'The first critical angle in steel when using a Perspex wedge is approximately:',
  '["27°", "33°", "57°", "74°"]',
  0,
  'The first critical angle (longitudinal wave refraction at 90°) for Perspex-to-steel is approximately 27°.',
  'UT', 'Level II', 'medium', 'theory', NOW(), NOW()
),
(
  'What is the purpose of the DAC (Distance Amplitude Correction) curve?',
  '["To correct for beam spread and material attenuation at different depths", "To measure defect size directly", "To calibrate time base only", "To determine material velocity"]',
  0,
  'DAC compensates for the natural decrease in echo amplitude with distance due to beam spread and material attenuation.',
  'UT', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'When using the DGS (AVG) method, the reference reflector is:',
  '["A side-drilled hole", "A flat-bottom hole (ideal disk reflector)", "A notch", "A backwall reflection"]',
  1,
  'DGS (Distance-Gain-Size) uses theoretical response from flat-bottom holes as the reference for sizing discontinuities.',
  'UT', 'Level II', 'hard', 'technique', NOW(), NOW()
),
(
  'Beam spread angle (half angle) can be calculated using:',
  '["sin(γ) = 1.22λ/D", "sin(γ) = Kλ/D where K depends on dB drop", "γ = λ × D", "γ = N/D"]',
  1,
  'Beam spread half-angle: sin(γ) = Kλ/D, where K = 0.44 for 6dB drop, 0.56 for 10dB drop, 0.87 for 20dB drop.',
  'UT', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'What causes a "dead zone" in contact testing?',
  '["Material defects near the surface", "Pulse length and ring-down time preventing near-surface detection", "Incorrect coupling", "Wrong frequency selection"]',
  1,
  'The dead zone is caused by the transmit pulse width and transducer ring-down, which mask reflections from near-surface discontinuities.',
  'UT', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'In immersion testing, the water path distance should be selected to:',
  '["Maximize signal amplitude", "Place the front surface echo between the initial pulse and first backwall", "Minimize scan time", "Match the material thickness"]',
  1,
  'Water path is set so the front surface echo appears after the initial pulse decay and before the first expected signal of interest.',
  'UT', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'The 6 dB drop method for sizing a reflector assumes:',
  '["The reflector is smaller than the beam", "The reflector is larger than the beam", "The reflector is exactly beam size", "Reflector size is irrelevant"]',
  1,
  'The 6 dB drop sizing method assumes the reflector is larger than the beam. The probe is moved until amplitude drops 6 dB (half) from peak.',
  'UT', 'Level II', 'hard', 'technique', NOW(), NOW()
),
(
  'Transfer correction is required when:',
  '["The test material has different surface conditions than the calibration block", "Using different frequencies", "Changing operators", "Using the same equipment"]',
  0,
  'Transfer correction accounts for differences in coupling, surface finish, and curvature between the calibration block and test piece.',
  'UT', 'Level II', 'medium', 'technique', NOW(), NOW()
);

-- =====================================================
-- VISUAL TESTING (VT) - 20 Questions
-- =====================================================

-- VT Level I Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'What is the primary advantage of Visual Testing as an NDT method?',
  '["It can detect internal defects", "It is fast, economical, and can be performed without special equipment", "It works on all materials", "It provides permanent records automatically"]',
  1,
  'VT is the most fundamental and economical NDT method. It requires minimal equipment and can quickly identify surface conditions.',
  'VT', 'Level I', 'easy', 'fundamentals', NOW(), NOW()
),
(
  'The minimum light intensity required for general visual examination according to most codes is:',
  '["100 lux (10 fc)", "325 lux (30 fc)", "500 lux (50 fc)", "1000 lux (100 fc)"]',
  2,
  'Most codes require minimum 500 lux (50 foot-candles) for general visual examination, with higher levels for critical inspection.',
  'VT', 'Level I', 'medium', 'standards', NOW(), NOW()
),
(
  'Direct visual testing requires the eye to be within what distance from the surface?',
  '["150 mm (6 inches)", "300 mm (12 inches)", "600 mm (24 inches)", "1000 mm (40 inches)"]',
  2,
  'Direct VT typically requires the eye within 600 mm (24 inches) of the surface and at an angle not less than 30° to the surface.',
  'VT', 'Level I', 'easy', 'technique', NOW(), NOW()
),
(
  'Which of the following is NOT a surface discontinuity detectable by visual testing?',
  '["Cracks", "Porosity", "Subsurface inclusions", "Undercut"]',
  2,
  'VT can only detect surface-breaking or surface discontinuities. Subsurface inclusions require volumetric methods like RT or UT.',
  'VT', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'Remote visual testing (RVT) is performed using:',
  '["Magnifying glasses only", "Borescopes, fiberscopes, or video cameras", "X-ray equipment", "Fluorescent lights"]',
  1,
  'RVT uses optical aids like borescopes, fiberscopes, videoscopes, or cameras to examine areas not accessible for direct viewing.',
  'VT', 'Level I', 'easy', 'equipment', NOW(), NOW()
),
(
  'What viewing angle is generally required for direct visual examination?',
  '["Perpendicular (90°) only", "Not less than 30° to the surface", "Any angle is acceptable", "Not more than 15°"]',
  1,
  'The viewing angle should not be less than 30° to the examination surface to ensure discontinuities are visible.',
  'VT', 'Level I', 'medium', 'technique', NOW(), NOW()
),
(
  'Which welding discontinuity is characterized by a groove melted into the base metal adjacent to the weld toe?',
  '["Porosity", "Undercut", "Overlap", "Lack of fusion"]',
  1,
  'Undercut is a groove melted into the base metal adjacent to the weld toe or root, left unfilled by weld metal.',
  'VT', 'Level I', 'easy', 'interpretation', NOW(), NOW()
),
(
  'A magnifying lens used for VT typically has magnification of:',
  '["1.5X to 3X", "5X to 10X", "20X to 50X", "100X or more"]',
  0,
  'Standard magnifying lenses for VT are typically 1.5X to 3X. Higher magnification is available but limits field of view.',
  'VT', 'Level I', 'easy', 'equipment', NOW(), NOW()
),
(
  'What is the purpose of a weld gauge in visual inspection?',
  '["To measure weld temperature", "To measure weld dimensions such as size, undercut depth, and angle", "To detect internal defects", "To clean the weld surface"]',
  1,
  'Weld gauges measure fillet weld size, undercut depth, reinforcement height, weld angle, and other dimensional characteristics.',
  'VT', 'Level I', 'easy', 'equipment', NOW(), NOW()
),
(
  'Color contrast in visual inspection can be enhanced by:',
  '["Using the same color background", "Applying contrasting coatings or using proper lighting angles", "Reducing light intensity", "Using a darkened room"]',
  1,
  'Contrast can be improved through contrasting backgrounds, directional lighting, or applying developer or dye to highlight surface features.',
  'VT', 'Level I', 'medium', 'technique', NOW(), NOW()
);

-- VT Level II Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'According to AWS D1.1, the maximum allowable undercut depth in non-tubular structures for material less than 1 inch thick is:',
  '["1/64 inch (0.4 mm)", "1/32 inch (0.8 mm)", "1/16 inch (1.6 mm)", "No undercut allowed"]',
  1,
  'AWS D1.1 allows undercut up to 1/32" for materials less than 1" thick, provided total length is limited.',
  'VT', 'Level II', 'hard', 'standards', NOW(), NOW()
),
(
  'For critical inspections, the minimum light intensity at the examination surface should be:',
  '["500 lux (50 fc)", "1000 lux (100 fc)", "2000 lux (200 fc)", "3000 lux (300 fc)"]',
  1,
  'Critical inspections typically require 1000 lux (100 fc) minimum, with some specifications requiring up to 2000 lux.',
  'VT', 'Level II', 'medium', 'standards', NOW(), NOW()
),
(
  'Overlap in a weld is defined as:',
  '["Insufficient weld penetration", "Weld metal extending beyond the toe without fusing", "Excessive weld reinforcement", "A gap between weld passes"]',
  1,
  'Overlap occurs when weld metal extends beyond the weld toe and lies on the base metal surface without proper fusion.',
  'VT', 'Level II', 'medium', 'interpretation', NOW(), NOW()
),
(
  'The term "arc strike" refers to:',
  '["A lightning strike during welding", "Localized remelting of base metal from accidental electrode contact", "The start of a weld bead", "Excessive spatter"]',
  1,
  'Arc strikes are localized points of surface melting caused by accidental electrode contact that can create hard spots and cracks.',
  'VT', 'Level II', 'medium', 'interpretation', NOW(), NOW()
),
(
  'A borescope with a 90° viewing direction is best suited for:',
  '["Viewing straight ahead", "Viewing perpendicular to the probe axis (side viewing)", "Long-distance viewing", "Underwater inspection"]',
  1,
  'A 90° borescope views perpendicular to the insertion axis, useful for examining tube/pipe walls or cavity sides.',
  'VT', 'Level II', 'medium', 'equipment', NOW(), NOW()
),
(
  'What is the minimum visual acuity required for VT personnel according to most codes?',
  '["20/20 vision uncorrected", "Jaeger J1 or J2 at not less than 12 inches", "Ability to see colors", "No specific requirement"]',
  1,
  'Most codes require near vision acuity to read Jaeger J1 or J2 (equivalent to Times Roman 4.5 point) at minimum 12" distance.',
  'VT', 'Level II', 'medium', 'standards', NOW(), NOW()
),
(
  'Laminations in plate material are typically oriented:',
  '["Perpendicular to the rolling direction", "Parallel to the rolling direction (plate surface)", "At 45° to the surface", "Randomly in all directions"]',
  1,
  'Laminations are planar discontinuities parallel to the rolled surface, formed from inclusions elongated during rolling.',
  'VT', 'Level II', 'medium', 'interpretation', NOW(), NOW()
),
(
  'When using a videoscope for RVT, minimum image resolution should be:',
  '["100 × 100 pixels", "400 × 400 pixels", "640 × 480 pixels or higher", "No minimum requirement"]',
  2,
  'Video inspection systems should have sufficient resolution (typically 640 × 480 or higher) to clearly identify relevant discontinuities.',
  'VT', 'Level II', 'medium', 'equipment', NOW(), NOW()
),
(
  'The term "incomplete fusion" in weld inspection refers to:',
  '["Lack of fusion between weld passes or between weld and base metal", "A weld that is too short", "Excessive spatter", "Undercut at the toe"]',
  0,
  'Incomplete fusion (lack of fusion) is a failure of the weld metal to completely fuse with the base metal or previous weld pass.',
  'VT', 'Level II', 'medium', 'interpretation', NOW(), NOW()
),
(
  'What documentation is typically required for VT inspection reports?',
  '["Only pass/fail status", "Detailed description of examination area, lighting, discontinuities found, and acceptance criteria", "Just the inspector signature", "Photographic evidence only"]',
  1,
  'VT reports should include inspection conditions, equipment used, area examined, all discontinuities found, and acceptance determination.',
  'VT', 'Level II', 'medium', 'standards', NOW(), NOW()
);

-- =====================================================
-- EDDY CURRENT TESTING (ET) - 20 Questions
-- =====================================================

-- ET Level I Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'Eddy Current Testing is based on the principle of:',
  '["Capillary action", "Electromagnetic induction", "Sound wave propagation", "Radiation absorption"]',
  1,
  'ET uses electromagnetic induction: an AC coil induces eddy currents in conductive materials. Discontinuities disturb these currents.',
  'ET', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'Eddy currents can only be induced in materials that are:',
  '["Ferromagnetic", "Electrically conductive", "Non-metallic", "Transparent"]',
  1,
  'Eddy currents require electrical conductivity. Both ferromagnetic and non-ferromagnetic metals can be tested if conductive.',
  'ET', 'Level I', 'easy', 'theory', NOW(), NOW()
),
(
  'What is the primary advantage of Eddy Current Testing?',
  '["Can detect deep internal defects", "High speed, non-contact inspection of surface and near-surface conditions", "Works on all materials", "Provides 3D images"]',
  1,
  'ET is fast, requires no couplant, and excels at detecting surface and near-surface discontinuities in conductive materials.',
  'ET', 'Level I', 'easy', 'fundamentals', NOW(), NOW()
),
(
  'The skin effect in eddy current testing causes:',
  '["Uniform current distribution throughout material", "Current density to be highest at the surface and decrease with depth", "Increased penetration at higher frequencies", "No effect on testing"]',
  1,
  'Skin effect causes eddy current density to be maximum at the surface and decrease exponentially with depth.',
  'ET', 'Level I', 'medium', 'theory', NOW(), NOW()
),
(
  'To increase the depth of penetration in ET, you should:',
  '["Increase the test frequency", "Decrease the test frequency", "Increase the coil diameter", "Use a stronger magnetic field"]',
  1,
  'Lower frequency results in deeper penetration (greater standard depth of penetration) but reduced sensitivity to small surface defects.',
  'ET', 'Level I', 'medium', 'technique', NOW(), NOW()
),
(
  'Which type of probe is typically used for surface crack detection?',
  '["Encircling coil", "Bobbin probe", "Surface/pancake probe", "Through-transmission probe"]',
  2,
  'Surface (pancake) probes are designed for scanning surfaces to detect cracks and other surface-breaking discontinuities.',
  'ET', 'Level I', 'easy', 'equipment', NOW(), NOW()
),
(
  'What is the purpose of the reference standard in ET?',
  '["To generate the test signal", "To calibrate the instrument and establish sensitivity to known discontinuities", "To shield the probe", "To cool the equipment"]',
  1,
  'Reference standards with known artificial discontinuities (notches, holes) establish sensitivity and phase response for the specific test.',
  'ET', 'Level I', 'medium', 'technique', NOW(), NOW()
),
(
  'Lift-off in eddy current testing refers to:',
  '["The distance between probe and test surface", "Removal of the probe after testing", "The frequency of testing", "Type of defect detected"]',
  0,
  'Lift-off is the distance (air gap) between the probe and the test surface. Variations cause unwanted signals that must be managed.',
  'ET', 'Level I', 'medium', 'theory', NOW(), NOW()
),
(
  'ET is commonly used to inspect:',
  '["Heat exchanger tubes", "Ceramic components", "Wooden structures", "Concrete beams"]',
  0,
  'ET is widely used for heat exchanger and condenser tube inspection because it is fast and effective for detecting wall thinning and cracks.',
  'ET', 'Level I', 'easy', 'applications', NOW(), NOW()
),
(
  'The impedance plane display shows:',
  '["A photograph of the defect", "The relationship between resistance and reactance components of the coil impedance", "Material temperature", "Probe position"]',
  1,
  'The impedance plane (XY) display plots coil resistance vs. reactance, allowing phase analysis to distinguish different signal sources.',
  'ET', 'Level I', 'medium', 'equipment', NOW(), NOW()
);

-- ET Level II Questions (10)
INSERT INTO "QuizQuestions" (question, options, "correctAnswer", explanation, method, level, difficulty, category, "createdAt", "updatedAt")
VALUES
(
  'The standard depth of penetration (δ) is the depth at which eddy current density has decreased to:',
  '["50% of surface value", "37% (1/e) of surface value", "10% of surface value", "1% of surface value"]',
  1,
  'Standard depth of penetration is where current density equals 1/e (approximately 37%) of the surface value.',
  'ET', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'The formula for standard depth of penetration is:',
  '["δ = 1/√(πfμσ)", "δ = f × μ × σ", "δ = πfμσ", "δ = √(f/μσ)"]',
  0,
  'Standard depth of penetration δ = 1/√(πfμσ), where f = frequency, μ = permeability, σ = conductivity.',
  'ET', 'Level II', 'hard', 'theory', NOW(), NOW()
),
(
  'Fill factor in bobbin coil testing affects:',
  '["Signal amplitude - higher fill factor gives stronger signals", "Test frequency only", "Probe color", "Cable length requirements"]',
  0,
  'Fill factor (ratio of tube diameter to coil diameter) affects sensitivity. Higher fill factor gives stronger signals from discontinuities.',
  'ET', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'Phase analysis in ET is used to:',
  '["Increase test speed", "Distinguish between different types of discontinuities and material variations", "Reduce noise", "Calibrate frequency"]',
  1,
  'Different discontinuity types, depths, and material variables produce signals at different phase angles, enabling discrimination.',
  'ET', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'In ferromagnetic tube testing, magnetization to saturation is performed to:',
  '["Increase test speed", "Eliminate the permeability effect that would mask other signals", "Magnetize defects", "Reduce eddy currents"]',
  1,
  'Saturating ferromagnetic materials eliminates variable permeability effects, allowing the eddy currents to respond to other variables.',
  'ET', 'Level II', 'hard', 'technique', NOW(), NOW()
),
(
  'Multi-frequency ET is used to:',
  '["Test faster", "Suppress unwanted signals (e.g., support plate signals in heat exchanger tubes)", "Increase defect size", "Reduce equipment cost"]',
  1,
  'Multi-frequency techniques allow mixing of channels at different frequencies to cancel unwanted signals while retaining defect signals.',
  'ET', 'Level II', 'hard', 'technique', NOW(), NOW()
),
(
  'When using an encircling coil, the most sensitive area for defect detection is:',
  '["The center of the tube/bar", "At the surface, directly under the coil windings", "Throughout the entire cross-section", "Only at the ends"]',
  1,
  'Encircling coils are most sensitive to discontinuities at or near the outer surface directly beneath the coil windings.',
  'ET', 'Level II', 'medium', 'technique', NOW(), NOW()
),
(
  'The operating point on the impedance plane should be selected to:',
  '["Maximize lift-off signal", "Obtain best phase separation between lift-off and discontinuity signals", "Minimize all signals", "Match the calibration frequency"]',
  1,
  'Operating point (frequency) is selected to give optimal phase angle separation between lift-off effects and discontinuity signals.',
  'ET', 'Level II', 'hard', 'technique', NOW(), NOW()
),
(
  'Remote field eddy current testing (RFET) is particularly useful for:',
  '["Surface inspection only", "Detecting both ID and OD discontinuities in ferromagnetic tubes from inside", "Non-conductive materials", "High-frequency applications"]',
  1,
  'RFET can detect both inside and outside wall discontinuities in ferromagnetic tubes without magnetization, from internal access.',
  'ET', 'Level II', 'hard', 'applications', NOW(), NOW()
),
(
  'Conductivity variations due to heat treatment can be:',
  '["Not detected by ET", "Detected and used for material sorting/verification", "Only detected at very high frequencies", "Eliminated by proper calibration"]',
  1,
  'ET is sensitive to conductivity changes from heat treatment, alloy variations, and temper, making it useful for material sorting.',
  'ET', 'Level II', 'medium', 'applications', NOW(), NOW()
);
