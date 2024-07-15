let chance=document.querySelector('.current-player');
let boxes=document.querySelectorAll('.box');
let btn=document.querySelector('.btn');

let current;
let arr=[];
let ans;
let winning_pos=
[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function initialise()
{
    current="X";
    ans="";
    arr=["","","","","","","","",""];
    
    boxes.forEach((box)=>{
        box.innerText="";
        box.classList.remove("win");
        box.style.pointerEvents="all";
    })
   
    btn.classList.remove("active");
    chance.innerText=`Current Player - ${current}`;
}
 
initialise();

function changePlayer()
{
    if(current === "X")
      current="O";

    else 
      current="X";

    chance.innerText=`Current Player - ${current}`;
}

function check(index)
{
    if(arr[index] === "")
    {
        boxes[index].innerText=current;
        boxes[index].style.pointerEvents="none";
        arr[index]=current;
        changePlayer();
        checkforwin();
    }
}

function checkforwin()
{
    winning_pos.forEach((pos)=>{
     
    let x=pos[0];
    let y=pos[1];
    let z=pos[2];

    if((arr[x]!="" && arr[y]!="" && arr[z]!="") && (arr[x]===arr[y] && arr[y]===arr[z]))
    {
        ans=arr[x];
        
        boxes[x].classList.add("win");
        boxes[y].classList.add("win");
        boxes[z].classList.add("win");

        boxes.forEach((box)=>{
            box.style.pointerEvents="none"
        });
        
    }
    }); 
    
    if(ans !== ""){
        chance.innerText=`Winner Player - ${ans}`;
        btn.classList.add("active");
        return;
    }

    let fill_count=0;

    arr.forEach((idx)=>{
        if(idx !== "")
          fill_count++;
    })

    if(fill_count === 9)
    {
        chance.innerText=`Game Tied`;
        btn.classList.add("active");
    }
}


boxes.forEach((box,index) =>
{
    box.addEventListener("click",
    ()=>{
        check(index);
    }
)
});

btn.addEventListener("click",initialise);