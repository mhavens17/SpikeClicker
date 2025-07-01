// --- ASSET PATHS ---
const catImagePath = 'assets/cat.png';
const purrSoundPath = 'assets/meow.mp3';

// --- GAME WINDOW SIZE ---
const gameWidth = 650;
const gameHeight = 650
// --- CAT IMAGE SIZE ---
const catWidth = 450;
const catHeight = 300;

// --- GAME STATE ---
let purrCount = 0;
let totalPurrsEarned = 0; // Track total purrs earned (never decreases)

// --- CANVAS SETUP ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- CAT LOGIC --- CAT LOGIC --- CAT LOGIC --- CAT LOGIC ---
// --- CAT LOGIC --- CAT LOGIC --- CAT LOGIC --- CAT LOGIC ---
// --- CAT LOGIC --- CAT LOGIC --- CAT LOGIC --- CAT LOGIC ---

const catImg = new Image();
catImg.src = catImagePath;

// --- ANIMATION VARIABLES ---
const CAT_ANIM_SHRINK = 0.05; // How much smaller (percent decrease)
const CAT_ANIM_GROW = 0.08;   // How much bigger (percent increase)
const CAT_ANIM_DURATION = 100; // Total animation time in ms (quick)

let catAnimStart = null;
let catAnimPhase = 0; // 0 = idle, 1 = shrinking, 2 = growing, 3 = returning
let catAnimReq = null;

function triggerCatClickAnimation() {
    catAnimStart = performance.now();
    catAnimPhase = 1;
}

function getCatAnimScale(now) {
    if (!catAnimStart) return 1;
    const elapsed = now - catAnimStart;
    const shrinkTime = CAT_ANIM_DURATION * 0.3;
    const growTime = CAT_ANIM_DURATION * 0.4;
    const returnTime = CAT_ANIM_DURATION * 0.3;
    if (elapsed < shrinkTime) {
        // Shrinking
        const t = elapsed / shrinkTime;
        return 1 - CAT_ANIM_SHRINK * t;
    } else if (elapsed < shrinkTime + growTime) {
        // Growing
        const t = (elapsed - shrinkTime) / growTime;
        return (1 - CAT_ANIM_SHRINK) + (CAT_ANIM_SHRINK + CAT_ANIM_GROW) * t;
    } else if (elapsed < CAT_ANIM_DURATION) {
        // Returning to normal
        const t = (elapsed - shrinkTime - growTime) / returnTime;
        return (1 + CAT_ANIM_GROW) - CAT_ANIM_GROW * t;
    } else {
        // Done
        catAnimStart = null;
        catAnimPhase = 0;
        return 1;
    }
}

function drawCat(ctx) {
    const now = performance.now();
    const scale = getCatAnimScale(now);
    const drawW = catWidth * scale;
    const drawH = catHeight * scale;
    const x = (gameWidth - drawW) / 2;
    const y = (gameHeight - drawH) / 2;
    ctx.drawImage(catImg, x, y, drawW, drawH);
}

function catClicked(mouseX, mouseY) {
    const now = performance.now();
    const scale = getCatAnimScale(now);
    const drawW = catWidth * scale;
    const drawH = catHeight * scale;
    const x = (gameWidth - drawW) / 2;
    const y = (gameHeight - drawH) / 2;
    return (
        mouseX >= x && mouseX <= x + drawW &&
        mouseY >= y && mouseY <= y + drawH
    );
}
// --- END CAT LOGIC ---

// --- MEMORY LOGIC --- MEMORY LOGIC --- MEMORY LOGIC --- MEMORY LOGIC --- 
// --- MEMORY LOGIC --- MEMORY LOGIC --- MEMORY LOGIC --- MEMORY LOGIC --- 
// --- MEMORY LOGIC --- MEMORY LOGIC --- MEMORY LOGIC --- MEMORY LOGIC --- 

const memories = [
    { img: 'assets/memories/AC event.png', caption: 'First Rats of Mars concert and the first time you sold your art..AND MADE BANK' },
    { img: 'assets/memories/alley nuts first.png', caption: 'The first (of MANY) times we went to alley nuts!' },
    { img: 'assets/memories/alley nuts last.png', caption: 'The last time you and I got to go to alley nuts. (hopefully not the last for very long)' },
    { img: 'assets/memories/arcade.png', caption: 'When we went to Cidercade and DID NOT get to play Tekken smh' },
    { img: 'assets/memories/austin walk.png', caption: 'When we walked around that lake in Austin. The one you thought was spooky' },
    { img: 'assets/memories/birthday dinner.png', caption: 'Your birthday dinner at that fancy restaurant.' },
    { img: 'assets/memories/british rapper.png', caption: 'That rooftop bar with that horrible British rapper. ONE MORE TUNE' },
    { img: 'assets/memories/buddah.png', caption: 'The Buddah statue in Japan. The one with those Buddah cookies you could eat and feel werid about.' },
    { img: 'assets/memories/dinosaur coffee.png', caption: 'Dinosaur coffee. So many dinosaurs' },
    { img: 'assets/memories/dnd puzzle.png', caption: 'When you guys tried solving that sudoku D&D puzzle.' },
    { img: 'assets/memories/eclipse.png', caption: 'The eclipse!! A moment I will never forget' },
    { img: 'assets/memories/fair.png', caption: 'The view from the Sky-tram at the Texas State Fair. Glad we went at night.' },
    { img: 'assets/memories/first birthday.png', caption: 'My first birthday party.' },
    { img: 'assets/memories/graduation.jpeg', caption: 'Graduation day!! Was really get to see you and for you to spend time with my family.' },
    { img: 'assets/memories/gyro.png', caption: 'When you got us that special discount for a free gyro. We werent dating yet but I thought you were so cool then' },
    { img: 'assets/memories/halloween digicam.png', caption: 'Name a cooler duo. Impossible' },
    { img: 'assets/memories/karaoke 1.png', caption: 'First time you and I went to KTV. First of MANY times' },
    { img: 'assets/memories/karaoke weezer.png', caption: 'Second time we went to KTV. Weezer MV was playing in the background' },
    { img: 'assets/memories/lego star wars.png', caption: 'You getting spoiled by LEGO star wars in HT' },
    { img: 'assets/memories/otter.png', caption: 'Otter petting zoo! I forgot the name of the otter I had. I hope you remembered yours.' },
    { img: 'assets/memories/family mart.png', caption: 'Routine Family Mart trip' },
    { img: 'assets/memories/stargaze.png', caption: 'The stars the night we saw a shooting star' },
    { img: 'assets/memories/stargaze floor.png', caption: 'Stargazing. You made the woodchip floor seem so comfortble.' },
    { img: 'assets/memories/swingset.png', caption: 'That random playground in Kyoto. No clue why it was there.' },
    { img: 'assets/memories/telegrams.png', caption: 'The legendary TELEGRAM concert.' },
    { img: 'assets/memories/legos jojo.png', caption: 'Ultimate combo: Building LEGOS and watching JoJos' },
    { img: 'assets/memories/la madeline.png', caption: 'When you took my phone while I was in the bathroom of La Madeline.' },
    { img: 'assets/memories/living tombstone.png', caption: 'Living Tombstone concert. After you did a cartwheel to get in.' },
    { img: 'assets/memories/overwatch.png', caption: 'Overwatch Survival Guide. I was basically the reason you made it to diamond.' },
    { img: 'assets/memories/rocks.png', caption: 'Minecraft IRL: Austin Cave' }
];


let shownMemories = [];
let memoryPopupActive = false;
let currentMemory = null;
let nextMemoryAt = getRandomMemoryInterval();

function getRandomMemoryInterval() {
    return Math.floor(Math.random() * 6) + 2;
}

function maybeShowMemoryPopup() {
    if (shownMemories.length === memories.length) return;
    if (totalPurrsEarned >= nextMemoryAt) {
        const availableIndexes = [];
        // Build array of available memory indexes
        for (let i = 0; i < memories.length; i++) {
            if (!shownMemories.includes(i)) {
                availableIndexes.push(i);
            }
        }
        if (availableIndexes.length === 0) return;
        
        // Randomly select from available memories
        const randomIndex = Math.floor(Math.random() * availableIndexes.length);
        const selectedMemoryIndex = availableIndexes[randomIndex];
        
        shownMemories.push(selectedMemoryIndex);
        currentMemory = memories[selectedMemoryIndex];
        memoryPopupActive = true;
        nextMemoryAt = totalPurrsEarned + getRandomMemoryInterval();
    }
}

function drawMemoryPopup(ctx) {
    if (!memoryPopupActive || !currentMemory) return;
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#fff8f0';
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    ctx.globalAlpha = 1.0;
    const img = new window.Image();
    img.src = currentMemory.img;
    img.onload = function() {
        ctx.drawImage(img, (gameWidth-350)/2, (gameHeight-350)/2-60, 350, 350);
    };
    if (img.complete) {
        ctx.drawImage(img, (gameWidth-350)/2, (gameHeight-350)/2-60, 350, 350);
    }
    
    // Draw caption with bounding box and text wrapping
    drawCaptionWithBox(ctx, currentMemory.caption);
    ctx.restore();
}

function drawCaptionWithBox(ctx, caption) {
    const maxWidth = gameWidth - 40; // Leave 20px margin on each side
    const maxHeight = 150; // Maximum height for caption area
    const maxLines = 3; // Maximum lines before shrinking font
    const padding = 15;
    const startY = (gameHeight + 350) / 2 + 10; // Position below the image (raised from 50 to 20)
    
    // Try different font sizes until text fits
    let fontSize = 28;
    let lines = [];
    let totalHeight = 0;
    
    do {
        ctx.font = `bold ${fontSize}px Comic Sans MS, cursive`;
        lines = wrapText(ctx, caption, maxWidth - (padding * 2));
        const lineHeight = fontSize * 1.2;
        totalHeight = lines.length * lineHeight;
        
        // Break if text fits within 3 lines and height limit, or if font is too small
        if ((lines.length <= maxLines && totalHeight <= maxHeight - (padding * 2)) || fontSize <= 12) {
            break;
        }
        fontSize -= 2;
    } while (fontSize > 12);
    
    // Calculate bounding box dimensions
    const boxWidth = maxWidth;
    const boxHeight = Math.min(totalHeight + (padding * 2), maxHeight);
    const boxX = (gameWidth - boxWidth) / 2;
    const boxY = startY;
    
    // Draw bounding box background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    
    // Draw bounding box border
    ctx.strokeStyle = '#d2691e';
    ctx.lineWidth = 3;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
    
    // Draw text lines
    ctx.fillStyle = '#d2691e';
    ctx.textAlign = 'center';
    const lineHeight = fontSize * 1.2;
    const textStartY = boxY + padding + fontSize;
    
    for (let i = 0; i < lines.length; i++) {
        const lineY = textStartY + (i * lineHeight);
        ctx.fillText(lines[i], gameWidth / 2, lineY);
    }
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + words[i] + ' ';
        const testWidth = ctx.measureText(testLine).width;
        
        if (testWidth > maxWidth && currentLine !== '') {
            lines.push(currentLine.trim());
            currentLine = words[i] + ' ';
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine.trim() !== '') {
        lines.push(currentLine.trim());
    }
    
    return lines;
}

function isMemoryPopupActive() {
    return memoryPopupActive;
}

function hideMemoryPopup() {
    memoryPopupActive = false;
    currentMemory = null;
}

function drawMemoryCounter(ctx) {
    ctx.save();
    ctx.font = 'bold 20px Comic Sans MS, cursive';
    ctx.fillStyle = '#8b4513';
    ctx.textAlign = 'left';
    ctx.fillText(`Memories: ${shownMemories.length}/${memories.length}`, 20, 35);
    ctx.restore();
}
// --- END MEMORY LOGIC ---

// --- UPGRADE SYSTEM --- UPGRADE SYSTEM --- UPGRADE SYSTEM --- UPGRADE SYSTEM ---
// --- UPGRADE SYSTEM --- UPGRADE SYSTEM --- UPGRADE SYSTEM --- UPGRADE SYSTEM ---
// --- UPGRADE SYSTEM --- UPGRADE SYSTEM --- UPGRADE SYSTEM --- UPGRADE SYSTEM ---

// --- UPGRADE VARIABLES ---
const baseClickValue = 1;
const baseCost = 25;
const growthRate = 2;

let clickValue = baseClickValue;
let upgradeLevel = 0;

// --- UPGRADE COST CALCULATION ---
function getUpgradeCost(level) {
    return Math.floor(baseCost * Math.pow(growthRate, level));
}

// --- UPGRADE BUTTON ELEMENT ---
const upgradeButton = document.getElementById('upgradeButton');

// --- UPGRADE BUTTON VISIBILITY ---
function showUpgradeButtonIfEligible() {
    const cost = getUpgradeCost(upgradeLevel);
    if (purrCount >= cost) {
        upgradeButton.style.display = 'block';
        upgradeButton.textContent = `Upgrade to x${upgradeLevel + 2} (Cost: ${cost} purrs)`;
    } else {
        upgradeButton.style.display = 'none';
    }
}

// --- UPGRADE PURCHASE LOGIC ---
function purchaseUpgrade() {
    const cost = getUpgradeCost(upgradeLevel);
    if (purrCount >= cost) {
        purrCount -= cost;
        upgradeLevel++;
        clickValue = baseClickValue * (upgradeLevel + 1);
        playUpgradeSound();
        showUpgradeButtonIfEligible();
    }
}

// --- UPGRADE SOUND EFFECT ---
function playUpgradeSound() {
    // Play the same purr sound for now, but at higher pitch
    if (!purrSoundPath) return;
    const audio = new Audio(purrSoundPath);
    audio.currentTime = 0;
    audio.playbackRate = 1.5; // Higher pitch for upgrade sound
    audio.play();
}

// --- UPGRADE BUTTON EVENT LISTENER ---
upgradeButton.addEventListener('click', purchaseUpgrade);

// --- END UPGRADE SYSTEM ---



// --- GAME LOOP ---
function gameLoop() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    drawCat(ctx);
    drawPurrCount(ctx);
    drawMemoryCounter(ctx);
    drawMemoryPopup(ctx);
    showUpgradeButtonIfEligible();
    requestAnimationFrame(gameLoop);
}

function drawPurrCount(ctx) {
    ctx.save();
    ctx.font = 'bold 48px Comic Sans MS, cursive';
    ctx.fillStyle = '#d2691e';
    ctx.textAlign = 'center';
    ctx.fillText(`Purrs: ${purrCount}`, gameWidth / 2, 70);
    
    // Display click multiplier if upgraded
    if (upgradeLevel > 0) {
        ctx.font = 'bold 24px Comic Sans MS, cursive';
        ctx.fillStyle = '#ff6b6b';
        ctx.fillText(`x${clickValue} per click`, gameWidth / 2, 105);
    }
    ctx.restore();
}

// --- INPUT HANDLING ---
canvas.addEventListener('click', function(e) {
    if (isMemoryPopupActive()) return;
    if (catClicked(e.offsetX, e.offsetY)) {
        purrCount += clickValue;
        totalPurrsEarned += clickValue;
        playPurrSound();
        triggerCatClickAnimation();
        maybeShowMemoryPopup();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideMemoryPopup();
    }
});

function playPurrSound() {
    if (!purrSoundPath) return;
    const audio = new Audio(purrSoundPath);
    audio.currentTime = 0;
    audio.play();
}

// --- START GAME ---
gameLoop(); 