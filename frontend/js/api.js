const API_URL = 'http://localhost:8000';

const api = {
    token: localStorage.getItem('access_token'),

    getHeaders: () => {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (api.token) {
            headers['Authorization'] = `Bearer ${api.token}`;
        }
        return headers;
    },

    setToken: (token) => {
        api.token = token;
        localStorage.setItem('access_token', token);
    },

    clearToken: () => {
        api.token = null;
        localStorage.removeItem('access_token');
    },

    // Auth
    login: async (username, password) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();
        api.setToken(data.access_token);
        return data;
    },

    signup: async (email, full_name, password) => {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, full_name, password })
        });
        if (!res.ok) throw new Error('Signup failed');
        const data = await res.json();
        api.setToken(data.access_token);
        return data;
    },

    getMe: async () => {
        const res = await fetch(`${API_URL}/auth/me`, {
            headers: api.getHeaders()
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        return await res.json();
    },

    // User / Profile / XP
    updateProfile: async (profileData) => {
        const res = await fetch(`${API_URL}/users/profile`, {
            method: 'PUT',
            headers: api.getHeaders(),
            body: JSON.stringify(profileData)
        });
        return await res.json();
    },

    requestXPReward: async (actionType, referenceId = null) => {
        const res = await fetch(`${API_URL}/users/reward-xp`, {
            method: 'POST',
            headers: api.getHeaders(),
            body: JSON.stringify({ action_type: actionType, reference_id: referenceId })
        });
        return await res.json();
    },

    upgradePro: async () => {
        const res = await fetch(`${API_URL}/users/upgrade-pro`, {
            method: 'POST',
            headers: api.getHeaders()
        });
        return await res.json();
    },

    // Tasks
    getTasks: async () => {
        const res = await fetch(`${API_URL}/tasks/`, {
            headers: api.getHeaders()
        });
        return await res.json();
    },

    createTask: async (text) => {
        const res = await fetch(`${API_URL}/tasks/`, {
            method: 'POST',
            headers: api.getHeaders(),
            body: JSON.stringify({ text, completed: false })
        });
        return await res.json();
    },

    toggleTask: async (taskId, currentStatus, text) => {
        const res = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: api.getHeaders(),
            body: JSON.stringify({ text, completed: !currentStatus })
        });
        const data = await res.json();
        // Request XP if completed
        if (data.completed) {
            await api.requestXPReward('task', taskId);
        }
        return data;
    },

    // Subjects
    getSubjects: async () => {
        const res = await fetch(`${API_URL}/subjects/`, {
            headers: api.getHeaders()
        });
        return await res.json();
    },

    createSubject: async (name, syllabus, nextClass) => {
        const res = await fetch(`${API_URL}/subjects/`, {
            method: 'POST',
            headers: api.getHeaders(),
            body: JSON.stringify({ 
                name, 
                syllabus: typeof syllabus === 'string' ? syllabus : syllabus.join(','),
                next_class: nextClass 
            })
        });
        const data = await res.json();
        await api.requestXPReward('subject');
        return data;
    },

    // Notes
    getNotes: async () => {
        const res = await fetch(`${API_URL}/notes/`, {
            headers: api.getHeaders()
        });
        return await res.json();
    },

    createNote: async (title, body) => {
        const res = await fetch(`${API_URL}/notes/`, {
            method: 'POST',
            headers: api.getHeaders(),
            body: JSON.stringify({ title, body })
        });
        return await res.json();
    },

    // Groups & Messages
    getGroups: async () => {
        const res = await fetch(`${API_URL}/groups/`, {
            headers: api.getHeaders()
        });
        return await res.json();
    },

    createGroup: async (name, description, goal) => {
        const res = await fetch(`${API_URL}/groups/`, {
            method: 'POST',
            headers: api.getHeaders(),
            body: JSON.stringify({ name, description, goal })
        });
        return await res.json();
    },

    getMessages: async (groupId) => {
        const res = await fetch(`${API_URL}/groups/${groupId}/messages`, {
            headers: api.getHeaders()
        });
        return await res.json();
    },

    sendMessage: async (groupId, content) => {
        const res = await fetch(`${API_URL}/groups/${groupId}/messages`, {
            method: 'POST',
            headers: api.getHeaders(),
            body: JSON.stringify({ content })
        });
        return await res.json();
    },

    joinGroup: async (groupId) => {
        const res = await fetch(`${API_URL}/groups/${groupId}/join`, {
            method: 'POST',
            headers: api.getHeaders()
        });
        return await res.json();
    }
};
