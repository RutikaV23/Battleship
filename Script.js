
        const gridContainer = document.querySelector(".grid-container");
        const resetButton = document.querySelector(".reset");

        const gridSize = 16; // 4x4 grid
        const shipCount = 5;
        let attempts = 0;
        let shipsFound = 0;
        let shipPositions = [];

        // Initialize the game
        function initializeGame() {
            gridContainer.innerHTML = "";
            attempts = 0;
            shipsFound = 0;
            shipPositions = generateShipPositions();

            for (let i = 0; i < gridSize; i++) {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");

                const img = document.createElement("img");
                img.src = shipPositions.includes(i) ? "ship.png" : "sea.webp";
                img.alt = shipPositions.includes(i) ? "Ship" : "Sea";

                gridItem.appendChild(img);

                gridItem.addEventListener("click", () => handleCellClick(gridItem, img));

                gridContainer.appendChild(gridItem);
            }
        }

        // Generate random ship positions
        function generateShipPositions() {
            const positions = [];
            while (positions.length < shipCount) {
                const position = Math.floor(Math.random() * gridSize);
                if (!positions.includes(position)) {
                    positions.push(position);
                }
            }
            return positions;
        }

        // Handle cell click
        function handleCellClick(cell, img) {
            if (cell.classList.contains("revealed")) return;

            cell.classList.add("revealed");
            img.classList.add("revealed");

            attempts++;

            if (img.alt === "Ship") {
                shipsFound++;
            }

            checkGameStatus();
        }

        // Check game status
        function checkGameStatus() {
            if (shipsFound === shipCount) {
                setTimeout(() => alert("You Won!"), 100);
            } else if (attempts >= 10) {
                setTimeout(() => alert("You Lost!"), 100);
            }
        }

        // Reset the game
        resetButton.addEventListener("click", initializeGame);

        // Start the game
        initializeGame();
  