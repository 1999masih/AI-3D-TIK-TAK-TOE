function nextTurn(){

    let available = [];
    for(let i = 0 ; i < 16; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] == ''){
                available.push({i,j});
            }
        }
    }
    let move = random(available);
    board[move.i][move.j] = ai;
    currentPlayer = human
}