document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surprise-btn');
    const heroContent = document.getElementById('hero-content');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const scrollIndicator = document.getElementById('scroll-indicator');

    // 1. Surprise Button Click
    surpriseBtn.addEventListener('click', () => {
        // Fire Confetti using canvas-confetti library
        const duration = 4000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#b76e79', '#e0bfb8', '#ffffff', '#ffb6c1'] };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // Hide button, show hero text & main content
        surpriseBtn.classList.add('hidden');
        
        setTimeout(() => {
            surpriseBtn.style.display = 'none';
            heroContent.classList.remove('hidden');
            heroContent.classList.add('visible');
            
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            
            scrollIndicator.classList.remove('hidden');
            scrollIndicator.classList.add('visible');
            
            // Try playing background music. This is usually allowed here because it's triggered by a user interaction (click).
            bgMusic.volume = 0.5; // Start with half volume
            bgMusic.play().catch(e => console.log("Audio play blocked or source missing. Please make sure the audio file path is correct in index.html.", e));
            
            // Trigger scroll reveal logic once newly visible elements might be in viewport
            setTimeout(revealOnScroll, 100);
        }, 500);
    });

    // 2. Scroll Reveal Animation for Timeline and Cards
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);

    // 3. Secret Envelope Interaction
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const typewriterText = document.getElementById('typewriter-text');
    const message = "نتمناولك عام جديد يعبي حياتك بالنجاح، الفرحة، والراحة اللي تستاهلها. عيشك ختارك ديما موجودة، وإن شاء الله العام هذا يكون بداية لكل حاجة حلوة تتمنّاها! 🌟💖";
    let isTyping = false;
    let typeIndex = 0;

    envelopeWrapper.addEventListener('click', () => {
        if (!envelopeWrapper.classList.contains('open')) {
            envelopeWrapper.classList.add('open');
            
            if (!isTyping) {
                isTyping = true;
                setTimeout(() => {
                    typeWriter();
                }, 800); // Wait for the envelope opening animation to finish
            }
        }
    });

    function typeWriter() {
        if (typeIndex < message.length) {
            // Handle line breaks
            if (message.charAt(typeIndex) === '\n') {
                typewriterText.innerHTML += '<br>';
            } else {
                typewriterText.innerHTML += message.charAt(typeIndex);
            }
            typeIndex++;
            setTimeout(typeWriter, 50); // Adjust typing speed here
        }
    }

    // 4. Interactive Wishes Grid (Flip Cards)
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        
        // Accessibility: allow flipping with Enter/Space key when focused
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
});
