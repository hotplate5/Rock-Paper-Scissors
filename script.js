const begin = document.querySelector('#start_button');
let rounds = document.querySelector('select');
let playerScore = 0;
let computerScore = 0;
let table;
let counter = 2;
userPane = document.querySelector('#user_sel');
compPane = document.querySelector('#cpu_sel');
begin.addEventListener('click', function(e){
    let toggle = 0;
    const title = document.querySelector('.title');
    let roundsDisplay = document.createElement('p');
    roundsDisplay.style.fontSize = '12px';
    if (rounds.value == 1) {
        console.log(`You're playing ${rounds.value} round.`);
        roundsDisplay.textContent = `You're playing ${rounds.value} round.`;
    }
    else {
        console.log(`You're playing ${rounds.value} rounds.`);
        roundsDisplay.textContent = `You're playing ${rounds.value} rounds.`
    }
    if (toggle === 0 ) title.appendChild(roundsDisplay);
    else rounds.Display.textContent = rounds.value;
    toggle = 1;
    addTable();
    beginGame();
});


function playRound(e){
    if (counter > rounds.value){
        const victoryMessage = document.createElement('p');
        victoryMessage.textContent = 'You Game!';
        victoryMessage.classList.add('victory');
        const sidebar = document.querySelector('.sidebar');
        sidebar.appendChild(victoryMessage);
        const move_buttons = document.querySelectorAll('.move_button');
        move_buttons.forEach(selection => {
            selection.removeEventListener('click', playRound);
        }); 
    }
    let outcome = evaluate(e.target.id, computerPlay());
    switch (outcome){
        case 0: 
            computerScore++;
            console.log('Computer Wins!');
            break;
        case 1:
            playerScore++;
            console.log('You Win!');
            break;
        case 2:
            console.log('Tie!');
    }
    addRow(table, playerScore, computerScore);
    counter++;
}

function addRow(tablex, data1, data2){
    let row1 = tablex.insertRow();
    let cell1 = row1.insertCell();
    let cell2 = row1.insertCell();
    cell2.classList.add('cpu');
    cell1.textContent = data1;
    cell2.textContent = data2;
}

function addTable(){
    const container = document.querySelector('.sidebar');
    if (table == null){
        table = document.createElement('table');
        addRow(table, 'Player', 'CPU');
        container.appendChild(table);
    }
}

function evaluate(user, comp){
    if (user == comp) return 2;
    else if (user === 'Rock' && comp === 'Paper'){
        addImage('rock', 'paper');
        return 0;
    }
    else if (user === 'Rock' && comp === 'Scissors'){
         addImage('rock', 'scissors');
        return 1;
    }
    else if (user === 'Paper' && comp === 'Rock'){
        addImage('paper', 'rock');
        return 1;
    }
    else if (user === 'Paper' && comp === ' Scissors'){
        addImage('paper', 'scissors');
        return 0;
    }
    else if (user === 'Scissors' && comp === 'Rock'){
        addImage('scissors', 'rock');
        return 0;
    }
    else if (user === 'Scissors' && comp === 'Paper'){
        addImage('scissors', 'paper');
        return 1;}
    
}

function computerPlay(){
    randNum = Math.random()*3+1
    choice = Math.floor(randNum);
    switch (choice){
      case 1:
         return "Rock";
       case 2:
          return "Paper";
      default:
           return "Scissors";
    }
}

function beginGame(){
   const move_buttons = document.querySelectorAll('.move_button');
   move_buttons.forEach(selection => {
       selection.addEventListener('click', playRound);
   }); 
}

function addImage(imgUSR, imgCPU){
    imgUser = document.createElement('img');
    imgUser.src = `${imgUSR}.png`;
    imgComp = document.createElement('img');
    imgComp.src = `${imgCPU}.png`;
    userPane.appendChild(imgUser);
    compPane.appendChild(imgComp);
}