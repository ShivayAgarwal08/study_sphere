/**
 * StudySphere STANDALONE API
 * This module replaces the backend server with LocalStorage.
 * It provides the same interface as the real API to keep the UI logic intact.
 */

const api = {
    // Utility to get/set data from localStorage
    _db: {
        get: (key) => JSON.parse(localStorage.getItem(`ss_db_${key}`)) || [],
        set: (key, data) => localStorage.setItem(`ss_db_${key}`, JSON.stringify(data)),
        find: (key, predicate) => api._db.get(key).find(predicate),
        insert: (key, item) => {
            const data = api._db.get(key);
            item.id = Date.now() + Math.floor(Math.random() * 1000);
            data.push(item);
            api._db.set(key, data);
            return item;
        },
        update: (key, id, updates) => {
            let data = api._db.get(key);
            let item = data.find(i => i.id === id);
            if (item) {
                Object.assign(item, updates);
                api._db.set(key, data);
            }
            return item;
        }
    },

    token: localStorage.getItem('access_token'),

    setToken: (token) => {
        api.token = token;
        localStorage.setItem('access_token', token);
    },

    clearToken: () => {
        api.token = null;
        localStorage.removeItem('access_token');
    },

    // Auth
    login: async (email, password) => {
        // Mock delay
        await new Promise(r => setTimeout(r, 500));
        const users = api._db.get('users');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) throw new Error('Invalid email or password');
        
        const token = "mock-jwt-token-" + user.id;
        api.setToken(token);
        localStorage.setItem('current_user_id', user.id);
        return { access_token: token, token_type: "bearer" };
    },

    signup: async (email, full_name, password) => {
        await new Promise(r => setTimeout(r, 500));
        const users = api._db.get('users');
        if (users.find(u => u.email === email)) throw new Error('Email already registered');

        const newUser = {
            email,
            full_name,
            password,
            xp: 0,
            level: 1,
            streak: 0,
            is_pro: false,
            course_type: "",
            semester: "",
            study_goal_hours: 2,
            avatar: null
        };
        
        const createdUser = api._db.insert('users', newUser);
        const token = "mock-jwt-token-" + createdUser.id;
        api.setToken(token);
        localStorage.setItem('current_user_id', createdUser.id);
        return { access_token: token, token_type: "bearer" };
    },

    getMe: async () => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        const user = api._db.get('users').find(u => u.id === userId);
        if (!user) throw new Error('Not logged in');
        return user;
    },

    // User / Profile / XP
    updateProfile: async (profileData) => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        return api._db.update('users', userId, profileData);
    },

    requestXPReward: async (actionType, referenceId = null) => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        const user = api._db.find('users', u => u.id === userId);
        
        let xp_gain = 0;
        if (actionType === 'task') xp_gain = 10;
        else if (actionType === 'pomodoro') xp_gain = 50;
        else if (actionType === 'subject') xp_gain = 20;

        if (xp_gain > 0) {
            user.xp += xp_gain;
            user.level = Math.floor(user.xp / 100) + 1;
            api._db.update('users', userId, { xp: user.xp, level: user.level });
        }
        return user;
    },

    upgradePro: async () => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        return api._db.update('users', userId, { is_pro: true });
    },

    // Tasks
    getTasks: async () => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        return api._db.get('tasks').filter(t => t.owner_id === userId);
    },

    createTask: async (text) => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        return api._db.insert('tasks', { text, completed: false, owner_id: userId });
    },

    toggleTask: async (taskId, currentStatus, text) => {
        const updated = api._db.update('tasks', taskId, { completed: !currentStatus });
        if (updated.completed) await api.requestXPReward('task', taskId);
        return updated;
    },

    // Subjects
    getSubjects: async () => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        return api._db.get('subjects').filter(s => s.owner_id === userId);
    },

    createSubject: async (name, syllabus, nextClass) => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        const newSub = api._db.insert('subjects', { 
            name, 
            syllabus: typeof syllabus === 'string' ? syllabus : syllabus.join(','), 
            next_class: nextClass,
            owner_id: userId,
            progress: 0
        });
        await api.requestXPReward('subject');
        return newSub;
    },

    // Notes
    getNotes: async () => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        return api._db.get('notes').filter(n => n.owner_id === userId);
    },

    createNote: async (title, body) => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        return api._db.insert('notes', { title, body, created_at: new Date().toISOString(), owner_id: userId });
    },

    // Groups & Messages
    getGroups: async () => {
        // In local mode, we'll just show all created groups as joined
        return api._db.get('groups');
    },

    createGroup: async (name, description, goal) => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        return api._db.insert('groups', { name, description, goal, created_at: new Date().toISOString() });
    },

    getMessages: async (groupId) => {
        return api._db.get('messages').filter(m => m.groupId === groupId);
    },

    sendMessage: async (groupId, content) => {
        const userId = parseInt(localStorage.getItem('current_user_id'));
        const user = api._db.find('users', u => u.id === userId);
        return api._db.insert('messages', { groupId, content, sender_id: userId, sender_name: user.full_name, timestamp: new Date().toISOString() });
    },

    joinGroup: async (groupId) => {
        return { message: "Joined successfully" };
    }
};
