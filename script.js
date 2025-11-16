//select board element
const board=document.querySelector('.board');
const startButton=document.querySelector('.btn-start');
const modal=document.querySelector('.modal');
const startGameModal=document.querySelector('.start-game');
const gameOverModal=document.querySelector('.game-over');
const restartButton=document.querySelector('.btn-restart');
const highScoreElement=document.querySelector('#high-score');
const ScoreElement=document.querySelector('#score');
const timeElement=document.querySelector('#time');



const blockHeight=50
const blockWidth=50
let highScore=localStorage.getItem("highScore")||0
let score=0
let time="00-00"

//calculate number of rows and columns
const cols=Math.floor(board.clientWidth/ blockWidth);
const rows=Math.floor(board.clientHeight/ blockHeight);
//initialize variables
let intervaild=null;
let timerInterval=null;
     //initial food position
let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
//array to hold grid blocks
const blocks=[]
//initial snake position
let snake=[
     {
     x:1, y:3
}
]
//initial direction
let direction='down'
//create grid blocks
     for(let row=0; row<rows;row++){
     for(let col=0; col<cols;col++){
     const block=document.createElement('div');
     block.classList.add("block")
     board.appendChild(block);
     
     blocks[`${row}-${col}`]=block
     }
}
//render function to update snake position
function render(){
        let head=null
        
        blocks[`${food.x}-${food.y}`].classList.add("food")
     if(direction==="left"){
          head={ x: snake[0].x,y:snake[0].y-1}
     }else if(direction==="right"){
          head={x:snake[0].x,y:snake[0].y+1}
     }else if(direction==="down"){
          head={x:snake[0].x+1,y:snake[0].y}
     }else if(direction==="up"){
          head={x:snake[0].x-1,y:snake[0].y}
     }
     if(head.x<0|| head.x>=rows||head.y<0||head.y>=cols){
            clearInterval(intervaild)
          modal.style.display="flex"
          startGameModal.style.display="none"
          gameOverModal.style.display="flex"
          return;
     }


     //food consume logic
     if(head.x==food.x && head.y==food.y){
          blocks[`${food.x}-${food.y}`].classList.remove("food")
          food={
          x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)
              }
               blocks[`${food.x}-${food.y}`].classList.add("food")
               //add new head to snake without removing tail
               snake.unshift(head)
               score+=5
               ScoreElement.innerText=score

               if(score>highScore){
                    highScore=score
                    localStorage.setItem("highScore",highScore.toString())
               }
     }


     //remove fill class from snake body
     snake.forEach(segment => {
      blocks[`${segment.x}-${segment.y}`].classList.remove("fill")

     
     })
     //add new head and remove tail
     snake.unshift(head)
     snake.pop()
     snake.forEach(segment=>{
          blocks[ `${segment.x}-${segment.y}` ].classList.add("fill")
     })
}

//start game on button click
startButton.addEventListener("click",()=>{
     modal.style.display="none"
     intervaild=setInterval(()=>{render() },400)

//timer interval
     timerInterval=setInterval(()=>{
          let [min ,sec]=time.split("-").map(Number)
          if(sec==59){
               min+=1
               sec=0
          }else{
               sec+=1
          }    
          time=`${min}-${sec}`
          timeElement.innerText=time
     },1000)
     })

     

//restart game on button click
restartButton.addEventListener("click", restartGame)
//restart game function
function restartGame(){
     
     blocks[`${food.x}-${food.y}`].classList.remove("food")
     snake.forEach(segment => {
          blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
     })
     score=0
     time="00-00"
     ScoreElement.innerText=score
     timeElement.innerText=time
     highScoreElement.innerText=highScore
    
      modal.style.display="none"
         direction="down"
snake=[
     {
     x:1, y:3  
}]
food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
intervaild=setInterval(()=>{render() },300)
}

//listen to keydown event to change direction
addEventListener("keydown",(event)=>{
   if(event.key=="ArrowUp"){
     direction="up"
   }else if(event.key=="ArrowRight"){
     direction="right"
   }else if(event.key=="ArrowLeft"){
     direction="left"
   }else if(event.key=="ArrowDown"){
     direction="down"
   }
})



