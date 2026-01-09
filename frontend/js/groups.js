const groupsManager = {
    render: async () => {
        const container = document.getElementById('groups-container');
        if (!container) return;
        container.innerHTML = 'Loading...';
        
        try {
            const groups = await api.getGroups();
            container.innerHTML = '';
            
            groups.forEach(group => {
                const div = document.createElement('div');
                div.className = 'glass-card group-card';
                div.innerHTML = `
                    <h3>${group.name}</h3>
                    <p>${group.description}</p>
                    <div style="font-size: 0.8rem; margin-top: 1rem; color: var(--accent);">Goal: ${group.goal}</div>
                    <button class="btn btn-sm btn-secondary" style="margin-top: 1rem;" onclick="groupsManager.openChat(${group.id}, '${group.name}')">Enter Group Chat</button>
                `;
                container.appendChild(div);
            });
            
            if (groups.length === 0) {
                container.innerHTML = '<div class="placeholder-text">No groups joined. Join or create one!</div>';
            }
        } catch (e) {
            console.error(e);
            container.innerHTML = 'Error loading groups.';
        }
    },

    create: async () => {
        const name = prompt("Group Name:");
        if (!name) return;
        const description = prompt("Description:");
        const goal = prompt("Group Goal:");
        
        try {
            await api.createGroup(name, description, goal);
            groupsManager.render();
        } catch (e) {
            alert("Create group failed");
        }
    },

    openChat: async (groupId, groupName) => {
        const modal = document.getElementById('chat-modal');
        modal.classList.remove('hidden');
        document.getElementById('chat-group-name').textContent = groupName;
        document.getElementById('current-group-id').value = groupId;
        
        groupsManager.loadMessages(groupId);
        // Start polling
        if (groupsManager.chatInterval) clearInterval(groupsManager.chatInterval);
        groupsManager.chatInterval = setInterval(() => groupsManager.loadMessages(groupId), 3000);
    },

    closeChat: () => {
        document.getElementById('chat-modal').classList.add('hidden');
        if (groupsManager.chatInterval) clearInterval(groupsManager.chatInterval);
    },

    loadMessages: async (groupId) => {
        const messageList = document.getElementById('message-list');
        try {
            const messages = await api.getMessages(groupId);
            messageList.innerHTML = '';
            messages.forEach(msg => {
                const div = document.createElement('div');
                div.className = `message ${msg.sender_id === JSON.parse(localStorage.getItem('user_data')).id ? 'sent' : 'received'}`;
                div.textContent = msg.content;
                messageList.appendChild(div);
            });
            messageList.scrollTop = messageList.scrollHeight;
        } catch (e) {
            console.error(e);
        }
    },

    sendMessage: async () => {
        const input = document.getElementById('chat-input');
        const groupId = document.getElementById('current-group-id').value;
        if (!input.value.trim()) return;
        
        try {
            await api.sendMessage(groupId, input.value);
            input.value = '';
            groupsManager.loadMessages(groupId);
        } catch (e) {
            alert("Send failed");
        }
    }
};
