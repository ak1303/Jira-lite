let toBox = document.getElementsByClassName('box1')[0];
let addCardBtn = document.getElementById('addcardBtn');

addCardBtn.addEventListener('click',addCard);
function addCard(e){
    let divCard = document.createElement('div');
    divCard.className='divCard';
    toBox.append(divCard);
    let card = document.createElement('div');
    card.contentEditable='true';
    card.innerHTML='Click to edit';
    card.classList.add('card');
    divCard.append(card);
    card.focus();
    let dropDown = document.createElement('select');
    dropDown.id='selector';
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
        console.log('in shift card func');
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
}

