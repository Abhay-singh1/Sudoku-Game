const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];


var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;


window.onload = function(){
    id("btn").addEventListener("click", startGame);

    for (let i =0 ; i< id("number-container").children.length; i++){
        id("number-container").children[i].addEventListener("click",function (){
            if (!disableSelect){
                if(this.classList.contains("selected")){
                    this.classList.remove("selected")
                    selectedNum = null;
                }
                else{
                    for(i=0; i<9 ;i++){
                        id("number-container").children[i].classList.remove("selected")
                        console.log("Selected!")

                    }
                    this.classList.add("selected")
                    selectedNum = this
                    updateMove()
                }
            }
        })
    }

}



function startGame(){
    let board = easy[0];
    disableSelect = false;

    generateBoard(board);

    id('number-container').classList.remove('hidden')
}

function generateBoard(board){
    clearPrevious();

    let idCount = 0

    for(let i =0; i<81;i++){
        let tile = document.createElement("p");
        if(board.charAt(i) != "-"){
            tile.textContent = board.charAt(i)
        }
        else{
            tile.addEventListener("click",function(){
                if(!disableSelect){
                    if(tile.classList.contains("selected")){
                        tile.classList.remove("selected")
                        selectedTile = null
                    }
                    else{
                        for(let i = 0; i < 81; i++){
                            qsa(".tile")[i].classList.remove("selected")
                        }
                        tile.classList.add("selected")
                        selectedTile = tile
                        updateMove()
                    }
                }
            })
        }

        tile.id = idCount;
        idCount++;
        tile.classList.add("tile");

        if((tile.id > 17 && tile.id<27) || (tile.id>44 && tile.id<54)){
            tile.classList.add("bottomBorder");
        }
        if((tile.id + 1)%9 ==3 || (tile.id+1)%9 == 6){
            tile.classList.add("rightBorder");
        }
        id("board").appendChild(tile);
    }
}

function updateMove(){
    if(selectedTile && selectedNum){
        selectedTile.textContent = selectedNum.textContent
        if(checkCorrect(selectedTile)){
            selectedTile.classList.remove("selected")
            selectedNum.classList.remove("selected")
            selectedNum = null
            selectedTile = null
        }
        else{
            disableSelect =true
            selectedTile.classList.add("incorrect")

            setTimeout(() => {
                lives--;
                if(lives === 0){
                    endGame();
                } else{
                    disableSelect = false
                }
                selectedTile.classList.remove("incorrect")
                selectedTile.classList.remove("selected")
                selectedNum.classList.remove("selected")
                selectedTile.textContent = ''
                selectedTile = null
                selectedNum = null
            },1000)
        }
    }
}

function checkCorrect(tile){
    let solution = easy[1];

    if(solution.charAt(tile.id) === tile.textContent) return true;
    

    else    return false;
    
}

function clearPrevious(){
    let tiles = qsa('.tile');
    
    for(let i=0; i<tiles.length;i++){
        tiles[i].remove();
    }
}

function id(id){
    return document.getElementById(id);
}

function qs(selector){
    return document.querySelector(selector);
}

function qsa(selector){
    return document.querySelectorAll(selector);
}