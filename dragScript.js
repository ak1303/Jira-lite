let toBox = document.getElementsByClassName('box1')[0];
let addCardBtn = document.getElementById('addcardBtn');

addCardBtn.addEventListener('click',addCard);
function addCard(e){
    let divCard = document.createElement('div');
    divCard.draggable='true';
    divCard.id='card-'+Date.now();
    divCard.className='divCard';
    toBox.append(divCard);
    let card = document.createElement('div');
    card.contentEditable='true';
    card.innerHTML='Click to edit';
    card.classList.add('card');
    divCard.append(card);
    card.focus();
    let dropDown = document.createElement('select');
    ['ToDo','InProgress','Completed'].forEach(value=>{
        let option = document.createElement('option');
        option.innerHTML=value;
        option.value=value;
        dropDown.append(option);
    });
    let buttons = document.createElement('div');
    buttons.className='rightBtn';
    buttons.append(dropDown);
    divCard.append(buttons);

    card.addEventListener('click',()=>{
        if(card.innerHTML.trim()=='Click to edit')
            card.innerHTML='';
    });
    dropDown.addEventListener('change',shiftCard);
    function shiftCard(e){
        let parentDiv = e.target.parentElement.parentElement;
        if(e.target.value=='InProgress'){
            let inProgBox = document.getElementsByClassName('box2')[0];
            inProgBox.append(parentDiv);
        }else if(e.target.value=='Completed'){
            let inCompBox = document.getElementsByClassName('box3')[0];
            inCompBox.append(parentDiv);
        }else{
            toBox.append(parentDiv);
        }
    }

    card.addEventListener('blur',(e)=>{
        let node = e.target;
        if(!node.innerHTML.trim()){
            node.parentElement.remove();
        }
    })
    let btn = document.createElement('button');
    btn.id='delete';
    btn.innerHTML='delete';
    buttons.append(btn);

    btn.addEventListener('click',()=>{
        let response = window.confirm("Click OK if you want to remove this task");
        if(response)divCard.remove();
    })

    // drag feature

    divCard.addEventListener("dragstart", (eventDetails)=>{
        let cardDragged  = eventDetails.target
        eventDetails.dataTransfer.setData("text/plain" ,  divCard.id)
        cardDragged.style.opacity = "0.5"

    })

    divCard.addEventListener("dragend", (eventDetails)=>{
        let cardDragged  = eventDetails.target
        cardDragged.style.opacity = 1 // resetting the opacity when drag is complete
    })

    let dragEvents = ["dragover", "dragenter", "drop"]
    dragEvents.forEach(dropEvent=>{
           document.querySelectorAll(".box").forEach(column =>{
                 column.addEventListener(dropEvent, (eventDetails)=>{
                      eventDetails.preventDefault()
                      if(dropEvent == "drop"){
                          const cardId = eventDetails.dataTransfer.getData("text/plain")
                          const divCard = document.getElementById(cardId)
                          changeSelector(column,divCard);
                          column.append(divCard)
                      }
                 })
           })
    })
    function changeSelector(column,divCard){
        let dropdown = divCard.querySelector('select');
        if(column.classList.contains('inProgress')){
            dropdown.selectedIndex = 1;
        }
        else if(column.classList.contains('completed')){
            dropdown.selectedIndex = 2;
        }else{
            dropdown.selectedIndex = 0;
        }
    }
}

