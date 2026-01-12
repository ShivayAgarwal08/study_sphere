/**
 * StudySphere STANDALONE API
 * This module replaces the backend server with LocalStorage.
 */

const api = {
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
            let index = data.findIndex(i => i.id === id);
            if (index !== -1) {
                data[index] = { ...data[index], ...updates };
                api._db.set(key, data);
                return data[index];
            }
            return null;
        }
    },

    token: localStorage.getItem('access_token'),

    setToken: (token) => {
        api.token = token;
        localStorage.setItem('access_token', token);
    },

    clearToken: () => {
        api.token = null;
        api.currentUserId = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('current_user_id');
        localStorage.removeItem('user_data');
    },

    login: async (email, password) => {
        await new Promise(r => setTimeout(r, 400));
        const users = api._db.get('users');
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Invalid credentials');
        
        api.setToken("mock-token-" + user.id);
        localStorage.setItem('current_user_id', user.id);
        localStorage.setItem('user_data', JSON.stringify(user));
        return { access_token: api.token };
    },

    signup: async (email, full_name, password) => {
        await new Promise(r => setTimeout(r, 400));
        if (api._db.find('users', u => u.email === email)) throw new Error('Email exists');

        const user = api._db.insert('users', {
            email, full_name, password,
            xp: 0, level: 1, streak: 1,
            is_pro: false, course_type: "", semester: "", study_goal_hours: 2
        });
        
        api.setToken("mock-token-" + user.id);
        localStorage.setItem('current_user_id', user.id);
        localStorage.setItem('user_data', JSON.stringify(user));
        return { access_token: api.token };
    },

    getMe: async () => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        const user = api._db.find('users', u => u.id === id);
        if (!user) throw new Error('Auth required');
        localStorage.setItem('user_data', JSON.stringify(user)); // Sync
        return user;
    },

    updateProfile: async (data) => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        const updated = api._db.update('users', id, data);
        localStorage.setItem('user_data', JSON.stringify(updated));
        return updated;
    },

    requestXPReward: async (type) => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        const user = api._db.find('users', u => u.id === id);
        let gain = type === 'task' ? 10 : (type === 'pomodoro' ? 50 : 20);
        
        const newXp = user.xp + gain;
        const newLvl = Math.floor(newXp / 100) + 1;
        return api.updateProfile({ xp: newXp, level: newLvl });
    },

    getTasks: async () => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        return api._db.get('tasks').filter(t => t.owner_id === id);
    },

    createTask: async (text) => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        return api._db.insert('tasks', { text, completed: false, owner_id: id });
    },

    toggleTask: async (id, status, text) => {
        const updated = api._db.update('tasks', id, { completed: !status });
        if (updated.completed) await api.requestXPReward('task');
        return updated;
    },

    getSubjects: async () => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        return api._db.get('subjects').filter(s => s.owner_id === id);
    },

    createSubject: async (name, syllabus, next) => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        await api.requestXPReward('subject');
        return api._db.insert('subjects', { name, syllabus, next_class: next, owner_id: id, progress: 0 });
    },

    getNotes: async () => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        return api._db.get('notes').filter(n => n.owner_id === id);
    },

    createNote: async (title, body) => {
        const id = parseInt(localStorage.getItem('current_user_id'));
        return api._db.insert('notes', { title, body, owner_id: id, created_at: new Date().toISOString() });
    },

    getGroups: async () => api._db.get('groups'),
    createGroup: async (name, description, goal) => {
        return api._db.insert('groups', { name, description, goal, members: 1 });
    },
    getMessages: async (groupId) => api._db.get('msgs').filter(m => m.groupId === groupId),
    sendMessage: async (groupId, content) => {
        const user = JSON.parse(localStorage.getItem('user_data'));
        return api._db.insert('msgs', { groupId, content, sender: user.full_name, time: new Date().toLocaleTimeString() });
    },
    joinGroup: async () => ({ message: "Success" })
};
