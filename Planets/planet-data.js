window.PLANET_STATS = {
    "The Sun": {
        name: "The Sun",
        color: "#ffb84d",
        gravity: 274,
        distance: 0,
        moons: 0,
        temperature: 5500,
        gravityNote: "28× Earth — if you stood here you'd weigh almost 28 times more.",
        quickFacts: [
            { label: 'Type', value: 'G-type main-sequence star (yellow dwarf)' },
            { label: 'Diameter', value: 'about 1.39 million km — 109× Earth' },
            { label: 'Core Temperature', value: 'about 15 million °C' },
            { label: 'Age', value: 'about 4.6 billion years old' },
            { label: 'Rotation', value: 'about 25 days at the equator' }
        ],
        atmosphere: [
            { name: "Hydrogen", value: 91 },
            { name: "Helium", value: 8.9 },
            { name: "Other", value: 0.1 }
        ],
        atmosphereNote: "Photosphere composition by number; the Sun is plasma, not a solid planet with breathable air."
    },
    "Mercury": {
        name: "Mercury",
        color: "#b0b0b0",
        gravity: 3.7,
        distance: 57.9,
        moons: 0,
        temperature: 167,
        gravityNote: "0.38× Earth — about 38% of Earth's pull.",
        quickFacts: [
            { label: 'Size Rank', value: 'smallest planet in the Solar System' },
            { label: 'Day vs Year', value: 'a solar day (176 Earth days) is longer than its year (88 days)' },
            { label: 'Temperature Swing', value: '-173 °C at night to 427 °C in the day' },
            { label: 'Orbit Speed', value: 'fastest orbit of any planet — about 47 km per second' },
            { label: 'Rings', value: 'none' }
        ],
        atmosphere: [
            { name: "Oxygen", value: 42 },
            { name: "Sodium", value: 29 },
            { name: "Hydrogen", value: 22 },
            { name: "Helium", value: 6 },
            { name: "Potassium", value: 0.5 }
        ],
        atmosphereNote: "A very thin exosphere — barely a trace of gas."
    },
    "Venus": {
        name: "Venus",
        color: "#e6b35a",
        gravity: 8.87,
        distance: 108.2,
        moons: 0,
        temperature: 465,
        gravityNote: "0.90× Earth — nearly identical surface gravity.",
        quickFacts: [
            { label: 'Hottest Planet', value: '465 °C — hotter than Mercury despite being farther from the Sun' },
            { label: 'Rotation', value: 'spins backwards (retrograde rotation)' },
            { label: 'Day vs Year', value: 'a day (243 Earth days) is longer than a year (225 Earth days)' },
            { label: 'Atmospheric Pressure', value: 'about 90× Earth\'s — like standing 900 m underwater' },
            { label: 'Brightness', value: 'brightest natural object in our night sky after the Moon' }
        ],
        atmosphere: [
            { name: "Carbon Dioxide", value: 96.5 },
            { name: "Nitrogen", value: 3.5 },
            { name: "Other", value: 0.1 }
        ]
    },
    "Earth": {
        name: "Earth",
        color: "#4f8cff",
        gravity: 9.81,
        distance: 149.6,
        moons: 1,
        temperature: 15,
        gravityNote: "1.00× Earth — the baseline for every other world.",
        quickFacts: [
            { label: 'Life', value: 'the only known world to harbor life' },
            { label: 'Surface Water', value: 'about 71% of the surface is covered by oceans' },
            { label: 'Density', value: 'densest planet in the Solar System' },
            { label: 'Protection', value: 'a magnetic field and ozone layer shield life from solar radiation' },
            { label: 'Axial Tilt', value: '23.4° — gives us our seasons' }
        ],
        atmosphere: [
            { name: "Nitrogen", value: 78.1 },
            { name: "Oxygen", value: 20.9 },
            { name: "Argon", value: 0.9 },
            { name: "CO₂", value: 0.04 }
        ]
    },
    "The Moon": {
        name: "The Moon",
        color: "#cfcfcf",
        gravity: 1.62,
        distance: 149.6,
        moons: 0,
        temperature: -20,
        gravityNote: "0.17× Earth — you'd weigh less than one-sixth of your Earth weight.",
        quickFacts: [
            { label: 'Distance from Earth', value: 'about 384,400 km' },
            { label: 'Facing Earth', value: 'always shows us the same face (tidally locked)' },
            { label: 'Tides', value: 'its gravity drives Earth\'s ocean tides' },
            { label: 'Formation', value: 'likely born from a giant impact early in Earth\'s history' },
            { label: 'Atmosphere', value: 'no real atmosphere — the sky stays black even in daylight' }
        ],
        atmosphere: [
            { name: "Helium", value: 1 },
            { name: "Neon", value: 1 },
            { name: "Argon", value: 1 }
        ],
        atmosphereQualitative: true,
        atmosphereNote: "An ultra-thin exosphere — almost entirely helium, neon, and argon, with traces of other elements."
    },
    "Mars": {
        name: "Mars",
        color: "#e85d3f",
        gravity: 3.71,
        distance: 227.9,
        moons: 2,
        temperature: -63,
        gravityNote: "0.38× Earth — about 38% of Earth's pull.",
        quickFacts: [
            { label: 'Color', value: 'reddish from iron oxide (rust) in its soil' },
            { label: 'Tallest Volcano', value: 'Olympus Mons — about 22 km high, the tallest in the Solar System' },
            { label: 'Biggest Canyon', value: 'Valles Marineris — about 4,000 km long' },
            { label: 'Moons', value: '2 small, potato-shaped moons: Phobos and Deimos' },
            { label: 'Ancient Water', value: 'dried-up riverbeds and lakebeds show water once flowed' }
        ],
        atmosphere: [
            { name: "Carbon Dioxide", value: 95.3 },
            { name: "Nitrogen", value: 2.7 },
            { name: "Argon", value: 1.6 },
            { name: "Oxygen", value: 0.13 }
        ]
    },
    "Jupiter": {
        name: "Jupiter",
        color: "#d9a066",
        gravity: 24.79,
        distance: 778.5,
        moons: 101,
        temperature: -110,
        gravityNote: "2.53× Earth — more than double Earth's pull.",
        quickFacts: [
            { label: 'Size', value: 'so large that about 1,300 Earths could fit inside' },
            { label: 'Great Red Spot', value: 'a storm larger than Earth that has raged for centuries' },
            { label: 'Moons', value: '101 confirmed, including 4 large Galilean moons' },
            { label: 'Rotation', value: 'shortest day of any planet — about 9.9 hours' },
            { label: 'Magnetic Field', value: 'strongest magnetic field of any planet' }
        ],
        atmosphere: [
            { name: "Hydrogen", value: 89.8 },
            { name: "Helium", value: 10.2 },
            { name: "Other", value: 0.3 }
        ]
    },
    "Saturn": {
        name: "Saturn",
        color: "#e8d3a0",
        gravity: 10.44,
        distance: 1434,
        moons: 274,
        temperature: -140,
        gravityNote: "1.06× Earth — surprisingly close to Earth's gravity.",
        quickFacts: [
            { label: 'Rings', value: 'made of billions of chunks of ice and rock' },
            { label: 'Density', value: 'so light it could float in water' },
            { label: 'Moons', value: '274 confirmed, including Titan with its own thick atmosphere' },
            { label: 'Hexagon Storm', value: 'a hexagonal storm swirls around its north pole' },
            { label: 'Year Length', value: 'about 29.4 Earth years' }
        ],
        atmosphere: [
            { name: "Hydrogen", value: 96.3 },
            { name: "Helium", value: 3.25 },
            { name: "Other", value: 0.45 }
        ]
    },
    "Uranus": {
        name: "Uranus",
        color: "#6fd3d3",
        gravity: 8.69,
        distance: 2871,
        moons: 28,
        temperature: -195,
        gravityNote: "0.89× Earth — slightly weaker gravity than Earth.",
        quickFacts: [
            { label: 'Tilt', value: 'rolls on its side with a 98° tilt' },
            { label: 'Coldest Atmosphere', value: 'about -224 °C, the coldest in the Solar System' },
            { label: 'Discovery', value: 'first planet discovered with a telescope (1781)' },
            { label: 'Color', value: 'pale blue-green from methane gas' },
            { label: 'Type', value: 'an ice giant made mostly of water, methane, and ammonia' }
        ],
        atmosphere: [
            { name: "Hydrogen", value: 82.5 },
            { name: "Helium", value: 15.2 },
            { name: "Methane", value: 2.3 }
        ]
    },
    "Neptune": {
        name: "Neptune",
        color: "#4a6cff",
        gravity: 11.15,
        distance: 4495,
        moons: 16,
        temperature: -200,
        gravityNote: "1.14× Earth — about 14% stronger than Earth's pull.",
        quickFacts: [
            { label: 'Winds', value: 'fastest winds of any planet — up to about 2,100 km/h' },
            { label: 'Discovery', value: 'found through mathematics before it was seen through a telescope (1846)' },
            { label: 'Color', value: 'deep blue from methane in its atmosphere' },
            { label: 'Moon Triton', value: 'orbits backwards — the only large moon to do so' },
            { label: 'Year Length', value: 'about 165 Earth years — it completed one orbit since discovery in 2011' }
        ],
        atmosphere: [
            { name: "Hydrogen", value: 80 },
            { name: "Helium", value: 19 },
            { name: "Methane", value: 1.5 }
        ]
    }
};
