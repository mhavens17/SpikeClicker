// --- CAT LOGIC ---

// Cat image setup
const catImg = new Image();
catImg.src = catImagePath; // Uses the variable from main.js

// --- ANIMATION VARIABLES ---
// Percentages (e.g., 0.15 = 15%)
const CAT_ANIM_SHRINK = 0.15; // How much smaller (percent decrease)
const CAT_ANIM_GROW = 0.10;   // How much bigger (percent increase)
const CAT_ANIM_DURATION = 120; // Total animation time in ms (quick)

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

// Expose functions globally
window.drawCat = drawCat;
window.catClicked = catClicked;
window.triggerCatClickAnimation = triggerCatClickAnimation; 