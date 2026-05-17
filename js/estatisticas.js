<script>

// Função que anima os números
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString('pt-BR') + (obj.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end.toLocaleString('pt-BR') + (obj.dataset.suffix || '');
        }
    };
    window.requestAnimationFrame(step);
}

// Quando a página carregar completamente...
window.addEventListener('load', () => {
    const stats = document.querySelectorAll('.stat-number');

    // ... cria um observador que detecta quando o usuário vê a seção...
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const num = entry.target;
                const target = parseInt(num.getAttribute('data-target'));
                animateValue(num, 0, target, 1800);
                observer.unobserve(num);
            }
        });
    }, { threshold: 0.5 }); // ... e dispara quando 50% do elemento está visível

    stats.forEach(stat => observer.observe(stat));
});
</script>