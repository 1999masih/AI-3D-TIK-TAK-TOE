let nodeExpands = 0
let wholeNodeExpands = 0;
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



function randomNextTurn(){

    let available = [];
    for(let i = 0 ; i < 16; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] == ''){
                available.push({i,j});
            }
        }
    }
    let move = random(available);
    board[move.i][move.j] = human;
    turn = 1
}

function randomAIbestMove(){
    let bestScore = -Infinity;
    let move;
    let stopDepth;
    let emptyCount = 0;
    emptyCount = emptySpace(board);
    if(64 - emptyCount < 4){
        stopDepth = 1;
    }else if (64- emptyCount < 25){
        stopDepth = 3;
    }else {
        stopDepth = 4;
    }
    for(let i = 0 ; i < 16; i++){
        for(let j = 0; j < 4; j++){

            if(board[i][j] == ''){
                board[i][j] = ai;
                let score = minimax(board, 0, false, -Infinity, Infinity, stopDepth);
                console.log(nodeExpands);
                nodeExpands = 0;
                board[i][j] = '';
                if(score > bestScore){
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    console.log('bestScore',move.i, move.j, bestScore);
    
    board[move.i][move.j] = ai;
    turn = 0;
    
}

function Ai_vs_Rand(){
    if(turn == 0){
        randomNextTurn();
    } else if(turn == 1){
        randomAIbestMove();
    }
}

function emptySpace(board){
    let count = 0;
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] == ''){
                count++;
            }
        }
    }
    return count;
}


function AIbestMove(){
    let bestScore = -Infinity;
    let move;
    let emptyCount = 0;
    let stopDepth;
    let breakLoop = false;

    emptyCount = emptySpace(board)
    if(64 - emptyCount < 4){
        stopDepth = 1;
    }else if (64- emptyCount < 25){
        stopDepth = 3;
    }else {
        stopDepth = 4;
    }
    for(let i = 0 ; i < 16; i++){
        for(let j = 0; j < 4; j++){

            if(board[i][j] == ''){
                board[i][j] = players[AIcurrrentPlayer];
                let board1 = board.slice();
                console.log('board1', board1);
                board1[i][j] = players[(AIcurrentPlayer+1) % players.length];
                let winner = utility1(board1);
                if(winner == players[(AIcurrentPlayer+1) % players.length]){
                    move = { i, j };
                    breakLoop = true;
                    break;
                    
                }
                
                let score = AIminimax(board, 0, false, -Infinity, Infinity, stopDepth);
                board[i][j] = '';
                console.log(nodeExpands);
                nodeExpands = 0;

                if(score > bestScore){
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
        if(breakLoop){break;}
    }
    console.log('bestScore',players[AIcurrentPlayer],move.i, move.j, bestScore);
    
    board[move.i][move.j] = players[AIcurrentPlayer];
    AIcurrentPlayer = (AIcurrentPlayer+1) % players.length;
}


function AIminimax(board, depth, maximizingPlayer, alpha, beta, stopDepth){
    let result = utility();
    if(result !== null && result != 'tie'){

        if(maximizingPlayer == true){
            return -500;
        }else if(maximizingPlayer == false){
            return 500
        }
    }

    nodeExpands++;
    wholeNodeExpands++;

    if(result == 'tie'){
        return 0;
    }


    if(depth == stopDepth){
        let point = AIheuristic();
        if(maximizingPlayer == true){
            return point.p1Score;
        }else if(maximizingPlayer == false){
            return point.p2Score;
        }
    }
    
    let breakLoop = false;

    if(maximizingPlayer){
        bestScore = -Infinity;
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 4; j++){
                
                if(board[i][j] == ''){
                    board[i][j] = players[AIcurrrentPlayer];
                    let score = AIminimax(board, depth + 1, false, alpha, beta, stopDepth);
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
                    board[i][j] = players[((AIcurrentPlayer+1) % players.length)];
                    let score = AIminimax(board, depth + 1, true, alpha, beta, stopDepth);
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

function bestMove(){
    let bestScore = -Infinity;
    let move;
    let stopDepth;
    let emptyCount = 0;
    let breakLoop = false;
    emptyCount = emptySpace(board);
    if(64 - emptyCount < 4){
        stopDepth = 1;
    }else if (64 - emptyCount < 25){
        stopDepth = 3;
    }else {
        stopDepth = 4;
    }
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] == ''){
                board[i][j] = ai;
                let board1 = board.slice();
                board1[i][j] = human;
                let winner = utility1(board1);
                if(winner == human){
                    move = {i, j};
                    breakLoop = true;
                    break;
                }
                let score = minimax(board, 0, false, -Infinity, Infinity, stopDepth);
                console.log('score',i, j, score);
                board[i][j] = '';
                if(score > bestScore){
                    bestScore = score;
                    // console.log('bestScore',i,j,bestScore);
                    move = {i, j};
                }
            }
        }
        if(breakLoop){break;}
    }

    console.log('bestScore',move.i, move.j, bestScore);
    board[move.i][move.j] = ai;
    currentPlayer = human;
}

function minimax(board, depth, maximizingPlayer, alpha, beta, stopDepth){
    let result = utility();
    if(result !== null && result != 'tie'){

        if(maximizingPlayer == true){
            return -500;
        }else if(maximizingPlayer == false){
            return 500
        }
    }

    if(result == 'tie'){
        return 0;
    }
    // if(result == 'X'){
    //     return 500;
    // }else if(result == 'O'){
        //     return -500;
        // }else if(result == 'tie'){
            //     return 0;
            // }
            
    nodeExpands++;
    wholeNodeExpands++;


    if(depth == stopDepth){
        let point = heuristic2();
        return point.p1Score;
    }
    
    let breakLoop = false;

    if(maximizingPlayer){
        bestScore = -Infinity;
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 4; j++){
                
                if(board[i][j] == ''){
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false, alpha, beta, stopDepth);
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
                    let score = minimax(board, depth + 1, true, alpha, beta, stopDepth);
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

function AIheuristic(){
    let p1Score = 0;
    let p2Score = 0;

    
    //horizontall in every 4*4
    for(let i = 0; i < 16; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            // let flag1 = false;
            // let flag2 = false;
            if(board[i][j] == players[AIcurrrentPlayer]){
                score1++;
                
            }
            else if(board[i][j] == players[((AIcurrentPlayer+1) % players.length)]){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score +=score1;
        }

        if(score1 == 0 && score2 > 1){
            p2Score += score2;
        }

    }


    //VERTICALLY in every 4*4
    for(let i = 0; i < 16; i=i+4){
        let score1 = 0;
        let score2 = 0
        for(let j = 0; j < 4; j++){
            for(let k = 0; k < 4; k++){
                if(board[i + k][j] == players[AIcurrrentPlayer]){
                    score1++;
                }else if(board[i + k][j] == players[((AIcurrentPlayer+1) % players.length)]){
                    score2++;
                }
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    //DIAGONAL 1
    for(let i = 0; i < 16; i = i + 4){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            if(board[i + j][j] == players[AIcurrrentPlayer]){
                score1++;
            }else if(board[i + j][j] == players[((AIcurrentPlayer+1) % players.length)]){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
        
    }

    //DIAGONAL 2
    for(let i = 0; i < 16; i = i + 4){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            if(board[i + j][3 - j] == players[AIcurrrentPlayer]){
                score1++;
            }else if(board[i + j][3 - j] == players[((AIcurrentPlayer+1) % players.length)]){
                score2++;
            }
            
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
        
    }

    //3D VERTICAL
    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            for(let k = 0; k < 16; k = k + 4){
                if(board[i + k][j] == players[AIcurrrentPlayer]){
                    score1++;
                }else if(board[i + k][j] == players[((AIcurrentPlayer+1) % players.length)]){
                    score2++;
                }
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0
        for(let j = 0; j < 16; j = j + 5){
            if(board[j][i] == players[AIcurrrentPlayer]){
                score1++;
            }else if(board[j][i] == players[((AIcurrentPlayer+1) % players.length)]){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 3; j < 13; j = j + 3){
            if(board[j][i] == players[AIcurrrentPlayer]){
                score1++;
            }else if(board[j][i] == players[((AIcurrentPlayer+1) % players.length)]){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }


    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            if(board[i + 4*j][j] == players[AIcurrrentPlayer]){
                score1++;
            }else if(board[i + 4*j][j] == players[((AIcurrentPlayer+1) % players.length)]){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            if(board[i + 4*j][3 - j] == players[AIcurrrentPlayer]){
                score1++;
            }else if(board[i + 4*j][3 - j] == players[((AIcurrentPlayer+1) % players.length)]){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    //3D DIAGONAL
    let dig1_score1 = 0;
    let dig1_score2 = 0;
    for(let i = 0; i < 4; i++){
        if(board[5*i][i] == players[AIcurrrentPlayer]){
            dig1_score1++;
        } else if(board[5*i][i] == players[((AIcurrentPlayer+1) % players.length)]){
            dig1_score2++;
        }
    }
    if(dig1_score2 == 0 && dig1_score1 > 1){
        p1Score += dig1_score1;
    }

    if(dig1_score1 == 0 && dig1_score2 > 0){
        p2Score += dig1_score2;
    }

    let dig2_score1 = 0;
    let dig2_score2 = 0;
    for(let i = 0; i < 4; i++){
        if(board[5*i][3 - i] == players[AIcurrrentPlayer]){
            dig2_score1++;
        }else if(board[5*i][3 - i] == players[((AIcurrentPlayer+1) % players.length)]){
            dig2_score2++;
        }
    }
    if(dig2_score2 == 0 && dig2_score1 > 1){
        p1Score += dig2_score1;
    }

    if(dig2_score1 == 0 && dig2_score2 > 0){
        p2Score += dig2_score2;
    }

    let dig3_score1 = 0;
    let dig3_score2 = 0;
    for(let i = 0; i < 4; i++){
        if(board[3*i + 3][i] == players[AIcurrrentPlayer]){
            dig3_score1++;
        }else if(board[3*i + 3][i] == players[((AIcurrentPlayer+1) % players.length)]){
            dig3_score2++;
        }
    }
    if(dig3_score2 == 0 && dig3_score1 > 1){
        p1Score += dig3_score1;
    }

    if(dig3_score1 == 0 && dig3_score2 > 0){
        p2Score += dig3_score2;
    }

    let dig4_score1 = 0;
    let dig4_score2 = 0;
    for(let i = 0; i < 4; i++){
        if(board[3*i + 3][3 - i] == players[AIcurrrentPlayer]){
            dig4_score1++;
        }else if(board[3*i + 3][3 - i] == players[((AIcurrentPlayer+1) % players.length)]){
            dig4_score2++;
        }
    }
    if(dig4_score2 == 0 && dig4_score1 > 1){
        p1Score += dig4_score1;
    }

    if(dig4_score1 == 0 && dig4_score2 > 0){
        p2Score += dig4_score2;
    }

    
    p2Score = (-p2Score);
    let scores = {p1Score:p1Score, p2Score:p2Score};

    

    return scores;

}

function heuristic2(){

    let p1Score = 0;
    let p2Score = 0;

    
    //horizontall in every 4*4
    for(let i = 0; i < 16; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            // let flag1 = false;
            // let flag2 = false;
            if(board[i][j] == 'X'){
                score1++;
                
            }
            else if(board[i][j] == 'O'){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score +=score1;
        }

        if(score1 == 0 && score2 > 1){
            p2Score += score2;
        }

    }


    //VERTICALLY in every 4*4
    for(let i = 0; i < 16; i=i+4){
        let score1 = 0;
        let score2 = 0
        for(let j = 0; j < 4; j++){
            for(let k = 0; k < 4; k++){
                if(board[i + k][j] == 'X'){
                    score1++;
                }else if(board[i + k][j] == 'O'){
                    score2++;
                }
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    //DIAGONAL 1
    for(let i = 0; i < 16; i = i + 4){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            if(board[i + j][j] == 'X'){
                score1++;
            }else if(board[i + j][j] == 'O'){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
        
    }

    //DIAGONAL 2
    for(let i = 0; i < 16; i = i + 4){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            if(board[i + j][3 - j] == 'X'){
                score1++;
            }else if(board[i + j][3 - j] == 'O'){
                score2++;
            }
            
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
        
    }

    //3D VERTICAL
    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            for(let k = 0; k < 16; k = k + 4){
                if(board[i + k][j] == 'X'){
                    score1++;
                }else if(board[i + k][j] == 'O'){
                    score2++;
                }
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0
        for(let j = 0; j < 16; j = j + 5){
            if(board[j][i] == 'X'){
                score1++;
            }else if(board[j][i] == 'O'){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 3; j < 13; j = j + 3){
            if(board[j][i] == 'X'){
                score1++;
            }else if(board[j][i] == 'O'){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }


    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            if(board[i + 4*j][j] == 'X'){
                score1++;
            }else if(board[i + 4*j][j] == 'O'){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    for(let i = 0; i < 4; i++){
        let score1 = 0;
        let score2 = 0;
        for(let j = 0; j < 4; j++){
            if(board[i + 4*j][3 - j] == 'X'){
                score1++;
            }else if(board[i + 4*j][3 - j] == 'O'){
                score2++;
            }
        }
        if(score2 == 0 && score1 > 1){
            p1Score += score1;
        }

        if(score1 == 0 && score2 > 0){
            p2Score += score2;
        }
    }

    //3D DIAGONAL
    let dig1_score1 = 0;
    let dig1_score2 = 0;
    for(let i = 0; i < 4; i++){
        if(board[5*i][i] == 'X'){
            dig1_score1++;
        } else if(board[5*i][i] == 'O'){
            dig1_score2++;
        }
    }
    if(dig1_score2 == 0 && dig1_score1 > 1){
        p1Score += dig1_score1;
    }

    if(dig1_score1 == 0 && dig1_score2 > 0){
        p2Score += dig1_score2;
    }

    let dig2_score1 = 0;
    let dig2_score2 = 0;
    for(let i = 0; i < 4; i++){
        if(board[5*i][3 - i] == 'X'){
            dig2_score1++;
        }else if(board[5*i][3 - i] == 'O'){
            dig2_score2++;
        }
    }
    if(dig2_score2 == 0 && dig2_score1 > 1){
        p1Score += dig2_score1;
    }

    if(dig2_score1 == 0 && dig2_score2 > 0){
        p2Score += dig2_score2;
    }

    let dig3_score1 = 0;
    let dig3_score2 = 0;
    for(let i = 0; i < 4; i++){
        if(board[3*i + 3][i] == 'X'){
            dig3_score1++;
        }else if(board[3*i + 3][i] == 'O'){
            dig3_score2++;
        }
    }
    if(dig3_score2 == 0 && dig3_score1 > 1){
        p1Score += dig3_score1;
    }

    if(dig3_score1 == 0 && dig3_score2 > 0){
        p2Score += dig3_score2;
    }

    let dig4_score1 = 0;
    let dig4_score2 = 0;
    for(let i = 0; i < 4; i++){
        if(board[3*i + 3][3 - i] == 'X'){
            dig4_score1++;
        }else if(board[3*i + 3][3 - i] == 'O'){
            dig4_score2++;
        }
    }
    if(dig4_score2 == 0 && dig4_score1 > 1){
        p1Score += dig4_score1;
    }

    if(dig4_score1 == 0 && dig4_score2 > 0){
        p2Score += dig4_score2;
    }

    
    p2Score = (-p2Score);
    let scores = {p1Score:p1Score, p2Score:p2Score};

    

    return scores;


}



