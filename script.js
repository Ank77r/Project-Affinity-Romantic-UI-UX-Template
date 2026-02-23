$(document).ready(function() {
    createParticles();
    setTimeout(() => { $('#boot-screen').fadeOut(800); $('#login-screen').css('display', 'flex').hide().fadeIn(800); }, 3500);
    startTimeCapsule();
    const card = document.getElementById('tilt-card');
    document.addEventListener('mousemove', (e) => {
        if($('#login-screen').is(':visible')){
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40; const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Simple UX: Bring active window to front
    $('.window').mousedown(function() {
        $('.window').css('z-index', 10);
        $(this).css('z-index', 100);
    });
});

// Generic Template Memories with Unsplash Images
const memories = [
    { img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400", date: "The Beginning", note: "The day everything changed for the better. ❤️" },
    { img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400", date: "First Meetup", note: "That day when I felt peak nervousness... but it was the best day ever. 👉👈" },
    { img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=400", date: "Adventures", note: "Just some of the amazing moments we've shared together. 🤫" },
    { img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400", date: "Cozy Times", note: "The moments I felt true happiness, just being comfortable with you. 🥺" },
    { img: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=400", date: "Random Clicks", note: "Every moment captured is a beautiful memory. ❤️" }
];

function createParticles() {
    const container = $('#login-screen');
    for (let i = 0; i < 40; i++) {
        let size = Math.random() * 8 + 4; let left = Math.random() * 100; let duration = Math.random() * 8 + 4; let delay = Math.random() * 5; 
        let particle = $('<div class="particle"></div>');
        particle.css({ width: size + 'px', height: size + 'px', left: left + '%', animationDuration: duration + 's', animationDelay: delay + 's' });
        container.append(particle);
    }
}

function startOS() {
    document.getElementById('bg-music').play().catch(e => console.log("Audio needs user interaction first"));
    $('#login-screen').fadeOut(800, function() {
        $('#desktop').fadeIn(1000); renderGallery(); setTimeout(() => { openWindow('win-chat'); startChat(); }, 1000);
    });
}

$( ".window" ).draggable({ handle: ".win-header", containment: "#desktop", stack: ".window" });
function openWindow(id) { $('#' + id).css('display', 'flex').hide().fadeIn(200); document.getElementById('sfx-pop').play(); if(id === 'win-notes') typeNote(); }
function closeWindow(id) { $('#' + id).fadeOut(200); }

/* --- LOVE CALCULATOR LOGIC (Unchanged) --- */
let photoVerified = false;
function handlePhotoUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const src = e.target.result;
            $('#confirm-photo-wrap').html(`<img src="${src}" class="photo-preview-small">`);
            $('#confirm-question').html(`Wait! 🛑 Security Check...<br>Are you sure this is the <b>cutest</b> photo? 🤨`);
            $('#photo-confirm-overlay').fadeIn(200);
            $('#photo-confirm-overlay').data('photo-src', src);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function confirmPhotoYes() {
    const src = $('#photo-confirm-overlay').data('photo-src');
    $('#photo-confirm-overlay').fadeOut(150);
    $('#photo-preview').attr('src', src).show();
    $('#status-1').text("Scanned — Warning: Too Cute 🔥").css('color', '#ff6fa3');
    $('#step-1').addClass('completed');
    $('#step-2').addClass('active').css('opacity', '1').css('pointer-events', 'all');
    $('#status-2').text("Waiting for cute voice...");
    photoVerified = true;
}

function confirmPhotoNo() {
    $('#photo-confirm-overlay').fadeOut(150);
    $('#auth-photo').val('');
    $('#photo-preview').hide();
    $('#status-1').text("Waiting for the best one...").css('color', '#aaa');
}

function startVoiceAuth() {
    if (!photoVerified) { alert("Please upload a photo first!"); return; }
    const btn = $('#mic-btn');
    const msg = $('#voice-msg');
    if (!('webkitSpeechRecognition' in window)) {
        msg.text("Pretending I heard 'I Love You' 🤫");
        setTimeout(() => verifyVoice("Sweetie"), 900);
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    btn.addClass('listening');
    msg.text("Listening... Say it! 👂");
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        btn.removeClass('listening');
        if(transcript.includes("like") || transcript.includes("love")) {
            msg.html("I know, I know... 🙈").css('color', '#e84393');
            setTimeout(() => verifyVoice("Cutie"), 2500);
        } else {
            msg.text("I didn't hear the love!").css('color', 'red');
        }
    };
    recognition.onerror = function(event) {
        btn.removeClass('listening');
        msg.text("Oops, try again! 🎤");
    };
    recognition.start();
}

function verifyVoice(name) {
    $('#voice-msg').html(`Voice ID: <strong>${name}</strong> [VERIFIED] <span style="color:#ff7eb3;">💘</span>`).css('color', '#27c93f');
    $('#status-2').text("Authorized — So Cute!").css('color', '#27c93f');
    $('#step-2').addClass('completed');
    setTimeout(() => {
        $('#calc-result-area').fadeIn();
        $('#final-text').text('Running coziness algorithms...');
        runAdvancedLoveCalc();
    }, 500);
}

function runAdvancedLoveCalc() {
    let p = 0;
    const bar = $('#final-progress');
    const txt = $('#final-percent');
    const sub = $('#final-text');
    const interval = setInterval(() => {
        p++;
        bar.css('width', p + '%');
        txt.text(p + '%');
        if(p < 30) sub.text("Measuring smile brightness... ☀️");
        else if(p < 60) sub.text("Checking horoscope compatibility... ✨");
        else if(p < 90) sub.text("Calculating cuddles per minute... 🧸");
        if(p >= 100) {
            clearInterval(interval);
            txt.text("100%");
            sub.html("Result: <b>PERFECT MATCH!</b> ❤️");
            spawnConfetti();
            document.getElementById('sfx-win').play();
        }
    }, 50);
}

// --- GENERIC TEMPLATE NOTE LOGIC ---
const noteContent = `A Little Note For You...

They say you don't find love, it finds you.

From the first time we talked, to all the late-night conversations...
From the silly jokes, to the moments we comforted each other...

Every single memory is special to me. You bring so much color and happiness into my life.

I just wanted to take a moment to say how much you mean to me. 

Thank you for being you. ❤️

Love,
Your Secret Admirer`;
let typingInProgress = false;
function typeNote() {
    if(typingInProgress) return;
    typingInProgress = true;
    $('#note-text').html('');
    let i = 0;
    function type() {
        if (i < noteContent.length) {
            let char = noteContent.charAt(i);
            if(char === '\n') char = '<br>';
            $('#note-text').append(char);
            i++;
            const elm = document.querySelector('.paper-content');
            elm.scrollTop = elm.scrollHeight;
            setTimeout(type, 30); // sped up slightly for portfolio viewing
        } else { typingInProgress = false; }
    }
    type();
}

function renderGallery() {
    const container = $('#gallery-body'); container.empty();
    const w = 600; const h = 450; 
    memories.forEach((mem, index) => {
        const rotate = (Math.random() * 40) - 20;
        const top = Math.random() * (h - 220) + 10; 
        const left = Math.random() * (w - 180) + 10;
        const html = `<div class="polaroid-wrapper" style="top: ${top}px; left: ${left}px; transform: rotate(${rotate}deg);"><div class="polaroid" onclick="$(this).toggleClass('flipped')"><div class="face front"><div class="photo-frame"><img src="${mem.img}" alt="Memory"></div><div class="caption">${mem.date}</div><i class="fas fa-sync-alt hint-icon"></i></div><div class="face back"><p>${mem.note}</p></div></div></div>`;
        container.append(html);
    });
    $('.polaroid-wrapper').draggable({ stack: ".polaroid-wrapper", containment: "parent" });
}

/* --- GAME LOGIC (Unchanged) --- */
let gameScore = 0; let gameTime = 30; let gameInterval; let timerInterval; let difficulty = 800;
function startGame() {
    gameScore = 0; gameTime = 30; difficulty = 800;
    $('#game-score').text(gameScore); $('#game-time').text(gameTime);
    $('#game-start-screen').fadeOut(); $('#game-lose-screen').fadeOut(); $('#game-win-screen').fadeOut();
    $('.game-item').remove();
    gameInterval = setInterval(() => { spawnItem(); }, difficulty);
    timerInterval = setInterval(() => {
        gameTime--; 
        $('#game-time').text(gameTime);
        if(gameTime <= 0) endGame(false);
        if(gameTime === 15) { clearInterval(gameInterval); difficulty = 600; gameInterval = setInterval(() => { spawnItem(); }, difficulty); }
    }, 1000);
}

function spawnItem() {
    const types = ['heart', 'heart', 'heart', 'flag', 'dodge', 'ring'];
    const type = types[Math.floor(Math.random() * types.length)];
    let html = ''; let isBad = false;
    
    if (type === 'heart') { html = '<i class="fas fa-heart item-heart"></i>'; } 
    else if (type === 'flag') { html = '<i class="fas fa-flag item-flag" style="color:#ff6b6b;"></i>'; isBad = true; } 
    else if (type === 'ring') { if(Math.random() > 0.7) html = '<i class="fas fa-ring item-ring" style="color:#74b9ff;"></i>'; else html = '<i class="fas fa-heart item-heart"></i>'; } 
    else if (type === 'dodge') { html = '<i class="fas fa-heart item-heart"></i>'; }

    const item = $('<div class="game-item">' + html + '</div>');
    item.css({ left: Math.random() * 380 + 'px' });
    
    if (type === 'dodge') {
        let dodges = 0;
        item.on('mouseover', function() {
            if (dodges < 3) {
                $(this).css('animation', 'none'); 
                const newLeft = Math.random() * 350; const newTop = Math.random() * 300;
                $(this).stop().animate({ left: newLeft, top: newTop }, 200);
                const taunts = ["Too slow! 😜", "Catch me!", "Nope! 💨", "Hehe!"];
                showTaunt($(this), taunts[dodges]);
                dodges++;
            }
        });
    }

    item.click(function() {
        if (isBad) {
            document.getElementById('sfx-buzz').play();
            showTaunt($(this), "Red Flag! 🚩");
            gameScore -= 5;
            $(this).css('filter', 'grayscale(1)');
            $('.game-area').css('background', '#fab1a0');
            setTimeout(() => $('.game-area').css('background', '#2d3436'), 200);
        } else {
            document.getElementById('sfx-pop').play();
            if(type === 'ring') { gameScore += 5; showTaunt($(this), "JACKPOT! 💍"); } else { gameScore++; }
            if(type === 'dodge') showTaunt($(this), "Okay fine! ❤️");
        }
        $('#game-score').text(gameScore);
        $(this).remove();
        if(gameScore >= 20) endGame(true);
    });

    $('#game-area').append(item);
    setTimeout(() => { if(item.parent().length > 0) item.remove(); }, 3000);
}

function showTaunt(el, text) {
    const t = $(`<div class="taunt-text">${text}</div>`);
    const pos = el.position();
    t.css({ top: pos.top - 20, left: pos.left });
    $('#game-area').append(t);
    setTimeout(() => t.remove(), 1000);
}

function endGame(win) {
    clearInterval(gameInterval); clearInterval(timerInterval);
    $('.game-item').remove();
    if(win) { 
        const coupons = ["Coupon: 1 Tight Hug 🫂", "Coupon: Dinner Date 🍔", "Coupon: Movie Night 🎬", "Coupon: Surprise Gift 🎁"];
        const prize = coupons[Math.floor(Math.random() * coupons.length)];
        $('#prize-coupon-container').html(`<div class="coupon"><h3>${prize}</h3></div>`);
        $('#game-win-screen').fadeIn(); document.getElementById('sfx-win').play(); spawnConfetti();
    } else { $('#game-lose-screen').fadeIn(); }
}

// --- TERMINAL LOGIC ---
function triggerSurprise() { closeWindow('win-game'); openWindow('win-terminal'); $('#nickname-input').focus(); }
function handleTerminalEnter(e) {
    if (e.key === 'Enter') {
        const val = $('#nickname-input').val().trim();
        if (val.length > 0) processTerminalCommand(val);
    }
}

function processTerminalCommand(nickname) {
    const term = $('#terminal-body');
    const lines = [
        `<span style="color: #ffff00;">> Accessing secure database...</span>`,
        `<span style="color: #ffff00;">> Analyzing input: "${nickname}"...</span>`,
        `<span style="color: #55efc4;">> Status: APPROVED</span>`,
        `<span style="color: #ff7eb3;">> VERIFIED! Unlocking surprise... ❤️</span>`
    ];
    let delay = 0;
    $('#nickname-input').prop('disabled', true);

    lines.forEach((line) => {
        setTimeout(() => {
            term.append(`<div class="terminal-line">${line}</div>`);
            term.scrollTop(term[0].scrollHeight);
            document.getElementById('sfx-type').play();
        }, delay);
        delay += 800; 
    });

    setTimeout(() => {
        closeWindow('win-terminal');
        $('#win-reveal').css('display', 'flex').hide().fadeIn(500);
        spawnConfetti();
    }, delay + 1000);
}

function openFullscreen(src) { $('#fullscreen-img').attr('src', src); $('#fullscreen-overlay').fadeIn(200).css('display', 'flex'); }
function closeFullscreen() { $('#fullscreen-overlay').fadeOut(200); }

// --- TEMPLATE CHAT SCRIPT ---
function startChat() {
    const msgs = [
        "Hello there! ❤️",
        "Welcome to your personalized digital space.",
        "Here is a small interactive experience I built.",
        "You can explore the windows, check the gallery, and read the notes.",
        "Check the 📍 Map to see a special location...",
        "Or Play the 🎮 Game to win some virtual coupons!",
        "Once you've explored everything, make sure to click 'Special.exe' on the desktop 😉"
    ];
    let delay = 1000;
    msgs.forEach((msg) => {
        setTimeout(() => { 
            $('#chat-box').append(`<div class="chat-bubble chat-left">${msg}</div>`); 
            const chatBox = document.getElementById('chat-box'); 
            chatBox.scrollTop = chatBox.scrollHeight; 
        }, delay);
        delay += 2500; // Standardized reading delay
    });
}

function startTimeCapsule() {
    const start = new Date("2024-01-01T00:00:00"); // Generic template date
    setInterval(() => {
        const now = new Date(); const diff = now - start;
        const d = Math.floor(diff / (1000*60*60*24)); const h = Math.floor((diff / (1000*60*60)) % 24); const m = Math.floor((diff / (1000*60)) % 60); const s = Math.floor((diff / 1000) % 60);
        $('#time-counter').text(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);
}

/* --- GENERIC PROPOSAL LOGIC --- */
function triggerProposal() { 
    $('#win-reveal').fadeOut(); $('.window').fadeOut(); 
    $('#proposal-overlay').css('display', 'flex').hide().fadeIn(1000); 
    startPetalTunnel();
    document.getElementById('sfx-heartbeat').play();
    
    const typingArea = $('#emotional-typing');
    const lines = [
        "So...",
        "You've played the games...",
        "You've read the notes...",
        "And now there is only one thing left to ask.",
        "I wanted to do something a little different this time.",
        "Because you are special to me.",
        "Will you be mine?"
    ];

    let delay = 1000;
    lines.forEach((line) => {
        setTimeout(() => { typingArea.css('opacity', 0).text(line).animate({opacity: 1}, 1000).delay(2000).animate({opacity: 0}, 1000); }, delay);
        delay += 4500;
    });

    setTimeout(() => { $('#final-card').css('display', 'block'); spawnConfetti(); }, delay + 500);
}

function startPetalTunnel() {
    const tunnel = document.getElementById('petal-tunnel');
    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('t-petal');
        const xStart = (Math.random() * 200 - 100) + 'vw'; const yStart = (Math.random() * 200 - 100) + 'vh';
        const xEnd = (Math.random() * 20 - 10) + 'vw'; const yEnd = (Math.random() * 20 - 10) + 'vh';
        const duration = 4 + Math.random() * 4; 
        petal.style.setProperty('--x-start', xStart); petal.style.setProperty('--y-start', yStart); petal.style.setProperty('--x-end', xEnd); petal.style.setProperty('--y-end', yEnd);
        petal.style.animation = `flyAtCamera ${duration}s ease-in forwards`;
        tunnel.appendChild(petal);
        setTimeout(() => { petal.remove(); }, duration * 1000);
    }, 150);
}

function sayYes() { 
    document.getElementById('sfx-heartbeat').pause(); document.getElementById('sfx-win').play();
    var end = Date.now() + (5 * 1000); var colors = ['#ff0000', '#ff69b4', '#ffffff'];
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: colors, zIndex: 20000, shapes: ['heart'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: colors, zIndex: 20000, shapes: ['heart'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
    let heartInterval = setInterval(() => { createFloatingHeart(); }, 150);
    setTimeout(() => clearInterval(heartInterval), 8000);
    $('#final-message-overlay').css('display', 'flex').hide().fadeIn(2000);
}

function createFloatingHeart() {
    const heart = $('<div class="floating-heart"><i class="fas fa-heart"></i></div>');
    heart.css({ left: Math.random() * 100 + 'vw', fontSize: (Math.random() * 2 + 1) + 'rem' });
    $('body').append(heart);
    setTimeout(() => heart.remove(), 4000);
}

function spawnConfetti() { confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); }
$(document).on("contextmenu", function(e) { e.preventDefault(); $("#context-menu").css({top: e.pageY, left: e.pageX}).show(); });
$(document).click(function() { $("#context-menu").hide(); });

let isPlaying = true;
function toggleMusic() {
    const m = document.getElementById('bg-music'); const i = document.getElementById('music-icon');
    if(isPlaying) { m.pause(); i.className="fas fa-play-circle"; } else { m.play(); i.className="fas fa-pause-circle"; }
    isPlaying = !isPlaying;
}