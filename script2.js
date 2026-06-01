document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const proposalCard = document.getElementById('proposal-card');
    const successCard = document.getElementById('success-card');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    
    const alertOverlay = document.getElementById('alert-overlay');
    const btnAlertClose = document.getElementById('btn-alert-close');
    
    const heartsRainContainer = document.getElementById('hearts-rain');
    


    let rainIntervalId = null;
    let isRainActive = false;

    // List of emojis to rain down
    const heartEmojis = [
        '❤️', '💖', '💝', '💕', '💗', '💓', '💞', '💍', 
        '🌸', '✨', '🧸', '🐣', '🍓', '🎀', '🎈'
    ];



    // Helper to start the rain of hearts
    function startHeartsRain() {
        if (isRainActive) return;
        isRainActive = true;
        
        // Initial burst of hearts
        for (let i = 0; i < 30; i++) {
            setTimeout(createHeartParticle, i * 80);
        }

        // Continuous rain of hearts
        rainIntervalId = setInterval(createHeartParticle, 120);
    }

    // Helper to stop the rain of hearts
    function stopHeartsRain() {
        if (!isRainActive) return;
        isRainActive = false;
        if (rainIntervalId) {
            clearInterval(rainIntervalId);
            rainIntervalId = null;
        }
        // Let existing particles fall and clear out
    }

    // Create a single falling heart particle
    function createHeartParticle() {
        if (!isRainActive) return;

        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        
        // Randomize emoji (mostly hearts, occasional sparkles/flowers)
        const randomChoice = Math.random();
        let emoji = '❤️';
        if (randomChoice < 0.6) {
            // 60% chance for standard red/pink hearts
            const hearts = ['❤️', '💖', '💝', '💕', '💗', '💓', '💞'];
            emoji = hearts[Math.floor(Math.random() * hearts.length)];
        } else if (randomChoice < 0.8) {
            // 20% chance for sparkles/flowers
            const flowers = ['🌸', '✨', '🎀', '🎈'];
            emoji = flowers[Math.floor(Math.random() * flowers.length)];
        } else {
            // 20% chance for cute objects (bears, strawberries, etc.)
            const cuteStuff = ['🧸', '🐣', '🍓'];
            emoji = cuteStuff[Math.floor(Math.random() * cuteStuff.length)];
        }

        heart.innerHTML = emoji;

        // Randomize styles
        const startX = Math.random() * 100; // in vw
        const size = Math.random() * 24 + 16; // 16px to 40px
        const duration = Math.random() * 3 + 3; // 3s to 6s
        const opacity = Math.random() * 0.5 + 0.45; // 0.45 to 0.95
        const drift = Math.random() * 200 - 100; // -100px to 100px drift

        heart.style.left = startX + 'vw';
        heart.style.fontSize = size + 'px';
        heart.style.animationDuration = duration + 's';
        heart.style.opacity = opacity;
        heart.style.setProperty('--drift', drift + 'px');

        // Rotation direction
        const rotSign = Math.random() > 0.5 ? 1 : -1;
        heart.style.transform = `rotate(${Math.random() * 360 * rotSign}deg)`;

        heartsRainContainer.appendChild(heart);

        // Remove element after animation completes to avoid memory leak
        setTimeout(() => {
            heart.remove();
        }, duration * 1000 + 200);
    }

    // No Button handler
    btnNo.addEventListener('click', () => {
        // Show custom alert card overlay
        alertOverlay.classList.add('active');

        // Animate button removal
        btnNo.style.transform = 'scale(0) rotate(-15deg)';
        btnNo.style.opacity = '0';
        
        setTimeout(() => {
            btnNo.style.display = 'none';
        }, 300);
    });

    // Close alert overlay handler
    btnAlertClose.addEventListener('click', () => {
        alertOverlay.classList.remove('active');
    });

    // Yes Button handler (Proposal accepted!)
    btnYes.addEventListener('click', () => {


        // Transition from Proposal card to Success card
        proposalCard.classList.remove('active');
        proposalCard.classList.add('hidden');
        
        setTimeout(() => {
            successCard.classList.remove('hidden');
            successCard.classList.add('active');
            
            // Trigger background rain of hearts
            startHeartsRain();
        }, 400);
    });


});
