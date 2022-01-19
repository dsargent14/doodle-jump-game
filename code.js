document.addEventListener("DOMContentLoaded", () => {
    let gameBoard = document.querySelector(".gameboard")
    let doodler = document.createElement("div")
    let moveLeft = 50 // manipulate moving doodler left 50px
    let bottomSpace = 150
    let isGameOver = false
    let platformCount = 5 // cleaner code allows for changes later, show how many platforms are on page
    let newPlatArray = []
    let upTimerId;
    let downTimerId;



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
            })
        }


    }


    function fall() {
        clearInterval(upTimerId)
        downTimerId = setInterval(function() {
            bottomSpace -= 5
            doodler.style.bottom = bottomSpace + 'px'
            if (bottomSpace <= 0) {
                gameOver()
            }
        }, 30);


    }

    function jump() { // make a functio to move doodler
        clearInterval(downTimerId)
        upTimerId = setInterval(function() {
            bottomSpace += 20
            doodler.style.bottom = bottomSpace + 'px'
            if (bottomSpace > 350) {
                fall()
            }
        }, 30)



    }

    function gameOver() {
        console.log('game over')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)



    }



    function beggining() {
        if (!isGameOver) {
            Platforms()
            doodleMan()
            setInterval(movePlatforms, 30)
            jump()

        }
    }
    beggining()
})