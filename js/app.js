// Floating Background Generator
const cuteIcons = ['🧸', '🌹', '💕', '✨', '☁️', '🎀', '🌸', '💌', '⭐', '🧁'];
const bgContainer = document.getElementById('bg-container');
let noCount = 0;

function createFloatingElements() {
    // Create about 20-30 elements
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.classList.add('float-item');
        el.innerText = cuteIcons[Math.floor(Math.random() * cuteIcons.length)];

        // Random position
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = Math.random() * 100 + 'vh';

        // Random animation properties
        const duration = Math.random() * 15 + 10 + 's'; // 10-25s
        const delay = Math.random() * 10 + 's';

        el.style.animationDuration = duration;
        el.style.animationDelay = delay;

        // Size variation
        const size = Math.random() * 2 + 1 + 'rem';
        el.style.fontSize = size;

        bgContainer.appendChild(el);
    }
}

// Init background
createFloatingElements();


// --- URL & Initialization Logic ---

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get('from');
    const toName = params.get('to');

    if (fromName && toName) {
        // Sanitize
        const safeFrom = DOMPurify.sanitize(fromName);
        const safeTo = DOMPurify.sanitize(toName);

        // Pre-fill names
        document.getElementById('name').value = safeTo; // Her name
        document.getElementById('n').innerText = safeTo;
        document.getElementById('fn').innerText = safeTo;

        // Skip Generator (s0), Skip Name Input (s1) -> Show Modified Welcome
        document.getElementById('s0').classList.remove('active');
        const s1 = document.getElementById('s1');
        s1.classList.add('active'); // active s1 explicitly

        s1.innerHTML = `
            <h1>Hey ${safeTo} 💖</h1>
            <p style="font-size:1.2rem; margin: 20px 0;">${safeFrom} has something special for you ✨</p>
            <p style="font-size: 0.9rem; opacity: 0.8;">Let's see if our vibes match...</p>
            <button onclick="next('s2')">Find Out 💗</button>
        `;
    }
});

// Helper for simple sanitization if DOMPurify isn't available (lightweight fallback)
const DOMPurify = window.DOMPurify || {
    sanitize: (str) => str.replace(/[^\w\s\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]/g, '')
};

function generateLink() {
    const sender = document.getElementById('gen-sender').value.trim();
    const receiver = document.getElementById('gen-receiver').value.trim();
    const email = document.getElementById('gen-email').value.trim();
    const errorMsg = document.getElementById('gen-error');

    // Reset error
    errorMsg.style.display = 'none';
    document.getElementById('gen-sender').classList.remove('error');
    document.getElementById('gen-receiver').classList.remove('error');
    document.getElementById('gen-email').classList.remove('error');

    if (!sender || !receiver || !email) {
        errorMsg.style.display = 'block';
        if (!sender) document.getElementById('gen-sender').classList.add('error');
        if (!receiver) document.getElementById('gen-receiver').classList.add('error');
        if (!email) {
            document.getElementById('gen-email').classList.add('error');
            errorMsg.innerText = "Please fill in all fields! 🥺";
        } else {
            errorMsg.innerText = "Please enter both names! 🥺";
        }
        return;
    }

    if (!email.includes('@')) {
        errorMsg.style.display = 'block';
        document.getElementById('gen-email').classList.add('error');
        errorMsg.innerText = "Please enter a valid email! 📧";
        return;
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?from=${encodeURIComponent(sender)}&to=${encodeURIComponent(receiver)}`;

    document.getElementById('gen-url').value = url;
    document.getElementById('gen-result').style.display = 'block';
}

function copyLink() {
    const copyText = document.getElementById("gen-url");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value)
        .then(() => alert("Link copied! Send it to your Valentine 💌"))
        .catch(() => alert("Failed to copy. Please copy manually."));
}

function toggleInfo() {
    const info = document.getElementById('info-block');
    if (info.style.display === 'block') {
        info.style.display = 'none';
    } else {
        info.style.display = 'block';
    }
}


// --- Navigation & Validation ---

function validateAndNext(currentId, nextId, callback) {
    const section = document.getElementById(currentId);
    const inputs = section.querySelectorAll('input, select');
    let isValid = true;

    // Clear previous errors
    section.querySelectorAll('.error-msg').forEach(e => e.style.display = 'none');
    inputs.forEach(i => i.classList.remove('error'));

    // Check Step 1 (Name)
    if (currentId === 's1') {
        const nameIn = document.getElementById('name');
        // If s1 is modified by URL param, input might be missing, so check existence
        if (nameIn && !nameIn.value.trim()) {
            showError(nameIn);
            isValid = false;
        } else if (nameIn) {
            document.getElementById('n').innerText = nameIn.value;
            document.getElementById('fn').innerText = nameIn.value;
        }
    }

    // Check Step 2 (Questionnaire)
    if (currentId === 's2') {
        // Color (Custom check because it's buttons + hidden input)
        const colorVal = document.getElementById('favCheckColor').value;
        if (!colorVal) {
            document.querySelector('#color-opts').parentNode.querySelector('.error-msg').style.display = 'block';
            isValid = false;
        }

        // Text inputs
        const textIds = ['favCheckFood', 'favCheckPlace', 'favCheckMovie', 'favCheckSong'];
        textIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el.value.trim()) {
                showError(el);
                isValid = false;
            }
        });

        // Radio groups
        const radios = ['seamountain', 'coffeetea'];
        radios.forEach(name => {
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                const container = document.querySelector(`input[name="${name}"]`).parentNode.parentNode;
                container.querySelector('.error-msg').style.display = 'block';
                isValid = false;
            }
        });
    }

    if (isValid) {
        if (callback) callback();
        else next(nextId);
    }
}

function validateAndFinal() {
    let isValid = true;
    document.querySelectorAll('#s5 .error-msg').forEach(e => e.style.display = 'none');

    // Date
    const d = document.getElementById('date');
    if (!d.value) {
        showError(d);
        isValid = false;
    }


    // Radios
    ['place', 'food', 'movie'].forEach(name => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
            const container = document.querySelector(`input[name="${name}"]`).parentNode.parentNode;
            container.querySelector('.error-msg').style.display = 'block';
            isValid = false;
        }
    });

    if (isValid) final();
}

function showError(el) {
    el.classList.add('error');
    // Try to find sibling error message, or parent's sibling
    let msg = el.parentNode.querySelector('.error-msg');
    if (msg) msg.style.display = 'block';
}

function next(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function selectColor(btn, color) {
    // Remove selected class from all
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('favCheckColor').value = color; // Store color
    theme(color);
}

function theme(c) {
    const r = document.documentElement
    const t = {
        pink: ['#d81b60', '#ff9a9e', '#fecfef'],
        red: ['#c62828', '#ef5350', '#ffcdd2'],
        purple: ['#6a1b9a', '#ba68c8', '#e1bee7'],
        blue: ['#1565c0', '#42a5f5', '#bbdefb'],
        green: ['#2e7d32', '#81c784', '#c8e6c9'],
        orange: ['#ef6c00', '#ffb74d', '#ffe0b2'],
        brown: ['#5d4037', '#bcaaa4', '#efebe9'],
        dark: ['#455a64', '#78909c', '#cfd8dc']
    }[c]
    r.style.setProperty('--primary', t[0])
    r.style.setProperty('--bg1', t[1])
    r.style.setProperty('--bg2', t[2])
}

function match() {
    next('s3');

    // Get Name & First Letter
    // Check if name input exists (might be replaced by custom UI)
    let nameVal = "";
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameVal = nameInput.value.trim().toUpperCase();
    } else {
        // Fallback for custom flow if input removed (though we just hid it in logical flow, physically it's there but maybe empty if we didn't set it)
        // Actually in our custom flow we set .value, so it should be fine.
        // But if we used the URL params, we might have skipped validation where n gets set.
        // Let's rely on #n innerText which we set.
        nameVal = document.getElementById('n').innerText.trim().toUpperCase();
    }

    const firstChar = nameVal.charAt(0);

    // Alphabet Mapping
    const vibeMap = {
        'A': 99, 'B': 97, 'C': 96, 'D': 95, 'E': 94,
        'F': 93, 'G': 92, 'H': 91, 'I': 90, 'J': 89,
        'K': 88, 'L': 87, 'M': 98, 'N': 86, 'O': 85,
        'P': 84, 'Q': 83, 'R': 82, 'S': 88, 'T': 81,
        'U': 80, 'V': 79, 'W': 78, 'X': 77, 'Y': 76, 'Z': 75
    };

    // Default to 85% if not a letter or empty
    let targetPercent = vibeMap[firstChar] || 85;

    let p = 0;
    const i = setInterval(() => {
        // Increment faster at start, slower at end
        p += Math.floor(Math.random() * 5) + 1;

        if (p > targetPercent) {
            p = targetPercent;
        }

        document.getElementById('percent').innerText = p + '%';

        if (p >= targetPercent) {
            clearInterval(i);
            document.getElementById('matchText').style.opacity = '1';
            setTimeout(() => next('s4'), 5000);
        }
    }, 50);
}

function plead() {
    const m = [
        "Are you sure? 🥺",
        "I was really hoping... 💗",
        "Just think once more 🌸",
        "I promise to make you smile 😊",
        "Don't break my heart 💔",
        "Pretty please? 🍒",
        "What if this is our love story? 💌",
        "I’ll bring snacks AND love 😋❤️",
        "Just one tiny yes? 🫶",
        "My heart says yes already 💓",
        "Even the stars ship us ✨",
        "I practiced this moment 😭",
        "This button is getting shy 🙈",
        "I asked my heart, it said you 💘",
        "Cute warning: feelings involved 🚨",
        "Don’t let this moment pass 🌷",
        "Imagine the memories we’ll make 📸",
        "My heart refreshed for your answer 🔄❤️",
        "This yes could be iconic 💅💖",
        "Say yes for romance stats 📊💕",
        "This is your sign 🪄",
        "Soft yes energy activated 🌈",
        "Loading happiness… 92% 💕",
        "I won’t ask again (maybe 👀)",
        "Heart.exe is waiting ❤️‍🔥"
    ];
    const container = document.getElementById('plea-container');
    container.innerText = m[noCount++ % m.length];
    container.style.animation = 'none';
    container.offsetHeight; /* trigger reflow */
    container.style.animation = 'shake 0.5s ease';
}

function final() {
    const d = document.getElementById('date').value;
    const place = document.querySelector('input[name=place]:checked').value;
    const food = document.querySelector('input[name=food]:checked').value;
    const movie = document.querySelector('input[name=movie]:checked').value;
    const message = document.getElementById('special-msg').value.trim();

    // Get names from URL if available, else from input
    const params = new URLSearchParams(window.location.search);
    const sender = params.get('from') || 'Unknown Sender';
    const receiver = document.getElementById('n').innerText || 'Valentine';

    // Collect Vibe Check Data
    const vibeData = {
        favColor: document.getElementById('favCheckColor').value,
        favFood: document.getElementById('favCheckFood').value,
        favPlace: document.getElementById('favCheckPlace').value,
        seaOrMt: document.querySelector('input[name=seamountain]:checked').value,
        favMovie: document.getElementById('favCheckMovie').value,
        favSong: document.getElementById('favCheckSong').value,
        coffeeOrTea: document.querySelector('input[name=coffeetea]:checked').value,
        matchPercent: document.getElementById('percent').innerText.replace('%', '')
    };

    const data = {
        sender,
        receiver,
        date: d,
        place,
        food,
        movie,
        message,
        vibeCheck: vibeData,
        timestamp: new Date().toISOString()
    };

    // Save to LocalStorage
    saveResponse(data);

    // Also offer download (legacy + backup)
    // We'll wait a brief moment so IT FEELS like it's saving
    setTimeout(() => {
        downloadResponseFile(data);
    }, 1000);

    // Show Success Message
    document.getElementById('msg').innerHTML =
        `I can’t wait for <b>${d}</b> 💫<br>
    We’ll go to <b>${place}</b>, enjoy <b>${food}</b>,<br>
    and end the day with <b>${movie}</b> 🤍`

    const q = [
        "Somehow, everything feels softer with you.",
        "This already feels like my favorite plan.",
        "Smiling… just thinking about us.",
        "You make simple moments special.",
        "Being with you feels easy.",
        "This feels calm, warm, and right.",
        "I like who I am around you.",
        "Every moment feels a little brighter.",
        "Time slows down when it’s us.",
        "I didn’t expect this… but I love it.",
        "Your presence feels like comfort.",
        "This feels like a quiet kind of happiness.",
        "It’s the small things with you.",
        "I’m happy right here, right now.",
        "You feel like home in a moment.",
        "I smile without realizing it.",
        "This feels natural… like it was meant to happen.",
        "You make ordinary days feel meaningful.",
        "There’s something peaceful about us.",
        "I wouldn’t rush this feeling.",
        "It’s nice… feeling this way with you.",
        "I like how this feels—soft and real.",
        "Even silence feels good with you.",
        "This moment feels safe.",
        "Being close to you just feels right."
    ]
    document.getElementById('quote').innerText = q[Math.floor(Math.random() * q.length)]
    next('s6')
}
