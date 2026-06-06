document.addEventListener('DOMContentLoaded', () => {
    // --- Invitation Open & Music ---
    const btnOpen = document.getElementById('open-invitation');
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    const floatingUI = document.getElementById('floating-ui');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');
    
    let isMusicPlaying = false;

    // Set music volume (0.0 to 1.0)
    bgMusic.volume = 0.3;

    // Get URL Parameter for Guest Name (like ?to=BUDHE DIANA)
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to');
    if (guestNameParam) {
        document.getElementById('guest-name').innerText = guestNameParam;
    } else {
        document.getElementById('guest-name').innerText = "Tamu Undangan";
    }

    btnOpen.addEventListener('click', () => {
        // Hide cover with fade
        coverPage.classList.add('fade-out');
        
        setTimeout(() => {
            coverPage.style.display = 'none';
            // Show main content
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');
            floatingUI.classList.remove('hidden');
            
            // Play music
            playMusic();
        }, 1000); // match transition duration
    });

    // --- Music Control ---
    function playMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.remove('paused');
            musicIcon.classList.replace('ph-speaker-slash', 'ph-speaker-high');
        }).catch(err => console.log("Audio play failed:", err));
    }

    function pauseMusic() {
        bgMusic.pause();
        isMusicPlaying = false;
        musicBtn.classList.add('paused');
        musicIcon.classList.replace('ph-speaker-high', 'ph-speaker-slash');
    }

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // --- Navigation Active State (Simple Scroll Spy) ---
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});
