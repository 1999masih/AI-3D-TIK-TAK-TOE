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
    'X': 100,
    'O': -100,
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

    let score = 0;
    let winner = null;

    //horizontally wins
    for(let i = 0; i < 16; i++){
        if(equals4(board[i][0], board[i][1], board[i][2], board[i][3])){
            winner = board[i][0];
            if(winner == ai){
                return 100;
            } else{
                return -100;
            }
        }
    }
    //Vertical wins
    for(let i = 0; i < 16; i = i + 4){
        for(let j = 0; j < 4; j++){
            if(equals4(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])){
                winner = board[i][j];
                if(winner == ai){
                    return 100;
                }else {
                    return -100;
                }
            }
        }
    }
    

    //DIAGONAL
    for(let i = 0 ; i < 16; i = i + 4){
        if(equals4(board[i][0], board[i + 1][1], board[i + 2][2], board[i + 3][3]) && i + 4 < 16){
            winner = board[i][0];
            if(winner == ai){
                return 100;
            }else {
                return -100;
            }
        }
    }

    for(let i = 0 ; i < 16; i = i + 4){
        if(equals4(board[i][3], board[i + 1][2], board[i + 2][1], board[i + 3][0]) && i + 4 < 16){
            winner = board[i][3];
            if(winner == ai){
                return 100;
            }else {
                return -100;
            }
        }
    }

    //3D vertical
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(equals4(board[i][j], board[i + 4][j], board[i + 8][j], board[i + 12][j])){
                winner = board[i][j];
                if(winner == ai){
                    return 100;
                }else {
                    return -100;
                }
            }
        }
    }
    if(equals4(board[0][0], board[5][1], board[10][2], board[15][3])){
        winner = board[0][0];
        if(winner == ai){
            return 100;
        }else {
            return -100;
        }
    }

    if(equals4(board[0][3], board[5][2], board[10][1], board[15][0])){
        winner = board[0][3];
        if(winner == ai){
            return 100;
        }else {
            return -100;
        }
    }
    
    if(equals4(board[3][0], board[6][1], board[9][2], board[12][3])){
        winner = board[3][0];
        if(winner == ai){
            return 100;
        }else {
            return -100;
        }
        
    }

    if(equals4(board[3][3], board[6][2], board[9][1], board[12][0])){
        winner = board[3][3];
        if(winner == ai){
            return 100;
        }else {
            return -100;
        }      
    }

    for(let i = 0; i < 4; i++){
        if(equals4(board[0][i], board[5][i], board[10][i], board[15][i])){
            winner = board[0][i];
            if(winner == ai){
                return 100;
            }else {
                return -100;
            }      
        }
    }

    for(let i = 0; i < 4; i++){
        if(equals4(board[3][i], board[6][i], board[9][i], board[12][i])){
            winner = board[3][i];
            if(winner == ai){
                return 100;
            }else {
                return -100;
            }      
            
        }
    }

    //NOW THE FUN BEGINS:(((
    

    //*number of two cell next to eachother horizontally in every 4*4
    for(let i = 0; i < 16; i++){
        if(equals2(board[i][0], board[i][1]) && board[i][2] == ''){
            winner = board[i][0];
            if(winner == ai){
                score += 5;
            }else {
                score -= 5;
            }  
        }

        if(equals2(board[i][1], board[i][2]) && board[i][0] == '' && board[i][3] == ''){
            winner = board[i][1];
            if(winner == ai){
                score += 5;
            }else {
                score -= 5;
            }  
        }
        if(equals2(board[i][2], board[i][3]) && board[i][1] == ''){
            winner = board[i][2];
            if(winner == ai){
                score += 5;
            }else {
                score -= 5;
            }  
        }

    }

    //*number of two cell next to eachother vertically in every 4*4
    for(let i = 0; i + 4 < 16; i = i + 4){
        for(let j = 0; j < 4; j++){

                if(equals2(board[i][j], board[i+1][j]) && board[i+2][j] ==''){
                    winner = board[i][j];
                    if(winner == ai){
                        score += 5;
                    }else {
                        score -= 5;
                    }  
                }
    
                if(equals2(board[i + 1][j], board[i + 2][j]) && board[i][j] =='' && board[i + 3][j] == ''){
                    winner = board[i+1][j];
                    if(winner == ai){
                        score += 5;
                    }else {
                        score -= 5;
                    }  
                }   
    
                if(equals2(board[i + 2][j], board[i + 3][j]) && board[i + 1][j] == ''){
                    winner = board[i+2][j];
                    if(winner == ai){
                        score += 5;
                    }else {
                        score -= 5;
                    }  
                }

            }
        }

    //*number of two cell next to eachother diagonally in every 4*4
    for(let i = 0; i + 4 < 16; i = i +4){
        if(equals2(board[i][0], board[i+1][1]) && board[i+2][2] == ''){
            winner = board[i][0];
            if(winner == ai){
                score += 5;
            }else {
                score -= 5;
            }  
        }   

        if(equals2(board[i + 1][1], board[i + 2][2]) && board[i][0] == '' && board[i + 3][3] == ''){
            winner = board[i+1][1];
            if(winner == ai){
                score += 5;
            }else {
                score -= 5;
            }  
        }

        if(equals2(board[i+2][2], board[i+3][3]) && board[i+1][1] == ''){
            winner = board[i+2][2];
            if(winner == ai){
                score += 5;
            }else {
                score -= 5;
            }  
        }
    }

    //*number of two cell next to  eachother vertically in 3D view
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(equals2(board[i][j], board[i+4][j]) && board[i+8][j] ==''){
                winner = board[i][j];
                if(winner == ai){
                    score += 5;
                }else {
                    score -= 5;
                } 
            }

            if(equals2(board[i+4][j], board[i+8][j]) && board[i][j] =='' && board[i+12][j]){
                winner = board[i+4][j];
                if(winner == ai){
                    score += 5;
                }else {
                    score -= 5;
                } 
            }

            if(equals2(board[i+8][j], board[i+12][j]) && board[i+4][j] ==''){
                winner = board[i+8][j];
                if(winner == ai){
                    score += 5;
                }else {
                    score -= 5;
                } 
            }
        }
    }

    //*number of two cell next to eachother diagonally in 3D view

    //*FIRST ONE
    if(equals2(board[0][0], board[5][1]) && board[10][2] ==''){
        winner = board[0][0];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        } 
    }

    if(equals2(board[5][1], board[10][2]) && board[0][0] == '' && board[15][3] ==''){
        winner = board[5][1];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }
    }

    if(equals2(board[10][2], board[15][3]) && board[5][1] == ''){
        winner = board[10][2];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }
    }

    //*SECOND ONE
    if(equals2(board[0][3], board[5][2]) && board[10][1] ==''){
        winner = board[0][3];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        } 
    }

    if(equals2(board[5][2], board[10][1]) && board[0][3] == '' && board[15][0] ==''){
        winner = board[5][2];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }
    }

    if(equals2(board[10][1], board[15][0]) && board[5][2] == ''){
        winner = board[10][1];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }
    }

    //*third one
    if(equals2(board[3][0], board[6][1]) && board[9][2] ==''){
        winner = board[3][0];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        } 
    }

    if(equals2(board[6][1], board[9][2]) && board[3][0] == '' && board[12][3] ==''){
        winner = board[6][1];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }
    }

    if(equals2(board[9][2], board[12][3]) && board[6][1] == ''){
        winner = board[9][2];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }
    }

    //*fourth one
    if(equals2(board[3][3], board[6][2]) && board[9][1] == ''){
        winner = board[3][3];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }

    }

    if(equals2(board[6][2], board[9][1]) && board[3][3] =='' && board[12][0] == ''){
        winner = board[6][2];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }
    }

    if(equals2(board[9][1], board[12][0]) && board[6][1] == ''){
        winner = board[9][1];
        if(winner == ai){
            score += 5;
        }else {
            score -= 5;
        }
    }

    //TODO:NOW THREE CELLS IN THE ROW!


}