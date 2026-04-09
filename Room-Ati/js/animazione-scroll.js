const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.closest('.timeline-card').classList.add('in-view');
            entry.target.closest('.timeline-evento').classList.add('in-view');
        } else {
            entry.target.closest('.timeline-card').classList.remove('in-view');
            entry.target.closest('.timeline-evento').classList.remove('in-view');
        }
    });
}, {
    threshold: 0,
    rootMargin: '0px 0px -60% 0px'  // si attiva quando la card è a metà schermo
});

document.querySelectorAll('.timeline-card').forEach(card => {
    observer.observe(card);
});