const notesManager = {
    render: async () => {
        const container = document.getElementById('notes-container');
        if (!container) return;
        container.innerHTML = 'Loading...';

        try {
            const notes = await api.getNotes();
            container.innerHTML = '';
            
            notes.forEach(note => {
                const div = document.createElement('div');
                div.className = 'glass-card note-card';
                div.innerHTML = `
                    <h4>${note.title}</h4>
                    <p>${note.body}</p>
                    <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: auto;">${new Date(note.created_at).toLocaleDateString()}</span>
                `;
                div.onclick = () => alert("Note: " + note.title + "\n\n" + note.body);
                container.appendChild(div);
            });

            if (notes.length === 0) {
                container.innerHTML = '<div class="placeholder-text">No notes yet. Click "+ New Note" to start.</div>';
            }
        } catch (e) {
            console.error(e);
            container.innerHTML = 'Error loading notes.';
        }
    },

    createNew: () => {
        const modal = document.getElementById('note-editor');
        if (modal) {
            modal.classList.remove('hidden');
            document.getElementById('note-title-input').value = '';
            document.getElementById('note-body-input').value = '';
        } else {
            // Primitive prompt if modal HTML is missing
            const title = prompt("Note Title:");
            const body = prompt("Note Content:");
            if (title && body) notesManager.save(title, body);
        }
    },

    closeEditor: () => {
        const modal = document.getElementById('note-editor');
        if (modal) modal.classList.add('hidden');
    },

    saveCurrent: async () => {
        const title = document.getElementById('note-title-input').value;
        const body = document.getElementById('note-body-input').value;
        if (title && body) {
            await notesManager.save(title, body);
            notesManager.closeEditor();
        }
    },

    save: async (title, body) => {
        try {
            await api.createNote(title, body);
            await api.addXP(5); // Small reward for taking notes
            notesManager.render();
            // Trigger stats update
            app.refreshUser();
        } catch (e) {
            alert('Failed to save note');
        }
    }
};
