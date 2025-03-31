function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('active');
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-labels label').forEach(label => {
        label.addEventListener('click', (e) => {
            const tabId = e.target.getAttribute('for');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = content.id === tabId + '-content' ? 'block' : 'none';
            });
        });
    });
});