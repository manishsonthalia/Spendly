// main.js — students will add JavaScript here as features are built

// ------------------------------------------------------------------ //
// Video modal                                                         //
// ------------------------------------------------------------------ //

(function () {
    const trigger = document.getElementById('how-it-works-btn');
    if (!trigger) return; // only runs on landing page

    const overlay = document.getElementById('video-modal');
    const iframe  = document.getElementById('modal-iframe');
    const closeBtn = document.getElementById('modal-close-btn');

    function openModal(e) {
        e.preventDefault();
        iframe.src = iframe.dataset.src;
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        iframe.src = '';
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
    }

    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });
}());
