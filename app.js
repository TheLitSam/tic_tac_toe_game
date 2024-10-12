let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector("#newgame-btn");
let count = 0;

let turnX = true;

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msg.classList.add("hide");
    newBtn.classList.add("hide");
    resetBtn.classList.remove("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("Box was Clicked")
        
        if(turnX) {
            box.style.color = "#eb5e28"
            box.innerText = "X";
            turnX = false;
        } else {
            box.style.color = "#403d39"
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;

        count++;

        let isWinner = checkWinner();
        if(count===9 && !isWinner) {
            msg.innerText = "Game Is Draw, No One Won";
            msg.classList.remove("hide");
            newBtn.classList.remove("hide");
            resetBtn.classList.add("hide");
        }
        // console.log(count);
    })
})

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msg.classList.remove("hide");
    newBtn.classList.remove("hide");
    resetBtn.classList.add("hide");
}

const checkWinner = () => {
    for(let pattern of winPattern) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("Winner", pos1Val)
                showWinner(pos1Val);
                disableBoxes();
                return true;
            }
        }
    }
}

newBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)