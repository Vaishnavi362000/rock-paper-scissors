let score =JSON.parse(localStorage.getItem('score'));
  updateScoreElement();

  let isAutoPlaying=false;
  let intervalId;

  function autoPlay(){
    if(isAutoPlaying){
      intervalId = setInterval(function(){
        const playerMove = pickComputerMove();
        playGame(playerMove);
      },1000);
      isAutoPlaying=false;

    }else{
      clearInterval(intervalId);
      isAutoPlaying=true;
    }
  }

  document.querySelector('.js-rock-button')// instead of onclick nut ive not used for paper and scissors for ref 001
    .addEventListener('click', ()=>{
      playGame('rock');
    });

  document.body.addEventListener('keydown', (event)=>{
    if(event.key=='r'){
      playGame('rock');
    }else if(event.key=='p'){
      playGame('paper');
    }else if(event.key==='s'){
      playGame('scissors');
    }
  });

  function playGame(playerMove){
    const computerMove = pickComputerMove();
      let result='';
      if (playerMove === 'scissors'){
        if(computerMove === 'rock'){
          result='You loose';
        }else if (computerMove ==='paper'){
          result='You win';
        }else if (computerMove === 'scissors'){
          result='tie';
        } 
      }else if (playerMove === 'paper') {
        if(computerMove === 'rock'){
          result='You win';
        }else if (computerMove ==='paper'){
          result='tie';
        }else if (computerMove === 'scissors'){
          result='You loose';
        }
      }else if (playerMove === 'rock'){
        if(computerMove === 'rock'){
          result='tie';
        }else if (computerMove ==='paper'){
          result='You Loose';
        }else if (computerMove === 'scissors'){
          result='You win';
        }
      }

      if(result==='You win'){
        score.wins += 1;
      }else if(result==='You loose'){
        score.losses += 1;
      }else if(result==='tie'){
        score.ties += 1;
      }

      localStorage.setItem('score',JSON.stringify(score));//variables are temperory storage
      //localstorage stores only string value so we need to convert using json

      updateScoreElement();

      document.querySelector('.js-result')
      .innerHTML = result;

      document.querySelector('.js-moves')
      .innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`
    }

    function updateScoreElement(){
      document.querySelector(".js-score")
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }


    let computerMove = '';
    function pickComputerMove(){
      const randomNumber = Math.random();
      if (randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'rock';
      }else if (randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
      }else if (randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'scissors';
      }
      return computerMove;
    }