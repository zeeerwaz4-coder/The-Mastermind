// 1. Map Definition (0 = White Land, 1 = River Border, 2 = Black Land)
const mapGrid = [
    [2, 2, 2, 2], // Black's Military Side
    [1, 1, 1, 1], // 🌊 The River Choke-Point
    [0, 0, 0, 0], // White's Military Side
    [0, 0, 0, 0]
];

// 2. Knight Leader Battalion Data State
let knightUnit = {
    name: "🏇", // Temporary emoji until we link an image asset
    x: 1,
    y: 3,
    isCircled: false
};

const boardElement = document.getElementById("game-board");
const statusElement = document.getElementById("status-display");

// 3. Render Engine Loop
function drawBattlefield() {
    boardElement.innerHTML = "";
    
    for (let r = 0; r < mapGrid.length; r++) {
        for (let c = 0; c < mapGrid[r].length; c++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            
            // Assign territory skins based on map data array
            if (mapGrid[r][c] === 2) tile.classList.add("black-territory");
            else if (mapGrid[r][c] === 1) tile.classList.add("river-border");
            else tile.classList.add("white-territory");
            
            // Place Knight on its coordinates
            if (knightUnit.x === c && knightUnit.y === r) {
                tile.innerText = knightUnit.name;
                if (knightUnit.isCircled) tile.classList.add("circled");
            }
            
            // Listen for Hand Touch Deployment
            tile.addEventListener("touchstart", (e) => {
                e.preventDefault();
                processTouchCommand(c, r);
            });
            
            boardElement.appendChild(tile);
        }
    }
}

// 4. Mastermind Touch Logic
function processTouchCommand(targetX, targetY) {
    // If tapping the knight, activate the selection circle
    if (knightUnit.x === targetX && knightUnit.y === targetY) {
        knightUnit.isCircled = !knightUnit.isCircled;
        statusElement.innerText = knightUnit.isCircled ? "🏇 Knight Circled! Tap destination to deploy." : "Selection cancelled.";
        drawBattlefield();
        return;
    }
    
    // If knight is circled, deploy to tapped tile
    if (knightUnit.isCircled) {
        if (mapGrid[targetY][targetX] === 1) {
            statusElement.innerText = "❌ Strategy Error: Cannot deploy directly into the River!";
            return;
        }
        
        knightUnit.x = targetX;
        knightUnit.y = targetY;
        knightUnit.isCircled = false; // Turn off circle after deployment
        statusElement.innerText = `🚀 Deployed successfully to coordinates (${targetX}, ${targetY})`;
        drawBattlefield();
    }
}

// Initial Core Boot
drawBattlefield();
