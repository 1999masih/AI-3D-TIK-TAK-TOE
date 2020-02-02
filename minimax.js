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

let scores = {
    'X': 10,
    'O': -10,
    'tie':0
}


function bestMove(){
    let bestScore = -Infinity;
    let move;
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] == ''){
                board[i][j] = ai;
                let score = minimax(board, 0, false, -Infinity, Infinity);
                board[i][j] = '';
                if(score > bestScore){
                    bestScore = score;
                    move = {i, j};
                }
            }
        }
    }

    board[move.i][move.j] = ai;
    currentPlayer = human;
}

function minimax(board, depth, maximizingPlayer, alpha, beta){
    let result = checkWinner();
    if(result !== null){
        return scores[result];
    }
    
    let breakLoop = false;

    if(maximizingPlayer){
        bestScore = -Infinity;
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 4; j++){
                
                if(board[i][j] == ''){
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false, alpha, beta);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                    alpha = max(alpha, score);
                    if(beta <= alpha){
                        breakLoop = true;
                        break;
                    }
                }

            }
            if(breakLoop){break;}
        }
        return bestScore;
    }
    else{
        let bestScore = Infinity;
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 4; j++){
                if(board[i][j] == ''){
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true, alpha, beta);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                    beta = min(beta, score);
                    if(beta <= alpha){
                        breakLoop = true;
                        break;
                    }
                }
            }
            if(breakLoop){break;}
        }
        return bestScore;
    }
}


function heuristic(){

    let evel_two_row = 0;
    let eval_3_row = 0;
    let eval_4_row = 0;
    //check the two cell 
    for(let i = 0; i < 16; i++){
        if(equals2(board[i][0], board[[i][0]])){
            eval_two_row++;
        }
    }
    
    



    return 1;
}