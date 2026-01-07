-- ============================================
-- SNS NDT E-Learning: Educational Content Tables
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create Articles table for educational content
CREATE TABLE IF NOT EXISTS "Articles" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,  -- Markdown content
    method VARCHAR(50),  -- NDT method: UT, RT, MT, PT, ET, VT
    level VARCHAR(50),  -- Level I, II, III
    category VARCHAR(100),  -- theory, technique, standards, equipment
    "coverImage" TEXT,
    "readingTime" INTEGER DEFAULT 5,
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    "viewCount" INTEGER DEFAULT 0,
    "authorId" INTEGER REFERENCES "Users"(id) ON DELETE SET NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Create ArticleTags for categorization
CREATE TABLE IF NOT EXISTS "ArticleTags" (
    id SERIAL PRIMARY KEY,
    "ArticleId" INTEGER NOT NULL REFERENCES "Articles"(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 3. Create UserProgress for tracking reading
CREATE TABLE IF NOT EXISTS "ArticleProgress" (
    id SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    "ArticleId" INTEGER NOT NULL REFERENCES "Articles"(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    progress INTEGER DEFAULT 0,  -- percentage 0-100
    "lastReadAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE("UserId", "ArticleId")
);

-- 4. Create indexes
CREATE INDEX IF NOT EXISTS idx_articles_method ON "Articles"(method);
CREATE INDEX IF NOT EXISTS idx_articles_level ON "Articles"(level);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON "Articles"(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON "Articles"(published);
CREATE INDEX IF NOT EXISTS idx_articletags_articleid ON "ArticleTags"("ArticleId");
CREATE INDEX IF NOT EXISTS idx_articleprogress_userid ON "ArticleProgress"("UserId");

-- ============================================
-- SEED DATA: Sample UT Educational Articles
-- ============================================

INSERT INTO "Articles" (title, slug, excerpt, content, method, level, category, "readingTime", published, featured) VALUES

-- Article 1: Introduction to UT
('Introduction to Ultrasonic Testing', 
 'introduction-to-ultrasonic-testing',
 'Learn the fundamentals of ultrasonic testing and how sound waves are used to detect internal flaws in materials.',
 E'# Introduction to Ultrasonic Testing

Ultrasonic Testing (UT) is one of the most widely used non-destructive testing methods in the industry. It uses high-frequency sound waves to detect internal flaws, measure material thickness, and characterize material properties.

## What is Ultrasonic Testing?

Ultrasonic testing works by sending high-frequency sound waves (typically 0.5-25 MHz) into a test material. When these waves encounter a boundary or discontinuity, they reflect back to the transducer, which then converts the sound energy into electrical signals for analysis.

## Key Advantages of UT

1. **Deep Penetration** - Can detect flaws deep within materials
2. **High Accuracy** - Precise measurements of flaw size and location
3. **Single-sided Access** - Only requires access to one surface
4. **Immediate Results** - Real-time display of test results
5. **Safe** - No radiation hazards

## Basic Components

### Transducer (Probe)
The transducer contains a piezoelectric crystal that converts electrical energy to mechanical (sound) energy and vice versa.

### Couplant
A liquid or gel that eliminates air gaps between the transducer and test piece, allowing efficient transmission of sound waves.

### Pulser/Receiver
Electronic unit that generates electrical pulses to drive the transducer and amplifies/processes received signals.

### Display
Shows the relationship between signal amplitude and time (distance), typically as an A-scan display.

## Common Applications

- Weld inspection
- Thickness measurement
- Corrosion detection
- Forgings and castings inspection
- Composite materials testing

## Getting Started

To become proficient in UT, you need to understand:
- Sound wave physics
- Material properties (velocity, attenuation)
- Equipment calibration
- Defect characterization
- Applicable codes and standards

> **Pro Tip:** Always calibrate your equipment on a reference standard before conducting actual inspections.

In the next article, we''ll dive deeper into the physics of ultrasonic waves and how they behave in different materials.',
 'UT', 'Level I', 'theory', 8, true, true),

-- Article 2: Sound Wave Physics
('Understanding Sound Wave Physics for UT',
 'understanding-sound-wave-physics-ut',
 'Master the fundamental physics of sound waves including wavelength, frequency, velocity, and how they relate to defect detection.',
 E'# Understanding Sound Wave Physics for UT

A solid understanding of sound wave physics is essential for any ultrasonic testing practitioner. This knowledge helps you select appropriate equipment and interpret test results correctly.

## Wave Characteristics

### Frequency (f)
The number of wave cycles per second, measured in Hertz (Hz) or Megahertz (MHz).

- **Low frequency (0.5-2 MHz)**: Better penetration, lower resolution
- **High frequency (5-25 MHz)**: Better resolution, less penetration

### Wavelength (λ)
The distance between two consecutive points of the same phase in a wave.

```
λ = V / f

Where:
λ = wavelength (mm)
V = velocity (m/s)
f = frequency (Hz)
```

### Velocity (V)
The speed at which sound travels through a material. Depends on:
- Material density
- Elastic properties
- Type of wave

**Common Velocities (Longitudinal):**
| Material | Velocity (m/s) |
|----------|----------------|
| Steel    | 5900           |
| Aluminum | 6320           |
| Water    | 1480           |
| Perspex  | 2730           |

## Types of Waves

### Longitudinal Waves
- Particle motion parallel to wave direction
- Used for straight beam testing
- Highest velocity in solids

### Shear (Transverse) Waves
- Particle motion perpendicular to wave direction
- Used for angle beam testing
- Velocity ≈ 0.5-0.6 × longitudinal velocity
- Cannot travel through liquids or gases

### Surface (Rayleigh) Waves
- Travel along the surface of materials
- Penetration depth ≈ one wavelength
- Used for surface crack detection

## Acoustic Impedance

Acoustic impedance (Z) determines how much sound reflects at an interface:

```
Z = ρ × V

Where:
Z = acoustic impedance
ρ = material density
V = sound velocity
```

The greater the impedance mismatch, the more reflection occurs.

## Attenuation

Sound intensity decreases as it travels through material due to:

1. **Absorption** - Energy converted to heat
2. **Scattering** - Wave redirected by grain boundaries
3. **Beam Spread** - Geometric spreading of the beam

> **Key Concept:** Higher frequency = higher attenuation = less penetration depth

## Practical Implications

When selecting test parameters:
- Use lower frequency for thick or coarse-grained materials
- Use higher frequency for thin materials or when resolution is critical
- Consider material properties when calculating depth and sizing defects',
 'UT', 'Level I', 'theory', 12, true, false),

-- Article 3: Snell's Law
('Snell''s Law and Beam Refraction in UT',
 'snells-law-beam-refraction-ut',
 'Understand how ultrasonic beams bend when entering different materials and calculate refraction angles using Snell''s Law.',
 E'# Snell''s Law and Beam Refraction in UT

When an ultrasonic beam crosses the boundary between two materials with different velocities, it changes direction. This phenomenon is called refraction, and it''s governed by Snell''s Law.

## Snell''s Law Formula

```
sin(θ₁) / V₁ = sin(θ₂) / V₂

Where:
θ₁ = incident angle
θ₂ = refracted angle
V₁ = velocity in first medium (wedge)
V₂ = velocity in second medium (test piece)
```

## Why is This Important?

Angle beam testing is essential for:
- Weld inspection
- Detecting vertical cracks
- Inspecting geometrically complex parts

The wedge angle determines the beam angle in the test material.

## Critical Angles

### First Critical Angle
When the refracted longitudinal wave reaches 90° (travels along surface).

```
θc₁ = arcsin(V₁ / V₂ₗ)
```

### Second Critical Angle
When the refracted shear wave reaches 90°.

```
θc₂ = arcsin(V₁ / V₂ₛ)
```

**Example (Perspex to Steel):**
- First critical angle: ≈ 27.5°
- Second critical angle: ≈ 57°

## Mode Conversion

Between the two critical angles, **only shear waves** propagate in the test material. This is the operating range for most angle beam probes.

Common probe angles: **45°, 60°, 70°** (in steel)

## Practical Calculation

**Problem:** A perspex wedge (V = 2730 m/s) is used to generate a 45° shear wave in steel (Vs = 3230 m/s). What wedge angle is needed?

**Solution:**
```
sin(θ₁) / 2730 = sin(45°) / 3230
sin(θ₁) = 2730 × 0.707 / 3230
sin(θ₁) = 0.598
θ₁ = 36.7°
```

> **Use our [UT Beam Angle Calculator](/e-learning/simulations) to perform these calculations instantly!**

## Tips for Angle Beam Testing

1. Always verify actual beam angle on a calibration block
2. Account for mode conversion at interfaces
3. Consider curved surfaces that affect refraction
4. Check for critical angle limitations with different materials',
 'UT', 'Level I', 'theory', 10, true, false);

-- Verify insertion
SELECT id, title, method, level, published FROM "Articles";
