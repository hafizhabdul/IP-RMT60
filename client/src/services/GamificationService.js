/**
 * Gamification Service
 * Handles XP, Levels, Badges, and Streaks using LocalStorage.
 * Designed to work for both guests and logged-in users (client-side persistence).
 */

const STORAGE_KEY = 'ndt_gamification_v1';

const BADGES = {
    FIRST_STEPS: { id: 'first_steps', name: 'First Steps', icon: '👣', description: 'Started your NDT journey' },
    BEAM_MASTER: { id: 'beam_master', name: 'Beam Master', icon: '📡', description: 'Calculated beam angles correctly' },
    MAGNET_MASTER: { id: 'magnet_master', name: 'Magnet Master', icon: '🧲', description: 'Detected cracks with MT' },
    QUIZ_WHIZ: { id: 'quiz_whiz', name: 'Quiz Whiz', icon: '🧠', description: 'Passed a quiz with 100%' },
    DEDICATED: { id: 'dedicated', name: 'Dedicated', icon: '🔥', description: '3 Day Streak' }
};

const LEVELS = [
    { level: 1, xp: 0, title: 'Novice Inspector' },
    { level: 2, xp: 100, title: 'Level I Trainee' },
    { level: 3, xp: 300, title: 'Level I Certified' },
    { level: 4, xp: 600, title: 'Level II Candidate' },
    { level: 5, xp: 1000, title: 'Level II Inspector' }
];

export const GamificationService = {
    // Get current state
    getState: () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
        return {
            xp: 0,
            level: 1,
            badges: [],
            streak: 1,
            lastActive: new Date().toISOString()
        };
    },

    // Save state
    saveState: (state) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return state;
    },

    // Add XP and check for level up
    addXP: (amount) => {
        const state = GamificationService.getState();
        const oldLevel = state.level;
        state.xp += amount;

        // Calculate Level
        let newLevel = 1;
        for (let i = 0; i < LEVELS.length; i++) {
            if (state.xp >= LEVELS[i].xp) {
                newLevel = LEVELS[i].level;
            }
        }

        state.level = newLevel;
        state.lastActive = new Date().toISOString();

        GamificationService.saveState(state);

        return {
            newXP: state.xp,
            levelUp: newLevel > oldLevel,
            currentLevel: newLevel,
            nextLevelXP: GamificationService.getNextLevelXP(newLevel)
        };
    },

    // Unlock a badge
    unlockBadge: (badgeId) => {
        const state = GamificationService.getState();
        if (state.badges.includes(badgeId)) return false; // Already unlocked

        state.badges.push(badgeId);
        GamificationService.saveState(state);
        return Object.values(BADGES).find(b => b.id === badgeId);
    },

    getNextLevelXP: (currentLevel) => {
        const next = LEVELS.find(l => l.level === currentLevel + 1);
        return next ? next.xp : Infinity;
    },

    getLevelTitle: (level) => {
        const l = LEVELS.find(item => item.level === level);
        return l ? l.title : 'Master Inspector';
    },

    BADGES
};
