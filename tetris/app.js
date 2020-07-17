
// Add an event listener, the event here is DOMContentLoaded 
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10; 
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = ['orange', 'red', 'purple', 'green', 'blue']

    // The tetrominos
    const ltetromino = [
        [1, width+1, width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1, width+1,width*2+1,width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    // const ltetromino = [
    //     [1, width+1, width*2+1,2],
    //     [1, 11, 21, 5]
    //     [1, 11, 21, 3]
    //     [0]
    // ]

    const ztetrominos = [
        [0,width,width+1,width+2],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1,width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const ttetrominos = [
        [1, width,width+1, width+2],
        [1, width+1,width+2,width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const otetrominos = [
        [0,1,width, width+1],
        [0,1,width, width+1],
        [0,1,width, width+1],
        [0,1,width, width+1]
    ]

    const itetrominos = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1,width+2, width+3],
        [1, width+1,width*2+1,width*3+1],
        [width, width+1, width+2, width+3]
    ]

    // const theTetrominos = [ltetromino,ztetrominos,ttetrominos,otetrominos,itetrominos]
    const theTetrominos = [ltetromino]

    let currentPosition = 4;
    let currentRotation = 0;

    // randomly select tetromino and first rotation
    let random = Math.floor(Math.random()*theTetrominos.length);

    let current = theTetrominos[random][currentRotation];

    // draw the tetroino
    function draw(){
        current.forEach(index => {
            squares[currentPosition+index].classList.add('tetromino');
            squares[currentPosition + index].style.backgroundColor = colors[random];
        })
    };
    
    // Undraw the tetromino
    function undraw(){
        current.forEach(index => {
            squares[currentPosition+index].classList.remove('tetromino');
            squares[currentPosition + index].style.backgroundColor = '';
        })
    }

    // Make the Tetrominos move down every second
    // timerID = setInterval(moveDown, 1000);

    // assign functions to keycodes
    function control(e){
        if(e.keyCode === 37){
            moveLeft();
        } else if (e.keyCode === 38){
            rotate();
        } else if(e.keyCode === 39) {
            moveRight();
        } else if(e.keyCode == 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    // Move down 
    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    // Freeze function 
    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            // Start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random()*theTetrominos.length);
            current = theTetrominos[random][currentRotation]
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    // move the tetromino left, unless is at the edge or there is a blockage
    function moveLeft(){
        undraw()
        const isAtLeftEdge = current.some(index=> (currentPosition + index) % width === 0);

        if(!isAtLeftEdge){
            currentPosition -= 1;
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition +=1;
        }
        draw()
    }

    // move the tetromino right, unless is at the edge or there is a blockage
    function moveRight(){
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index)% width === width -1);

        if(!isAtRightEdge){
            currentPosition += 1;
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1;
        }
        draw()
    }

    // function to rotate the tetrominos 
    function rotate(){
        undraw();
        currentRotation ++;
        if(currentRotation === current.length){
            currentRotation = 0;
        } else {
            current = theTetrominos[random][currentRotation]
            draw()
        }
    }

    // show next-up tetromine
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    const displayIndex = 0;
    
    // another array of 5 tets without rotations
    const upNext = [
        [1, displayWidth+1, displayWidth*2+1,2],
        [0,displayWidth,displayWidth+1,displayWidth+2],
        [1, displayWidth,displayWidth+1, displayWidth+2],
        [0,1,displayWidth, displayWidth+1],
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
    ]

    //display the next shape
    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = '';
        });
        upNext[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
        })
    }
    
    // Start/Stop button

    startBtn.addEventListener('click', () => {
        if(timerId){
            clearInterval(timerId)
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random()*theTetrominos.length);
            displayShape();
        }
    })

    // Add score
    function addScore(){
        for (let i = 0; i < 199; i += width){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7,  i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach(index =>{
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor = '';
                })
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // Game over
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end';
            clearInterval(timerId);
        }
    }
});

