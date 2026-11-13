// Upravljanje QR modala
function openQrModal() {
    document.getElementById("qrModal").style.display = "flex";
}

function closeQrModal() {
    document.getElementById("qrModal").style.display = "none";
}

// --- 1. Google prijava ---
function handleGoogleResponse(response) {
    const credential = response.credential;
    console.log("Google žeton (Token):", credential);
    // Tukaj pošlješ žeton na svoj strežnik v preverjanje
    alert("Uspešna Google prijava!");
}
function handleCustomGoogleLogin() {
    if (window.google && google.accounts && google.accounts.id) {
        google.accounts.id.prompt(); // Odpre Google prijavno okno/pop-up
    } else {
        console.error("Google SDK še ni naložen.");
    }
}
// --- 2. Apple prijava ---
document.addEventListener('DOMContentLoaded', () => {
    if (window.AppleID) {
        AppleID.auth.init({
            clientId: 'TVOJ_APPLE_CLIENT_ID', // npr. com.tvojadomena.app
            scope: 'name email',
            redirectURI: 'https://tvojadomena.com/auth/apple/callback',
            state: 'origin:web',
            usePopup: true
        });
    }
});

async function handleAppleLogin() {
    try {
        const response = await AppleID.auth.signIn();
        console.log("Apple odgovor:", response);
        alert("Uspešna Apple prijava!");
    } catch (error) {
        console.error("Napaka pri Apple prijavi:", error);
    }
}

function handlePhoneLogin() {
    window.location.href = 'phone.html';
}

// --- 3. Spreminjanje barve logotipa s sliderjem in barvnim izbirnikom ---
function initColorController() {
    const xLogo = document.getElementById('xLogo');
    const hueSlider = document.getElementById('hueSlider');
    const colorPicker = document.getElementById('colorPicker');
    const colorHexDisplay = document.getElementById('colorHexDisplay');
    const presetBtns = document.querySelectorAll('.preset-btn');

    if (!xLogo) return;

    function hslToHex(h, s, l) {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    function hexToHue(hex) {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, d = max - min;
        if (d !== 0) {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h = Math.round(h * 60);
        }
        return h;
    }

    function applyColor(color, updatePicker = true, updateSlider = true) {
        xLogo.style.fill = color;
        const paths = xLogo.querySelectorAll('path');
        paths.forEach(p => p.style.fill = color);

        if (colorHexDisplay) {
            colorHexDisplay.textContent = color.toUpperCase();
            colorHexDisplay.style.color = color;
        }
        if (updatePicker && colorPicker && color.startsWith('#') && color.length === 7) {
            colorPicker.value = color;
        }
        if (updateSlider && hueSlider && color.startsWith('#') && color.length === 7) {
            hueSlider.value = hexToHue(color);
        }
    }

    if (hueSlider) {
        hueSlider.addEventListener('input', (e) => {
            const hue = parseInt(e.target.value, 10);
            const hex = hslToHex(hue, 100, 50);
            applyColor(hex, true, false);
        });
    }

    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            applyColor(e.target.value, false, true);
        });
    }

    presetBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            if (color) {
                applyColor(color, true, true);
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColorController);
} else {
    initColorController();
}
