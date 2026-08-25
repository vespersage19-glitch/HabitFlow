document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.habit-cb');
    const completionText = document.getElementById('completion-text');
    const progressWrapper = document.querySelector('.circle-progress-wrapper');
    const ctx = document.getElementById('weeklyChart').getContext('2d');

    // 1. Percentage Calculation Logic
    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.habit-cb:checked').length;
        const percentage = total === 0 ? 0 : Math.round((checked / total) * 100);
        
        // Update Text
        completionText.textContent = `${percentage}%`;
        
        // Update Circular UI Ring
        if (progressWrapper) {
            progressWrapper.style.background = `radial-gradient(closest-side, #151d30 79%, transparent 80% 100%), conic-gradient(#10b981 ${percentage}%, #1e293b 0%)`;
        }
    }

    // Checkboxes change listeners
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateProgress);
    });

    // 2. Weekly Statistics Chart Config
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Completion %',
                data:, 
                backgroundColor: '#10b981',
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
                y: { min: 0, max: 100, ticks: { color: '#9ca3af', stepSize: 25 }, grid: { color: '#24324f' } }
            }
        }
    });

    // Initial state trigger
    updateProgress();
});

