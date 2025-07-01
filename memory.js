// --- MEMORY LOGIC ---

// --- MEMORY DATA ---
// Add your own memories to this array!
const memories = [
    {
        img: 'PATH/TO/YOUR/MEMORY_IMAGE.jpg', // <-- Put your memory image path here
        caption: 'Your sweet memory caption here!' // <-- Put your memory caption here
    }
    // Add more memories as needed
];

let shownMemories = [];
let memoryPopupActive = false;
let currentMemory = null;
let nextMemoryAt = getRandomMemoryInterval();

function getRandomMemoryInterval() {
    // Returns a random number between 5 and 10
    return Math.floor(Math.random() * 6) + 5;
}

function maybeShowMemoryPopup() {
    if (shownMemories.length === memories.length) return;
    if (purrCount >= nextMemoryAt) {
        // Find a memory not yet shown
        const available = memories.filter((m, i) => !shownMemories.includes(i));
        if (available.length === 0) return;
        // Pick the first available (or randomize if you want)
        const idx = memories.indexOf(available[0]);
        shownMemories.push(idx);
        currentMemory = memories[idx];
        memoryPopupActive = true;
        nextMemoryAt = purrCount + getRandomMemoryInterval();
    }
}

function drawMemoryPopup(ctx) {
    if (!memoryPopupActive || !currentMemory) return;
    // Draw semi-transparent overlay
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#fff8f0';
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    ctx.globalAlpha = 1.0;
    // Draw memory image (centered, smaller)
    const img = new window.Image();
    img.src = currentMemory.img;
    img.onload = function() {
        ctx.drawImage(img, (gameWidth-350)/2, (gameHeight-350)/2-60, 350, 350);
    };
    if (img.complete) {
        ctx.drawImage(img, (gameWidth-350)/2, (gameHeight-350)/2-60, 350, 350);
    }
    // Draw caption
    ctx.font = 'bold 36px Comic Sans MS, cursive';
    ctx.fillStyle = '#d2691e';
    ctx.textAlign = 'center';
    ctx.fillText(currentMemory.caption, gameWidth/2, (gameHeight+350)/2+30);
    ctx.restore();
}

function isMemoryPopupActive() {
    return memoryPopupActive;
}

function hideMemoryPopup() {
    memoryPopupActive = false;
    currentMemory = null;
}

// Expose functions globally
window.drawMemoryPopup = drawMemoryPopup;
window.isMemoryPopupActive = isMemoryPopupActive;
window.maybeShowMemoryPopup = maybeShowMemoryPopup;
window.hideMemoryPopup = hideMemoryPopup; 