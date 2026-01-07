-- =====================================================
-- NDT E-Learning Articles - VT and ET
-- Comprehensive articles to support quiz content
-- Based on ASNT SNT-TC-1A and ISO 9712 standards
-- =====================================================

-- =====================================================
-- VISUAL TESTING (VT) ARTICLES
-- =====================================================

INSERT INTO "Articles" (title, slug, excerpt, content, method, level, category, "readingTime", published, featured, "viewCount", "createdAt", "updatedAt")
VALUES
(
  'Introduction to Visual Testing',
  'introduction-to-visual-testing',
  'Learn the fundamentals of Visual Testing (VT), the most basic yet essential NDT method for detecting surface discontinuities and assessing component condition.',
  '# Introduction to Visual Testing

Visual Testing (VT) is the most fundamental and widely used non-destructive testing method. It involves the examination of components using the human eye, with or without optical aids.

## What is Visual Testing?

VT is the process of examining a test object using the naked eye or with optical instruments to detect surface conditions, discontinuities, and conformance to specifications.

## Why Visual Testing is Important

- **First line of defense** in quality control
- **Most economical** NDT method
- **Fastest** inspection technique
- Often **required before** other NDT methods
- Can detect obvious defects that would fail other tests

## Types of Visual Testing

### Direct Visual Testing (DVT)

The inspector views the examination surface directly, with the eye within **600 mm (24 inches)** of the surface and at an angle **not less than 30°** to the surface.

**Requirements:**
- Eye to surface distance: ≤ 600 mm
- Viewing angle: ≥ 30°
- Minimum illumination: 500 lux (50 fc) general, 1000 lux (100 fc) critical

### Remote Visual Testing (RVT)

Used when direct viewing is not possible due to access limitations.

**Equipment Used:**
- Borescopes (rigid)
- Fiberscopes (flexible)
- Videoscopes
- Cameras and mirrors
- Drones (emerging technology)

## Lighting Requirements

Proper illumination is critical for effective VT:

| Examination Type | Minimum Illumination |
|-----------------|---------------------|
| General inspection | 500 lux (50 fc) |
| Critical inspection | 1000 lux (100 fc) |
| Detailed surface exam | 2000 lux (200 fc) |

### Light Types

- **Ambient light** - General room lighting
- **Supplemental light** - Flashlights, headlamps
- **Directional light** - Creates shadows to reveal surface irregularities
- **Diffused light** - Reduces glare on reflective surfaces

## What Can VT Detect?

### Surface Discontinuities

- Cracks (fatigue, stress corrosion, grinding)
- Porosity (surface-breaking)
- Undercut, overlap, spatter
- Incomplete fusion (if surface-breaking)
- Corrosion and erosion
- Mechanical damage

### Dimensional Verification

- Weld size and profile
- Component dimensions
- Alignment and fit-up
- Surface finish

### General Condition

- Cleanliness
- Coating condition
- Leakage
- Wear patterns

## Limitations of Visual Testing

- **Surface only** - Cannot detect subsurface discontinuities
- **Subjective** - Depends on inspector skill and attention
- **Lighting dependent** - Poor lighting reduces effectiveness
- **Access required** - Must be able to see the surface
- **No permanent record** - Unless documented with photos

## Personnel Requirements

### Visual Acuity

Inspectors must demonstrate:
- **Near vision**: Jaeger J1 or J2 at minimum 12 inches (300 mm)
- **Color vision**: Natural or corrected (for color-coded items)
- Annual eye examination recommended

### Training

- Understanding of applicable codes and standards
- Knowledge of materials and manufacturing processes
- Experience with welding and fabrication defects

## Industry Standards

- **ASNT SNT-TC-1A** - Personnel qualification
- **AWS D1.1** - Structural Welding Code
- **ASME Section V** - Boiler and Pressure Vessel Code
- **API 510/570** - Pressure vessels and piping

---

Visual Testing forms the foundation of all quality inspection programs and is an essential skill for all NDT professionals.',
  'VT', 'Level I', 'fundamentals', 12, true, true, 0, NOW(), NOW()
),
(
  'VT Equipment and Optical Aids',
  'vt-equipment-optical-aids',
  'Explore the equipment used in Visual Testing, from simple magnifying lenses to advanced borescopes and videoscopes for remote inspection.',
  '# VT Equipment and Optical Aids

Effective visual inspection often requires more than just the naked eye. This guide covers the equipment and optical aids used in professional VT.

## Basic Optical Aids

### Magnifying Lenses

**Purpose:** Enhance visibility of fine details

**Types:**
- Hand-held magnifiers (1.5X - 10X)
- Pocket magnifiers
- Stand magnifiers
- Head-mounted magnifiers

**Typical Magnification:**
- 1.5X - 3X for general inspection
- 5X - 10X for detailed examination
- Higher magnification = smaller field of view

### Mirrors

Used to view areas not directly accessible:
- Inspection mirrors (flat or convex)
- Articulating mirrors
- Dental-style mirrors for confined spaces

## Borescopes

Rigid optical instruments for remote viewing.

### Types of Borescopes

**Rigid Borescopes:**
- Fixed viewing direction
- 0° (forward), 45°, 70°, 90°, 110° viewing angles
- High image quality
- Various lengths and diameters
- Used for straight-line access

**Viewing Directions:**
| Angle | Application |
|-------|-------------|
| 0° (forward) | Looking straight ahead |
| 45° | Combined forward and side viewing |
| 90° (side) | Viewing perpendicular to insertion axis |
| 110° (retrospective) | Looking slightly backward |

### Key Specifications

- **Diameter:** 4mm to 12mm typical
- **Length:** 150mm to 1000mm+
- **Field of view:** 40° to 90°
- **Depth of field:** Working distance range in focus

## Fiberscopes

Flexible optical instruments using fiber optic bundles.

**Advantages:**
- Can navigate curved paths
- Various lengths (1m to 30m+)
- Articulating tip (usually 2-way or 4-way)
- Reaches otherwise inaccessible areas

**Limitations:**
- Image quality less than rigid borescopes
- Fiber damage affects image quality
- More expensive than rigid scopes

## Videoscopes

Electronic imaging with digital cameras.

### Features

- **Digital image sensor** at distal tip
- **LED lighting** built-in
- **Articulating tip** control
- **Recording capability** for documentation
- **Image processing** (freeze, zoom, measure)

### Resolution Requirements

Per standard practice:
- Minimum: 640 × 480 pixels
- Recommended: 1280 × 720 or higher
- Critical applications: Full HD or better

### Advantages Over Optical Scopes

- Larger viewing screens
- Image capture and storage
- Video recording
- Measurement capabilities
- Multiple viewers simultaneously
- No eye strain

## Weld Gauges

Essential for weld inspection:

### Common Types

**Fillet Weld Gauge:**
- Measures fillet weld leg size
- Checks weld profile

**Hi-Lo Gauge:**
- Measures internal misalignment (high-low)
- Used for pipe fit-up verification

**Cambridge Gauge:**
- Multi-purpose gauge
- Undercut depth, reinforcement height, angles

**V-WAC Gauge:**
- Visual Weld Acceptance Criteria gauge
- Go/no-go type checking

### What Gauges Measure

- Fillet weld size (leg and throat)
- Undercut depth
- Reinforcement height
- Weld angle
- Root opening
- Misalignment

## Lighting Equipment

### Portable Lights

- LED flashlights
- Headlamps
- Inspection lights with adjustable intensity
- UV lights (for certain applications)

### Specifications

- Color temperature: 5000-6500K (daylight equivalent)
- Battery or corded options
- Intrinsically safe for hazardous areas

## Documentation Equipment

### Cameras

- Digital cameras with macro capability
- Smartphone cameras (convenience)
- Industrial cameras for harsh environments

### Best Practices

- Include scale reference in photos
- Document location and orientation
- Capture overall and close-up views
- Maintain consistent lighting

---

Proper equipment selection and use significantly enhances the effectiveness of visual testing inspections.',
  'VT', 'Level I', 'equipment', 14, true, false, 0, NOW(), NOW()
),
(
  'Weld Inspection by Visual Testing',
  'weld-inspection-visual-testing',
  'Master the techniques for visual inspection of welds, including identification of common weld discontinuities and acceptance criteria per AWS and ASME standards.',
  '# Weld Inspection by Visual Testing

Visual inspection of welds is one of the most common applications of VT. This guide covers weld discontinuities, inspection techniques, and acceptance criteria.

## Weld Discontinuity Types

### Surface Discontinuities

**Cracks**
- Most severe discontinuity
- Linear indication with sharp ends
- Types: longitudinal, transverse, crater, toe cracks
- Usually NOT acceptable

**Porosity (Surface)**
- Round or elongated gas pockets
- Single, cluster, or linear (piping)
- Caused by contamination, improper shielding

**Undercut**
- Groove melted into base metal at weld toe
- Reduces cross-section
- Stress concentration point

**Overlap**
- Weld metal extends over base metal without fusion
- Cold lap on the surface
- Indicates poor fusion

**Incomplete Fusion (Exposed)**
- Visible lack of fusion between weld and base metal
- May appear at weld face or root

**Excessive Reinforcement**
- Weld face too high above base metal
- Causes stress concentration
- May indicate improper parameters

**Insufficient Throat**
- Fillet weld not meeting size requirements
- Measured at minimum dimension

**Spatter**
- Metal particles expelled during welding
- May hide other discontinuities
- Should be removed before inspection

**Arc Strikes**
- Localized surface melting from accidental electrode contact
- Can create hard spots and cracks
- Typically requires repair

### Root Side Discontinuities

**Incomplete Penetration**
- Root not fully filled
- Gap at root of weld
- Visible from back side if accessible

**Root Concavity**
- Insufficient root reinforcement
- Groove at the root
- May be acceptable if within limits

**Burn-Through (Melt-Through)**
- Excessive penetration creating hole
- Collapsed weld pool
- Common in thin materials

## Inspection Sequence

### Before Welding

1. Review WPS and drawings
2. Verify fit-up and alignment
3. Check joint cleanliness
4. Verify preheat (if required)
5. Check welder qualification

### During Welding

1. Observe root pass quality
2. Check interpass temperature
3. Verify proper sequence
4. Monitor for visible defects

### After Welding

1. Allow part to cool
2. Clean weld surface
3. Examine entire weld length
4. Measure dimensions
5. Document findings

## Acceptance Criteria

### AWS D1.1 Requirements (Typical)

| Discontinuity | Acceptance Criteria |
|---------------|---------------------|
| Cracks | None allowed |
| Overlap | None allowed |
| Incomplete fusion | None allowed |
| Undercut | ≤ 1/32" (0.8mm) for t < 1" |
| Porosity | ≤ 3/8" dia., sum ≤ 3/4" in 12" |
| Reinforcement | 1/8" max for t ≤ 1" |

### ASME Section IX

Different requirements may apply:
- Depends on service conditions
- Referenced in construction code
- May be more or less restrictive

## Measuring Techniques

### Fillet Weld Size

- Measure both legs
- Determine effective throat
- Size is smaller leg dimension

### Undercut Depth

- Use depth gauge or Cambridge gauge
- Measure at deepest point
- Compare to maximum allowable

### Reinforcement Height

- Measure above base metal surface
- Use straight edge and rule
- Check maximum height limit

## Documentation

### Required Information

- Date and time of inspection
- Inspector name and certification
- Procedure used
- Weld identification
- Acceptance criteria reference
- Discontinuities found (location, size, type)
- Accept/reject determination
- Sketches or photographs

### Weld Maps

- Show weld location on drawing
- Mark discontinuity locations
- Note repair requirements

---

Proper visual inspection of welds is critical for ensuring structural integrity and code compliance.',
  'VT', 'Level II', 'technique', 15, true, false, 0, NOW(), NOW()
);

-- =====================================================
-- EDDY CURRENT TESTING (ET) ARTICLES
-- =====================================================

INSERT INTO "Articles" (title, slug, excerpt, content, method, level, category, "readingTime", published, featured, "viewCount", "createdAt", "updatedAt")
VALUES
(
  'Introduction to Eddy Current Testing',
  'introduction-to-eddy-current-testing',
  'Learn the fundamentals of Eddy Current Testing (ET), an electromagnetic NDT method for detecting surface and near-surface discontinuities in conductive materials.',
  '# Introduction to Eddy Current Testing

Eddy Current Testing (ET) is an electromagnetic NDT method that uses electromagnetic induction to detect surface and near-surface discontinuities in electrically conductive materials.

## What is Eddy Current Testing?

ET uses an alternating current (AC) coil to induce electrical currents (eddy currents) in a conductive test material. Discontinuities in the material disturb the flow of these currents, which can be detected by the coil.

## Basic Principle

1. **AC coil** generates alternating magnetic field
2. **Magnetic field** induces circular currents (eddy currents) in conductor
3. **Eddy currents** create their own opposing magnetic field
4. **Discontinuities** disrupt current flow, changing coil impedance
5. **Impedance change** is detected and displayed

## Advantages of ET

- **Non-contact** - No couplant required
- **High speed** - Fast scanning possible
- **Sensitive** - Detects small surface defects
- **Versatile** - Multiple applications
- **Surface condition tolerant** - Works through coatings
- **No consumables** - Low operating cost

## Limitations

- **Conductive materials only** - Must be electrically conductive
- **Surface/near-surface only** - Limited penetration depth
- **Skill required** - Interpretation can be complex
- **Sensitive to many variables** - Requires careful setup
- **Flat/regular surfaces preferred** - Complex geometry challenging

## Materials That Can Be Tested

### Ferromagnetic Materials
- Carbon steel
- Low alloy steel
- Ferritic stainless steel
- Cast iron

**Note:** Ferromagnetic materials require special techniques (saturation) due to permeability effects.

### Non-Ferromagnetic Materials
- Aluminum alloys
- Copper alloys
- Titanium alloys
- Austenitic stainless steel
- Nickel alloys

## What ET Can Detect

### Surface Discontinuities
- Cracks (fatigue, stress corrosion, grinding)
- Laps and seams
- Pits and corrosion

### Near-Surface Conditions
- Subsurface cracks (limited depth)
- Wall thinning
- Conductivity variations

### Material Properties
- Conductivity differences
- Permeability variations
- Heat treatment condition
- Alloy sorting

## The Skin Effect

Eddy currents are concentrated near the surface due to the **skin effect**.

**Standard Depth of Penetration (δ):**
The depth at which current density drops to 37% (1/e) of the surface value.

**Formula:**
```
δ = 1/√(πfμσ)
```

Where:
- f = frequency (Hz)
- μ = permeability (H/m)
- σ = conductivity (S/m)

**Key Points:**
- Higher frequency = shallower penetration
- Lower frequency = deeper penetration
- At 3δ depth, only ~5% of surface current remains

## Applications

### Aerospace
- Aircraft structure inspection
- Engine component testing
- Fastener hole inspection

### Power Generation
- Heat exchanger tube inspection
- Steam generator tubing
- Condenser tube testing

### Manufacturing
- Weld inspection
- Crack detection in bars/tubes
- Material sorting

### Maintenance
- In-service crack detection
- Corrosion assessment
- Coating thickness measurement

## Industry Standards

- **ASNT SNT-TC-1A** - Personnel qualification
- **ASTM E376** - Coating thickness measurement
- **ASTM E426** - Tube inspection
- **ASTM E571** - Bar inspection

---

Eddy current testing is a versatile electromagnetic method essential for quality control in aerospace, power generation, and manufacturing industries.',
  'ET', 'Level I', 'fundamentals', 14, true, true, 0, NOW(), NOW()
),
(
  'ET Equipment and Probe Types',
  'et-equipment-probe-types',
  'Explore the different types of eddy current equipment, probes, and their applications for various inspection scenarios.',
  '# ET Equipment and Probe Types

Understanding eddy current equipment and probe selection is essential for effective testing. This guide covers the instruments, probes, and accessories used in ET.

## Basic ET System Components

### 1. Instrument (Flaw Detector)

**Functions:**
- Generate AC excitation
- Process coil signals
- Display results
- Store data

**Key Features:**
- Frequency range (typically 100 Hz - 10 MHz)
- Single or multi-frequency capability
- Impedance plane display
- Alarm settings

### 2. Probes/Coils

The sensing element that interacts with the test material.

### 3. Cables

Connect probe to instrument:
- Impedance-matched
- Shielded for noise reduction
- Appropriate length for application

### 4. Reference Standards

Calibration blocks with artificial discontinuities:
- EDM notches
- Drilled holes
- Machined flat-bottom holes

## Probe Types

### Surface Probes (Pancake Probes)

**Design:** Flat coil oriented parallel to surface

**Applications:**
- Surface crack detection
- Scanning flat surfaces
- Weld inspection

**Characteristics:**
- Sensitive to surface cracks
- Affected by surface geometry
- Various sizes available

### Pencil Probes

**Design:** Small, pointed tip with concentrated field

**Applications:**
- Small areas
- Around fastener holes
- Fillet radii

**Advantages:**
- High resolution
- Access to confined areas
- Good for localized inspection

### Encircling Coils

**Design:** Coil surrounds the test object

**Applications:**
- Bar and tube inspection
- Wire inspection
- Bolt inspection

**Characteristics:**
- Tests entire circumference
- High speed production testing
- Sensitive to surface defects

### Bobbin Probes

**Design:** Coil inside tube (internal)

**Applications:**
- Heat exchanger tube inspection
- Steam generator tubing
- Condenser tubes

**Features:**
- Differential or absolute
- Various fill factors
- High speed inspection

### Rotating Probes

**Design:** Motor-driven rotation of probe elements

**Applications:**
- Detailed tube inspection
- Fastener hole inspection
- High resolution scanning

## Coil Configurations

### Absolute Coils

**Design:** Single coil compared to reference

**Advantages:**
- Detects gradual changes
- Measures absolute properties
- Simple setup

**Disadvantages:**
- Sensitive to lift-off
- Affected by temperature
- Slower response

### Differential Coils

**Design:** Two coils comparing adjacent areas

**Advantages:**
- Less sensitive to gradual changes
- Better signal-to-noise
- Less affected by lift-off variations

**Disadvantages:**
- Cannot detect gradual wall loss
- May miss long defects
- More complex signals

### Bridge (Reflection) Coils

**Design:** Separate drive and pickup coils

**Advantages:**
- Optimized sensitivity
- Reduced lift-off noise
- Flexible design

## Impedance Plane Display

The primary display method for ET:

### What It Shows

- **X-axis:** Resistance (R)
- **Y-axis:** Reactance (X)
- Signal phase angle indicates defect type/depth

### Signal Interpretation

| Signal Source | Phase Characteristic |
|---------------|---------------------|
| Lift-off | Horizontal or near-horizontal |
| Cracks | Rotate with depth |
| Conductivity | Specific angle range |
| Support plates | Characteristic pattern |

## Multi-Frequency Instruments

**Purpose:** Suppress unwanted signals

**Technique:**
- Test at multiple frequencies simultaneously
- Mix signals to cancel specific effects
- Enhance defect detection

**Applications:**
- Suppress support plate signals
- Reduce probe wobble effects
- Improve SCC detection

## Reference Standards

### Calibration Standards

**Requirements:**
- Same or similar material
- Known artificial defects
- EDM notches (various depths)
- Through-wall holes

### Standard Defects

| Type | Purpose |
|------|---------|
| OD notch | Calibrate for OD defects |
| ID notch | Calibrate for ID defects |
| Through-hole | Sensitivity verification |
| Flat-bottom hole | Reference amplitude |

---

Proper equipment selection and setup is critical for reliable eddy current inspection results.',
  'ET', 'Level I', 'equipment', 14, true, false, 0, NOW(), NOW()
),
(
  'ET Theory: Depth of Penetration and Frequency Selection',
  'et-depth-penetration-frequency',
  'Understand the physics of eddy current penetration, the skin effect, and how to select the optimal test frequency for your application.',
  '# ET Theory: Depth of Penetration and Frequency Selection

Understanding the relationship between frequency, penetration depth, and sensitivity is critical for effective eddy current testing.

## The Skin Effect

Eddy currents are not distributed uniformly through the material. The **skin effect** causes current density to be highest at the surface and decrease exponentially with depth.

### Mathematical Description

Current density at depth (x):
```
Jx = J0 × e^(-x/δ)
```

Where:
- Jx = current density at depth x
- J0 = surface current density
- δ = standard depth of penetration
- e = 2.718 (natural logarithm base)

## Standard Depth of Penetration (δ)

The depth at which eddy current density equals **37% (1/e)** of the surface value.

### Formula

```
δ = 1/√(πfμσ) = 503/√(fμrσ)
```

Where:
- f = frequency (Hz)
- μ = permeability (μ = μ0 × μr)
- μr = relative permeability
- σ = conductivity (%IACS or S/m)

### Simplified Formula (for non-ferromagnetic materials)

```
δ (mm) = 503/√(f × σ)
```

Where σ is in %IACS and f is in Hz.

### Current Density vs. Depth

| Depth | Current Density |
|-------|-----------------|
| 0 (surface) | 100% |
| 1δ | 37% |
| 2δ | 14% |
| 3δ | 5% |
| 4δ | 2% |
| 5δ | 0.7% |

**Practical Limit:** Effective penetration is typically limited to about 3δ.

## Factors Affecting Penetration

### Frequency

**Higher Frequency:**
- Shallower penetration
- Better sensitivity to small surface defects
- Higher resolution

**Lower Frequency:**
- Deeper penetration
- Can detect subsurface defects
- Less sensitive to surface variations

### Conductivity

**Higher Conductivity:**
- Stronger eddy currents
- Shallower penetration
- Higher sensitivity

**Lower Conductivity:**
- Deeper penetration
- Weaker signals
- More difficult detection

### Permeability (Ferromagnetic Materials)

**High Permeability:**
- Very shallow penetration
- Strong signals
- Masks discontinuity signals
- Requires magnetization to saturation

## Frequency Selection Guidelines

### Surface Crack Detection

- Use **high frequency** (100 kHz - 6 MHz)
- Maximize surface sensitivity
- Accept limited penetration

### Subsurface Detection

- Use **lower frequency** (1 kHz - 100 kHz)
- Sacrifice some surface sensitivity
- Increase penetration depth

### Tube Inspection

- Frequency depends on wall thickness
- Operating point based on phase separation
- Typical: 100 kHz - 400 kHz

### Material Sorting

- Conductivity-based: Mid-range frequency
- Permeability-based: Low frequency
- Match to property being measured

## Practical Calculations

### Example 1: Aluminum (σ = 50%IACS)

At f = 100 kHz:
```
δ = 503/√(100,000 × 50) = 503/√5,000,000 = 0.22 mm
```

### Example 2: Stainless Steel (σ = 2.5%IACS)

At f = 100 kHz:
```
δ = 503/√(100,000 × 2.5) = 503/√250,000 = 1.0 mm
```

**Note:** Lower conductivity = deeper penetration at same frequency.

## Frequency Ratio (f/fg)

The characteristic frequency (fg) is used to normalize frequency selection:

```
fg = σ/(2πμt²)
```

Where t is wall thickness.

### Operating Point Selection

- f/fg ratio determines phase angle relationships
- Optimal ratio separates defect signals from other variables
- Typically selected based on experience and standards

## Multi-Frequency Testing

### Purpose

- Suppress unwanted signals
- Enhance defect detection
- Separate variables

### Technique

1. Test at multiple frequencies
2. Process signals mathematically
3. Cancel known interference patterns
4. Display enhanced defect signals

### Common Applications

- Support plate suppression in tubes
- Probe wobble compensation
- ID/OD discrimination

---

Understanding penetration depth and frequency selection enables optimization of eddy current testing for specific applications and materials.',
  'ET', 'Level II', 'theory', 16, true, false, 0, NOW(), NOW()
);
