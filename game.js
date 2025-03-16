// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 400;

// Game objects
const player = { x: 50, y: 300, width: 30, height: 30, speed: 5, dx: 0, dy: 0, jumping: false };
const zombies = [
    { x: 400, y: 320, width: 30, height: 30, speed: 2, direction: 1 },
    { x: 600, y: 320, width: 30, height: 30, speed: 2, direction: -1 }
];
const platform = { x: 300, y: 250, width: 200, height: 10 };
const goal = { x: 750, y: 300, width: 30, height: 30 };

// Gravity and physics
const gravity = 0.5;
const jumpPower = -10;

// Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") player.dx = player.speed;
    if (event.key === "ArrowLeft") player.dx = -player.speed;
    if (event.key === "ArrowUp" && !player.jumping) {
        player.dy = jumpPower;
        player.jumping = true;
    }
});
document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") player.dx = 0;
});

// Update game state
function update() {
    // Move player
    player.x += player.dx;
    player.y += player.dy;
    player.dy += gravity; // Apply gravity

    // Collision with ground
    if (player.y + player.height >= canvas.height - 50) {
        player.y = canvas.height - 50 - player.height;
        player.jumping = false;
    }

    // Collision with platform
    if (player.x + player.width > platform.x && player.x < platform.x + platform.width &&
        player.y + player.height > platform.y && player.y + player.height < platform.y + 10) {
        player.y = platform.y - player.height;
        player.jumping = false;
    }

    // Move zombies
    zombies.forEach(zombie => {
        zombie.x += zombie.speed * zombie.direction;
        if (zombie.x <= 400 || zombie.x >= 700) zombie.direction *= -1;
    });

    // Check collision with zombies
    zombies.forEach(zombie => {
        if (player.x < zombie.x + zombie.width && player.x + player.width > zombie.x &&
            player.y < zombie.y + zombie.height && player.y + player.height > zombie.y) {
            alert("You got caught by a zombie! Try again.");
            resetGame();
        }
    });

// Check if player reaches goal
if (player.x + player.width > goal.x && player.y + player.height > goal.y) {
    alert("You won! +10 Tickets!");

    // Get current tickets or set to 0
    let tickets = localStorage.getItem("tickets") ? parseInt(localStorage.getItem("tickets")) : 0;
    
    // Add 10 tickets and save
    tickets += 10;
    localStorage.setItem("tickets", tickets);

    resetGame();
}


// Reset game
function resetGame() {
    player.x = 50;
    player.y = 300;
    player.dx = 0;
    player.dy = 0;
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw zombies
    ctx.fillStyle = "red";
    zombies.forEach(zombie => ctx.fillRect(zombie.x, zombie.y, zombie.width, zombie.height));

    // Draw platform
    ctx.fillStyle = "green";
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    // Draw goal
    ctx.fillStyle = "gold";
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
