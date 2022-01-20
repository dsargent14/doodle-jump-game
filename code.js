document.addEventListener("DOMContentLoaded", () => {
    let gameBoard = document.querySelector(".gameboard")
    let doodler = document.createElement("div")
    let moveLeft = 50 // manipulate moving doodler left 50px
    let startPoint = 150
    let bottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5 // cleaner code allows for changes later, show how many platforms are on page
    let newPlatArray = []
    let upTimerId;
    let downTimerId;
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0



    function doodleMan() {
        gameBoard.appendChild(doodler)
        doodler.classList.add('doodler') // make the doodler class used in css
        moveLeft = newPlatArray[0].left
        doodler.style.left = moveLeft + 'px' // css manipulation .style 
        doodler.style.bottom = bottomSpace + 'px'

    }

    class Platform {
        constructor(newBottomSpace) {
            this.bottom = newBottomSpace
            this.left = Math.random() * 315 // make sure its within the grid random num between 1-315
            this.visual = document.createElement('div')

            let visual = this.visual // store as variale first classlist wont work
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            gameBoard.appendChild(visual)



        }
    }

    function Platforms() { // create a function to add platforms

        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount // use height pixel i.e 600 to calculate gap
            let newBottomSpace = 100 + i * platGap // use for loop to implement gap space
            let newPlatform = new Platform(newBottomSpace)
            newPlatArray.push(newPlatform) // add new paltforms to the empty array
            console.log(newPlatArray)



        }

    }

    function movePlatforms() { // make a function to move the platforms

        if (bottomSpace > 200) {
            newPlatArray.forEach(plat => {
                plat.bottom -= 4 // each platform will move in 4s
                let visual = plat.visual
                visual.style.bottom = plat.bottom + 'px'
                if (plat.bottom < 10) {
                    let firstPlat = newPlatArray[0].visual
                    firstPlat.classList.remove('platform')
                    newPlatArray.shift()
                    score++
                    let newPlatform = new Platform(600)
                    newPlatArray.push(newPlatform)
                }

            })
        }


    }


    function fall() {
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function() {
            bottomSpace -= 5
            doodler.style.bottom = bottomSpace + 'px'
            if (bottomSpace <= 0) {
                gameOver()
            }
            newPlatArray.forEach(platform => {
                if (
                    (bottomSpace >= platform.bottom) &&
                    (bottomSpace <= platform.bottom + 15) &&
                    ((moveLeft + 60) >= platform.left) &&
                    (moveLeft <= (platform.left + 45)) &&
                    !isJumping
                ) {
                    console.log('landed')
                    startPoint = bottomSpace
                    jump()
                }
            })
        }, 30);


    }

    function jump() { // make a functio to make  doodler jump
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function() {
            bottomSpace += 20
            doodler.style.bottom = bottomSpace + 'px'
            if (bottomSpace > startPoint + 200) {
                fall()
            }
        }, 30)



    }

    function gameOver() {
        console.log('game over')
        isGameOver = true
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild)
        }
        gameBoard.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)



    }


    function control(e) { // make a function to move doodler
        if (e.key === "ArrowLeft") {
            left()
        } else if (e.key === "ArrowRight") {
            right()
        } else if (e.key === "ArrowUp") {
            moveStraight()
        }
    }

    function left() { // make a function to move doodler left on key press
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function() {
            if (moveLeft >= 0) {
                moveLeft -= 5
                doodler.style.left = moveLeft + 'px'

            } else right()

        }, 20)

    }

    function right() {
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function() {
            if (moveLeft <= 340) {
                moveLeft += 5
                doodler.style.left = moveLeft + 'px'
            } else left()
        }, 20)
    }

    function moveStraight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
    }

    function beggining() {
        if (!isGameOver) {
            Platforms()
            doodleMan()
            setInterval(movePlatforms, 30)
            jump()
            document.addEventListener('keyup', control)

        }
    }
    beggining()
})