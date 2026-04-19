const academicManager = {
    render: async () => {
        const container = document.getElementById('subjects-container');
        if (!container) return;
        container.innerHTML = 'Loading...';
        
        try {
            const subjects = await api.getSubjects();
            container.innerHTML = '';
            
            subjects.forEach(sub => {
                const card = document.createElement('div');
                card.className = 'glass-card subject-card';
                
                let syllabus = [];
                if (sub.syllabus) {
                     syllabus = sub.syllabus.split(',');
                }

                const syllabusHtml = syllabus.map(topic => `<li>${topic}</li>`).join('');

                card.innerHTML = `
                    <div class="subject-header">
                        <h3 style="color: white;">${sub.name}</h3>
                    </div>
                    <div class="subject-info" style="padding: 1.5rem; padding-top:0;">
                        <div class="progress-bar-container">
                            <div class="label"><span>Progress</span> <span>${sub.progress}%</span></div>
                            <div class="progress-bar"><div class="fill" style="width: ${sub.progress}%"></div></div>
                        </div>
                        
                        <div style="margin-top: 1rem;">
                            <strong><i class="ph ph-clock"></i> Next Class:</strong> ${sub.next_class}
                        </div>

                        <div style="margin-top: 1rem;">
                            <strong><i class="ph ph-list-dashes"></i> Syllabus:</strong>
                            <ul style="padding-left: 1.2rem; font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">
                                ${syllabusHtml}
                            </ul>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
            
            if (subjects.length === 0) {
                container.innerHTML = '<div class="placeholder-text">No subjects added yet.</div>';
            }
        } catch (e) {
            console.error(e);
            container.innerHTML = 'Error loading subjects.';
        }
    },

    addSubject: async () => {
        const name = prompt("Subject Name (e.g. Physics):");
        if (!name) return;
        const syllabus = prompt("Syllabus topics (comma separated):", "Topic 1, Topic 2");
        const nextClass = prompt("Next Class (e.g. Mon 10:00 AM):", "TBA");
        
        try {
            await api.createSubject(name, syllabus, nextClass);
            await api.addXP(20); // Reward for planning
            academicManager.render();
            app.refreshUser();
        } catch (e) {
            alert("Failed to add subject");
        }
    }
};
