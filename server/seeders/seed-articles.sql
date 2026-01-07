-- =====================================================
-- NDT E-Learning Articles Seed Data
-- Methods: MT, PT, RT (Comprehensive articles)
-- Based on ASNT SNT-TC-1A and ISO 9712 standards
-- =====================================================

-- =====================================================
-- MAGNETIC PARTICLE TESTING (MT) ARTICLES
-- =====================================================

INSERT INTO "Articles" (title, slug, excerpt, content, method, level, category, "readingTime", published, featured, "viewCount", "createdAt", "updatedAt")
VALUES
(
  'Introduction to Magnetic Particle Testing',
  'introduction-to-magnetic-particle-testing',
  'Learn the fundamentals of Magnetic Particle Testing (MT), including basic principles, applications, and why it is essential for detecting surface and near-surface defects in ferromagnetic materials.',
  '# Introduction to Magnetic Particle Testing

Magnetic Particle Testing (MT) is one of the most widely used non-destructive testing methods for detecting surface and near-surface discontinuities in ferromagnetic materials.

## What is Magnetic Particle Testing?

MT uses magnetic fields and small magnetic particles to detect flaws. When a ferromagnetic material is magnetized, discontinuities that lie at an angle to the magnetic field create **flux leakage fields** at and above the surface. These flux leakage fields attract finely divided magnetic particles, forming visible indications.

## Key Advantages of MT

- **High sensitivity** to surface-breaking cracks
- **Fast inspection** process
- **Portable equipment** available for field use
- **Relatively low cost** compared to other NDT methods
- **Easy to interpret** results with proper training

## Materials That Can Be Tested

MT only works on **ferromagnetic materials**, including:

- Iron and steel (carbon steel, alloy steel)
- Nickel alloys (some grades)
- Cobalt alloys
- Some stainless steels (martensitic, ferritic)

> **Important:** Austenitic stainless steels, aluminum, copper, and titanium are NOT ferromagnetic and cannot be tested with MT.

## Types of Discontinuities Detected

MT excels at detecting:

1. **Surface cracks** - fatigue cracks, stress corrosion cracks
2. **Laps and seams** - from manufacturing processes
3. **Inclusions** - near the surface
4. **Porosity** - if surface-connected
5. **Lack of fusion** - in welds

## Basic Principle

The basic principle involves three steps:

1. **Magnetization** - Create a magnetic field in the test piece
2. **Particle Application** - Apply magnetic particles (dry or wet)
3. **Interpretation** - Examine particle patterns for indications

## Industry Standards

MT is governed by several standards:

- **ASNT SNT-TC-1A** - Personnel qualification
- **ASTM E1444** - Standard practice for MT
- **ASTM E709** - Guide for MT
- **ISO 9934** - MT general principles

## Applications

MT is used extensively in:

- Aerospace components
- Automotive parts
- Welded structures
- Pressure vessels
- Oil and gas pipelines
- Power generation equipment

This method remains an essential tool in quality control and maintenance programs worldwide.',
  'MT', 'Level I', 'fundamentals', 12, true, true, 0, NOW(), NOW()
),
(
  'MT Equipment and Magnetization Techniques',
  'mt-equipment-magnetization-techniques',
  'Explore the various types of MT equipment including yokes, prods, coils, and central conductors. Understand when to use each magnetization technique for optimal results.',
  '# MT Equipment and Magnetization Techniques

Effective Magnetic Particle Testing requires understanding the equipment options and selecting the appropriate magnetization technique for each application.

## Types of Magnetization

### Circular Magnetization

Circular magnetization creates a magnetic field **around** the direction of current flow. This is effective for detecting discontinuities running **parallel** to the current direction (longitudinal defects).

**Methods:**
- **Direct contact (head shot)** - Current passed through the part
- **Central conductor** - Conductor placed through hollow parts
- **Prod method** - Portable probes for field work

### Longitudinal Magnetization

Longitudinal magnetization creates a field **parallel** to the long axis of the part. This detects discontinuities running **perpendicular** to the part axis (transverse defects).

**Methods:**
- **Coil method** - Part placed inside a coil
- **Yoke method** - Electromagnetic or permanent magnet yoke
- **Cable wrap** - Conductor wrapped around the part

## Common Equipment

### Electromagnetic Yoke

**Advantages:**
- Portable and easy to use
- No electrical contact with part
- AC, DC, or HWDC options
- No risk of arc burns

**Specifications:**
- Should lift minimum **4.5 kg (10 lb)** with AC
- Should lift minimum **18 kg (40 lb)** with DC
- Pole spacing typically 75-200 mm

### Prods

**Characteristics:**
- Portable for field inspection
- Creates circular magnetization between prods
- Typical spacing: 150-200 mm (6-8 inches)
- Current: typically 100-125 A per 25mm of spacing

**Precautions:**
- Can cause arc burns if poor contact
- Must maintain firm contact during magnetization

### Coils

**Formula for field strength:**
```
H = NI/L
```
Where:
- N = number of turns
- I = current (amperes)
- L = effective length (meters)

### Stationary Units

Fixed horizontal units for production inspection:
- Head/tail stock for circular magnetization
- Built-in coil for longitudinal magnetization
- Wet horizontal equipment common in manufacturing

## Current Types

| Current Type | Characteristics | Best For |
|-------------|-----------------|----------|
| AC | Surface effect, good mobility | Surface defects |
| DC | Deeper penetration | Subsurface defects |
| HWDC | Pulsating, good sensitivity | General use |
| FWDC | Smooth DC output | Subsurface defects |

## Selecting Magnetization Direction

- **Rule:** Discontinuity should be at **45-90°** to the magnetic field
- **Practice:** Apply magnetization in **two perpendicular directions**
- This ensures detection regardless of discontinuity orientation

## Equipment Verification

Regular verification includes:
- Ammeter calibration
- Yoke lifting power check
- Light intensity verification
- Particle concentration (wet method)

---

Proper equipment selection and technique are crucial for reliable MT inspection results.',
  'MT', 'Level I', 'equipment', 15, true, false, 0, NOW(), NOW()
),
(
  'MT Particles and Application Methods',
  'mt-particles-application-methods',
  'Understand the different types of magnetic particles, their characteristics, and the proper methods for applying them during Magnetic Particle Testing.',
  '# MT Particles and Application Methods

The choice of magnetic particles and application method significantly affects the sensitivity and reliability of Magnetic Particle Testing.

## Types of Magnetic Particles

### Dry Particles

**Characteristics:**
- Finely divided iron or iron oxide powder
- Available in various colors (red, yellow, black, gray)
- Particle size: typically 50-150 microns
- Lower sensitivity than wet method for fine cracks

**When to Use:**
- Rough surfaces
- Hot parts (up to 315°C / 600°F)
- Outdoor/field inspections
- Large areas

**Application:**
- Dust lightly using a hand bulb or powder spray gun
- Apply while magnetizing
- Remove excess with low-pressure air

### Wet Particles

**Characteristics:**
- Very fine particles (2-10 microns typical)
- Suspended in oil or water
- Available as visible (color contrast) or fluorescent
- Higher sensitivity for fine discontinuities

**Bath Concentration:**
- Fluorescent: 0.1-0.4 mL/100 mL (settling test)
- Non-fluorescent: 1.2-2.4 mL/100 mL

**Bath Maintenance:**
- Check concentration daily (settling tube)
- Monitor contamination
- Replace when breakdown occurs
- Check pH for water-based (7.0-10.5)

## Visible vs. Fluorescent Particles

### Visible (Color Contrast)

**Advantages:**
- Works under normal white light
- Simple equipment needed
- Good for field work

**Requirements:**
- Minimum 1000 lux (100 fc) illumination
- Contrasting background (white developer often used)

### Fluorescent

**Advantages:**
- Higher sensitivity
- Better for detecting fine cracks
- Easier to see indications

**Requirements:**
- UV-A light minimum 1000 µW/cm²
- Darkened area (max 20 lux ambient)
- 5-minute dark adaptation for inspector

## Application Techniques

### Continuous Method

1. Apply magnetizing current
2. While current is ON, apply particles
3. Stop particle flow
4. Turn current OFF
5. Examine for indications

**When to Use:**
- AC magnetization
- Low-retention materials
- Most common technique

### Residual Method

1. Magnetize the part
2. Turn current OFF
3. Apply particles to residual field
4. Examine for indications

**When to Use:**
- High-retention materials
- DC or HWDC magnetization
- Parts with high retentivity

## Particle Selection Guide

| Condition | Recommended Particle |
|-----------|---------------------|
| Fine cracks, high sensitivity | Wet fluorescent |
| Rough surface | Dry |
| High temperature | Dry |
| Production inspection | Wet (either type) |
| Field inspection | Dry or aerosol wet |
| Aerospace | Wet fluorescent |

## System Verification

### Ketos Ring Test

- Tool steel ring with machined holes
- Verifies system sensitivity
- Required frequency per specification

### QQI (Quantitative Quality Indicators)

- Shims with artificial defects
- Placed on part during inspection
- Verifies field direction and strength

---

Proper particle selection and application technique are essential for achieving required inspection sensitivity.',
  'MT', 'Level I', 'technique', 12, true, false, 0, NOW(), NOW()
);

-- =====================================================
-- PENETRANT TESTING (PT) ARTICLES
-- =====================================================

INSERT INTO "Articles" (title, slug, excerpt, content, method, level, category, "readingTime", published, featured, "viewCount", "createdAt", "updatedAt")
VALUES
(
  'Introduction to Liquid Penetrant Testing',
  'introduction-to-liquid-penetrant-testing',
  'Learn the fundamentals of Liquid Penetrant Testing (PT), including basic principles, the capillary action phenomenon, and why PT is essential for detecting surface-breaking discontinuities.',
  '# Introduction to Liquid Penetrant Testing

Liquid Penetrant Testing (PT), also known as Dye Penetrant Inspection (DPI), is one of the most versatile and widely used non-destructive testing methods for detecting surface-breaking discontinuities.

## What is Penetrant Testing?

PT uses a liquid dye that penetrates into surface-breaking discontinuities by **capillary action**. After excess penetrant is removed, a developer draws the trapped penetrant back to the surface, creating a visible indication.

## The Physics: Capillary Action

Capillary action is the ability of a liquid to flow in narrow spaces without external forces. It occurs due to:

- **Cohesion** - attraction between liquid molecules
- **Adhesion** - attraction between liquid and surface
- **Surface tension** - creates the curved meniscus

> **Key Point:** Penetrant will enter very fine cracks (down to 1 micron wide) regardless of gravity or orientation.

## Advantages of PT

- Works on **almost all non-porous materials**
- **High sensitivity** to fine surface cracks
- **Portable** - can be used anywhere
- **Economical** for spot checks
- **Simple** to perform with training
- Provides a **visible record** of indications

## Materials That Can Be Tested

Unlike MT, PT works on:

- All metals (ferrous and non-ferrous)
- Ceramics
- Plastics (with compatible penetrants)
- Glass
- Any non-porous material

> **Limitation:** Cannot be used on porous materials like unglazed ceramics, some castings, or rough surfaces.

## Types of Discontinuities Detected

PT can detect:

1. **Fatigue cracks**
2. **Stress corrosion cracks**
3. **Grinding cracks**
4. **Heat treatment cracks**
5. **Welding defects** (cracks, porosity, lack of fusion if surface-breaking)
6. **Laps and seams**

## Basic Process Steps

1. **Pre-clean** - Remove all contaminants
2. **Apply penetrant** - Coat surface with penetrant
3. **Dwell time** - Allow penetrant to enter discontinuities
4. **Remove excess** - Wash or wipe off surface penetrant
5. **Apply developer** - Draw penetrant out for visibility
6. **Examine** - Look for indications under appropriate lighting
7. **Post-clean** - Remove processing materials

## Industry Standards

- **ASNT SNT-TC-1A** - Personnel qualification
- **ASTM E1417** - Standard practice for PT
- **ASTM E165** - Standard test method
- **AMS 2644** - Aerospace PT requirements
- **ISO 3452** - International PT standards

## Applications

PT is used in:

- Aerospace manufacturing and maintenance
- Power generation
- Petrochemical industry
- Automotive components
- Pressure vessels
- Structural welds

---

LPT remains an essential first-line inspection method for quality assurance worldwide.',
  'PT', 'Level I', 'fundamentals', 12, true, true, 0, NOW(), NOW()
),
(
  'PT Materials and Classifications',
  'pt-materials-classifications',
  'Understand the classification of penetrant materials according to ASTM E1417, including penetrant types, removal methods, and developer types for different applications.',
  '# PT Materials and Classifications

Understanding the classification system for penetrant materials is essential for selecting the correct system for each application.

## Classification System (ASTM E1417)

### Type - Penetrant Dye Type

| Type | Description | Use |
|------|-------------|-----|
| Type I | Fluorescent | High sensitivity, darkened viewing |
| Type II | Visible dye | Normal light viewing, field use |

### Method - Excess Penetrant Removal

| Method | Description | When to Use |
|--------|-------------|-------------|
| A | Water washable | Fast processing, moderate sensitivity |
| B | Post-emulsifiable, lipophilic | High sensitivity, controlled removal |
| C | Solvent removable | Spot inspections, field use |
| D | Post-emulsifiable, hydrophilic | Highest sensitivity, best control |

### Sensitivity Levels (Type I Only)

| Level | Sensitivity | Application |
|-------|-------------|-------------|
| ½ | Ultra-low | Very rough castings |
| 1 | Low | Rough surfaces |
| 2 | Medium | General purpose |
| 3 | High | Critical components |
| 4 | Ultra-high | Aerospace, high criticality |

## Penetrant Characteristics

### Ideal Penetrant Properties

- Low viscosity for rapid entry
- High wetting ability (low contact angle)
- Bright, stable dye (fluorescent or visible)
- Low volatility during dwell
- Easy to remove from surface
- Safe for materials and operators
- Good chemical stability

### Fluorescent vs. Visible

**Fluorescent (Type I):**
- Higher sensitivity
- Requires UV-A light (black light)
- Requires darkened area
- Common for aerospace and critical components

**Visible (Type II):**
- Works under white light
- Usually red/pink dye with white developer
- Good for field work
- Commonly used for weld inspection

## Developer Types

| Form | Description | Application |
|------|-------------|-------------|
| Form a | Dry powder | Dusty, but effective on fluorescent |
| Form b | Water soluble | Dip or spray, creates thin film |
| Form c | Water suspendible | Thicker coat, good contrast |
| Form d | Nonaqueous (solvent) | Spray can, highest sensitivity |
| Form e | Specific application | Special purposes |

### Developer Selection Guide

- **Form d (nonaqueous)** - Best sensitivity, visible PT
- **Form a (dry)** - Fast, good for fluorescent
- **Form c (water suspendible)** - Good for large parts
- **Form b (water soluble)** - Economical, production use

## Emulsifiers

### Lipophilic (Method B)

- Oil-based, mixes directly with penetrant
- Concentration-sensitive (typically 2-3 minutes)
- Can over-emulsify if left too long

### Hydrophilic (Method D)

- Water-based, applied after water pre-rinse
- Better control, more sensitive
- Concentration typically 5-20%
- Preferred for aerospace applications

## Temperature Considerations

| Condition | Temperature Range |
|-----------|------------------|
| Standard | 10-52°C (50-125°F) |
| Cold | Special low-temp penetrants |
| Hot | High-temp penetrants (up to 175°C) |

> **Note:** Always verify penetrant materials are within their expiration date and compatible with the part material.

---

Proper selection of the penetrant system is critical for achieving the required sensitivity and reliability.',
  'PT', 'Level I', 'materials', 14, true, false, 0, NOW(), NOW()
),
(
  'PT Process Steps and Techniques',
  'pt-process-steps-techniques',
  'Master the six-step penetrant testing process, including critical parameters like dwell time, washing techniques, and developer application for optimal results.',
  '# PT Process Steps and Techniques

Proper execution of each process step is critical for reliable penetrant testing results. This guide covers the complete PT procedure.

## Step 1: Pre-Cleaning

**Purpose:** Remove all contaminants that could prevent penetrant entry or cause false indications.

**Contaminants to Remove:**
- Oil, grease, lubricants
- Paint, coatings, scale
- Rust and corrosion products
- Machining fluids
- Previous inspection materials

**Methods:**
- Solvent cleaning (acetone, alcohol)
- Alkaline cleaning
- Vapor degreasing
- Mechanical cleaning (careful!)
- Acid etching (when approved)

> **Critical:** Surface must be completely dry before penetrant application!

**Precautions:**
- Avoid smearing contaminants into defects
- Some cleaning methods may close small cracks
- Verify chemical compatibility

## Step 2: Penetrant Application

**Methods:**
- Spray (aerosol or pressure)
- Brush (touch-up work)
- Dip or immersion (production)
- Flow-on (automated systems)

**Requirements:**
- Complete coverage of inspection area
- Maintain wet film throughout dwell
- Apply at proper temperature

## Step 3: Dwell Time (Penetration Time)

**Purpose:** Allow sufficient time for penetrant to enter discontinuities by capillary action.

**Minimum Dwell Times (Typical):**

| Material | Dwell Time |
|----------|------------|
| Aluminum, magnesium | 5-10 min |
| Steel, stainless | 10-20 min |
| Titanium | 5-20 min |
| Carbide | 5-10 min |
| Castings | 10-30 min |

> **Note:** Specification requirements take precedence. Longer dwell time ≠ better results if surface dries.

## Step 4: Excess Penetrant Removal

### Method A - Water Washable

- Use water spray at **40°C (100°F) max**
- Pressure **275 kPa (40 psi) max**
- Wash at **30-45° angle**
- Monitor under UV light (fluorescent)
- Avoid over-washing!

### Method C - Solvent Removable

1. Wipe with dry lint-free cloth
2. Dampen cloth with solvent
3. Wipe surface (not flood)
4. Repeat until clean
5. Never spray solvent directly on part

### Method D - Hydrophilic Post-Emulsifiable

1. Pre-rinse with water (coarse spray)
2. Apply emulsifier (dip, spray, or foam)
3. Contact time: per specification (30 sec - 2 min)
4. Final water rinse
5. Dry

## Step 5: Drying

**Methods:**
- Air dry (ambient)
- Warm air blower (≤52°C / 125°F)
- Oven dry (≤52°C / 125°F)
- Clean, filtered air

> **Warning:** Over-heating can drive penetrant out of defects!

**Time:** Typically 5-10 minutes depending on method

## Step 6: Developer Application

### Dry Powder (Form a)
- Apply light, uniform coat
- Use powder chamber or soft brush
- Typical dwell: 10-30 minutes

### Nonaqueous (Form d)
- Spray from 20-30 cm distance
- Light, uniform coat (see background through coat)
- Apply immediately after drying
- Hold can upright while spraying

### Developer Dwell Time
- Minimum: 10 minutes
- Maximum: 4 hours (typically)
- Most indications appear within 10-15 min

## Step 7: Examination

### Visible Penetrant
- Minimum 1000 lux (100 fc)
- White light source
- Look for red/pink indications against white developer

### Fluorescent Penetrant
- UV-A minimum 1000 µW/cm²
- Ambient light maximum 20 lux
- Inspector dark adaptation: 1-5 minutes
- Look for yellow-green fluorescent indications

## Common Errors and Prevention

| Error | Consequence | Prevention |
|-------|-------------|------------|
| Incomplete cleaning | Missed defects | Thorough pre-clean, verify dryness |
| Short dwell time | Missed defects | Follow specification minimums |
| Over-washing | Missed defects | Monitor, proper technique |
| Heavy developer | Masked indications | Light, uniform coat |
| Late examination | Faded indications | Examine within time limits |

---

Consistent adherence to proper technique ensures reliable, repeatable inspection results.',
  'PT', 'Level I', 'technique', 16, true, false, 0, NOW(), NOW()
);

-- =====================================================
-- RADIOGRAPHIC TESTING (RT) ARTICLES
-- =====================================================

INSERT INTO "Articles" (title, slug, excerpt, content, method, level, category, "readingTime", published, featured, "viewCount", "createdAt", "updatedAt")
VALUES
(
  'Introduction to Radiographic Testing',
  'introduction-to-radiographic-testing',
  'Learn the fundamentals of Radiographic Testing (RT), including basic principles of X-ray and gamma ray generation, and how radiation creates images to reveal internal discontinuities.',
  '# Introduction to Radiographic Testing

Radiographic Testing (RT) is a powerful volumetric inspection method that uses penetrating radiation to reveal internal discontinuities in materials and components.

## What is Radiographic Testing?

RT uses X-rays or gamma rays to penetrate materials and create an image on a detector (film or digital). Variations in material thickness, density, or composition create differences in the image that can reveal internal defects.

## How It Works

1. **Radiation source** (X-ray tube or isotope) emits radiation
2. **Radiation passes through** the test object
3. **Varying absorption** occurs based on material properties
4. **Image recorded** on film or digital detector
5. **Image interpreted** to identify discontinuities

## Types of Radiation Sources

### X-ray Tubes

**Advantages:**
- Adjustable energy (kV)
- High output intensity
- Can be turned off (no radiation when not in use)

**Characteristics:**
- 50-450 kV for industrial use
- Higher kV = more penetration
- Requires electrical power

### Gamma Ray Isotopes

**Common Isotopes:**

| Isotope | Half-life | Energy (MeV) | Max Steel Thickness |
|---------|-----------|--------------|---------------------|
| Iridium-192 | 74 days | 0.31-0.61 | 75 mm (3 in) |
| Cobalt-60 | 5.27 years | 1.17-1.33 | 200 mm (8 in) |
| Selenium-75 | 120 days | 0.12-0.40 | 40 mm (1.5 in) |

**Advantages:**
- Portable (no power needed)
- Good for field work
- Access tight spaces

> **Safety:** Gamma sources are always radioactive and require strict handling procedures!

## Radiation Safety

### ALARA Principle
**A**s **L**ow **A**s **R**easonably **A**chievable

### Protection Methods
1. **Time** - Minimize exposure time
2. **Distance** - Maximize distance from source (inverse square law)
3. **Shielding** - Use lead, concrete barriers

### Personnel Monitoring
- Film badges
- TLDs (Thermoluminescent Dosimeters)
- Electronic dosimeters
- Required for all radiation workers

## Types of Discontinuities Detected

RT is excellent for detecting:

- **Porosity** (gas pores)
- **Inclusions** (slag, tungsten)
- **Cracks** (especially volume cracks)
- **Lack of fusion**
- **Incomplete penetration**
- **Shrinkage** (castings)
- **Corrosion**

> **Limitation:** RT may miss tight, planar defects oriented parallel to the radiation beam (like laminations).

## Advantages of RT

- **Permanent record** (radiograph)
- **Volumetric inspection** (sees internal structure)
- Works on most materials
- **Quantitative information** about defects
- Widely accepted by codes

## Limitations

- Expensive equipment and facilities
- Radiation safety requirements
- Access to both sides often required
- Not sensitive to all flaw orientations
- Requires trained interpreters

## Industry Standards

- **ASNT SNT-TC-1A** - Personnel qualification
- **ASME Section V** - Boiler and Pressure Vessel Code
- **AWS D1.1** - Structural Welding Code
- **ASTM E94/E1742** - RT standards
- **ISO 17636** - RT of welds

---

RT remains the preferred method for volumetric inspection of critical components in aerospace, pressure vessels, and pipeline applications.',
  'RT', 'Level I', 'fundamentals', 14, true, true, 0, NOW(), NOW()
),
(
  'Radiographic Image Quality',
  'radiographic-image-quality',
  'Understand the factors affecting radiographic image quality including density, contrast, definition, and how to optimize your technique for the best results.',
  '# Radiographic Image Quality

Creating a quality radiograph requires understanding and controlling the factors that affect image characteristics. This guide covers the essential elements of radiographic image quality.

## The Four Quality Factors

### 1. Density

**Definition:** The overall darkness of the radiograph.

**Measurement:** Optical density = log₁₀(I₀/I)

**Acceptable Range:** 
- X-ray: minimum 1.8, maximum 4.0
- Gamma: minimum 2.0, maximum 4.0
- Optimal: 2.0 - 3.0 for best viewing

**Factors Affecting Density:**
- Exposure time
- Milliamperage (mA)
- Source-to-film distance (SFD)
- Material thickness
- Film speed
- Processing conditions

### 2. Contrast

**Definition:** The difference in density between adjacent areas.

**Types:**
- **Subject contrast** - From differences in the specimen
- **Film contrast** - Characteristic of the film type

**Higher Contrast (Desirable):**
- Lower kV (more photoelectric absorption)
- Higher film contrast (slower film)
- Proper filtering
- Reduced scatter

**Note:** There is a trade-off between contrast and latitude (range of thicknesses visible).

### 3. Definition (Sharpness)

**Definition:** The sharpness of edges and detail visibility.

**Affected By:**

**Geometric Unsharpness (Ug):**
```
Ug = F × OFD / SOD
```
Where:
- F = Source size
- OFD = Object-to-film distance
- SOD = Source-to-object distance

**To Minimize Ug:**
- Use smaller source size
- Minimize OFD (film close to part)
- Maximize SOD (source far from part)

**Film Unsharpness:**
- Film grain size
- Screen-film contact
- Film type selection

### 4. Sensitivity

**Definition:** Ability to detect small discontinuities.

**Measured By:** Image Quality Indicators (IQI/Penetrameters)

## Image Quality Indicators (IQI)

### Hole-Type IQI

- Thin strip with three holes (1T, 2T, 4T diameter)
- IQI thickness = percentage of specimen thickness
- Example: 2-2T = 2% thickness IQI, 2T hole visible

### Wire-Type IQI

- Series of wires of decreasing diameter
- Essential wire visibility indicates sensitivity
- Common for European standards

### Placement

- Source side when possible
- On specimen, not cassette
- In darkest area of interest

## Scatter Radiation

**Problem:** Reduces contrast and image quality

**Causes:**
- Interaction with specimen atoms
- Backscatter from materials behind film

**Control Methods:**
- Lead screens (front and back)
- Masks and collimators
- Proper filtration
- Increased SFD

**Backscatter Test:**
- Place lead letter "B" on back of cassette
- Light image = excessive backscatter

## Screens

### Lead Screens

**Function:**
- Intensify image (add electrons)
- Filter scatter radiation
- Reduce exposure time

**Typical Thicknesses:**
- Front: 0.1-0.15 mm
- Back: 0.15-0.25 mm

### Fluorescent Screens

- Convert radiation to visible light
- Significantly reduce exposure
- Some loss of definition
- Useful for thick sections

## Optimizing Technique

| Goal | Action |
|------|--------|
| Higher contrast | Lower kV, higher mA/time |
| Better definition | Smaller source, greater SFD, less OFD |
| More sensitivity | Better film, proper screens, IQI verification |
| Reduce scatter | Masks, collimators, proper screens |

---

Mastering image quality parameters is essential for producing radiographs that meet code requirements and reveal all relevant discontinuities.',
  'RT', 'Level I', 'technique', 15, true, false, 0, NOW(), NOW()
),
(
  'RT Exposure Calculation and Technique',
  'rt-exposure-calculation-technique',
  'Learn how to calculate exposure times, select proper techniques, and set up radiographic examinations for various applications including welds and castings.',
  '# RT Exposure Calculation and Technique

Successful radiographic testing requires proper exposure calculations and technique selection. This guide covers the essential calculations and setup procedures.

## Exposure Variables

### X-ray Exposure Factors

**Main Variables:**
- Kilovoltage (kV)
- Milliamperage (mA)
- Time (minutes)
- Source-to-film distance (SFD)
- Material and thickness

**Exposure Formula:**
```
E = mA × time × k / D²
```
Where:
- E = Relative exposure
- k = Material factor
- D = SFD

### Gamma Ray Exposure Factors

**Main Variables:**
- Source activity (Curies or Becquerels)
- Exposure time
- Source-to-film distance
- Material and thickness

**Activity Decay:**
```
A = A₀ × (1/2)^(t/T½)
```
Where:
- A = Current activity
- A₀ = Original activity
- t = Time elapsed
- T½ = Half-life

## The Inverse Square Law

**Principle:** Intensity decreases with the square of distance.

```
I₁/I₂ = (D₂/D₁)²
```

**Practical Use:**
- Doubling SFD requires 4× exposure time
- Essential for safety calculations
- Critical for technique adjustments

**Example:**
If exposure at 1 meter is 2 minutes:
- At 2 meters: 2 × (2/1)² = 8 minutes
- At 0.5 meters: 2 × (0.5/1)² = 0.5 minutes

## Geometric Unsharpness

**Formula:**
```
Ug = F × OFD / SOD
```

**Acceptable Limits:**
- Typically Ug ≤ 0.5 mm for critical work
- May vary by code requirement

**Example Calculation:**
- Source size (F) = 3 mm
- OFD = 10 mm
- SOD = 600 mm
- Ug = 3 × 10 / 600 = 0.05 mm ✓

## Minimum SFD Calculation

**To Meet Ug Requirement:**
```
SFD(min) = F × OFD / Ug(max) + OFD
```

**Example:**
- Required Ug ≤ 0.5 mm
- F = 4 mm
- OFD = 20 mm
- SFD(min) = (4 × 20) / 0.5 + 20 = 180 mm

## Technique Selection

### Single Wall Single Image (SWSI)

- Radiation passes through ONE wall
- Film on opposite side
- Best for flat objects, accessible both sides
- Most accurate representation

### Double Wall Single Image (DWSI)

- Radiation through BOTH walls
- Image of one wall only (source side)
- For pipe/tube with external source
- Minimum 3 exposures at different angles

### Double Wall Double Image (DWDI)

- Both walls imaged
- For small diameter tubes
- Elliptical technique common
- Superimposed or offset images

## Technique Charts

### Developing Your Chart

1. Select standard conditions (mA, SFD, film type)
2. Make test exposures on step wedge
3. Note exposure for target density at each thickness
4. Plot thickness vs. exposure
5. Verify with actual specimens

### Using Exposure Charts

- Enter at material thickness
- Read required exposure time
- Adjust for different SFD
- Correct for source decay (gamma)

## Practical Setup

### Weld Radiography Checklist

1. ☐ Clean weld and surrounding area
2. ☐ Place location markers
3. ☐ Position IQI (source side preferred)
4. ☐ Calculate Ug, verify SFD adequate
5. ☐ Install film cassette with screens
6. ☐ Place backscatter indicator
7. ☐ Calculate and set exposure
8. ☐ Establish controlled area
9. ☐ Expose and process

### Quality Verification

On each radiograph, verify:
- Required IQI visible (e.g., 2-2T)
- Density in acceptable range
- Identification markers visible
- Coverage complete
- No artifacts affecting interpretation

---

Proper technique setup and calculation ensures radiographs meet code requirements and provide reliable defect detection.',
  'RT', 'Level II', 'technique', 16, true, false, 0, NOW(), NOW()
);

-- =====================================================
-- ULTRASONIC TESTING (UT) - Additional Articles
-- =====================================================

INSERT INTO "Articles" (title, slug, excerpt, content, method, level, category, "readingTime", published, featured, "viewCount", "createdAt", "updatedAt")
VALUES
(
  'UT Calibration and Reference Standards',
  'ut-calibration-reference-standards',
  'Master the essential calibration procedures for Ultrasonic Testing, including the use of reference blocks like IIW, DSC, and AWS standards.',
  '# UT Calibration and Reference Standards

Proper calibration is the foundation of reliable Ultrasonic Testing. This guide covers calibration blocks, procedures, and verification requirements.

## Why Calibrate?

Calibration ensures:
- **Accurate distance measurement** (depth, sound path)
- **Known sensitivity** (ability to detect given size reflector)
- **Repeatable results** between inspectors
- **Code compliance**

## Types of Calibration

### Distance/Range Calibration

Establishes the relationship between screen display and actual distance in the material.

**Methods:**
- Multiple backwall echoes
- Known radius blocks
- Step wedge blocks

### Sensitivity Calibration

Establishes the reference level for flaw evaluation.

**Methods:**
- Side-drilled holes (SDH)
- Flat-bottom holes (FBH)
- Notches
- Curved surfaces

## Common Reference Blocks

### IIW Block (Type 1)

**Full Name:** International Institute of Welding Block

**Features:**
- 100mm radius for angle beam calibration
- 25mm and 50mm thickness sections
- 1.5mm and 3mm diameter SDH
- 4 sets of 5mm deep calibration notches

**Uses:**
- Angle beam calibration
- Resolution check
- Beam index location
- Angle verification

### DSC Block (Distance-Sensitivity Calibration)

**Also Known As:** DC block, AWS block

**Features:**
- Multiple holes at known depths
- Typically 0.060" (1.5mm) diameter holes
- Distance and amplitude calibration

### Miniature Angle Beam Block

**Features:**
- Smaller, portable version
- Basic angle calibration
- Field use

### ASME Basic Calibration Block

**Features:**
- 1.5" thick steel
- 1/4" and 3/16" diameter FBH at various depths
- For contact testing

## Calibration Procedures

### Straight Beam Calibration

**Velocity/Range Setup:**

1. Apply couplant to block
2. Obtain two or more backwall signals
3. Adjust delay to position first echo at correct distance
4. Adjust range to position second echo correctly
5. Verify linearity across screen

**Example (IIW Block):**
- First backwall: 25mm (1") mark
- Second backwall: 50mm (2") mark

### Angle Beam Calibration

**Beam Index (Exit Point):**

1. Place probe on IIW block radius
2. Maximize signal from radius
3. Mark probe at center of IIW graduations
4. This is the beam index point

**Angle Verification:**

1. Position probe to hit angle indicator grooves
2. Signal peaks should occur at marked angles
3. Verify actual angle matches nominal

**Range Calibration:**

1. Use 100mm radius or known distance points
2. Set first reflection at proper distance
3. Adjust range for full-skip distance

### Sensitivity (DAC) Calibration

**DAC = Distance Amplitude Correction**

**Procedure:**

1. Set reference level from first SDH
2. Record amplitude at each depth
3. Connect peak points on screen
4. Creates correction curve for depth

## Reference Reflectors

| Type | Description | Use |
|------|-------------|-----|
| SDH | Side-drilled hole | General reference, DAC |
| FBH | Flat-bottom hole | Area amplitude, DGS |
| A/V Notch | Sharp corner machined notch | Weld inspection |
| EDM Notch | Electrical discharge machined | Fine defects |

## Calibration Frequency

**Before Each Inspection:**
- Verify range
- Check sensitivity level
- Confirm proper operation

**Periodic (Per Procedure):**
- Complete calibration
- Document results
- Verify reference blocks

**After Any Change:**
- Probe replacement
- Cable replacement
- Instrument settings change
- Temperature change (>15°C)

## Documentation

Record in calibration log:
- Date and time
- Inspector name
- Instrument serial number
- Probe serial number
- Block used
- Calibration values
- Any corrections applied

---

Regular, proper calibration is essential for producing reliable, reproducible UT results that meet code requirements.',
  'UT', 'Level II', 'calibration', 15, true, false, 0, NOW(), NOW()
);
