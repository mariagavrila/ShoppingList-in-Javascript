const form = document.querySelector('#list-form');//principal form
const items = document.querySelector('.list-group'); //the ul element
const confirmBtn = document.querySelector('#confirmBtn'); // confirm to clean all
const inputItem = document.querySelector('#item'); //principal input
const invalidInput = document.querySelector('.invalid-input'); //div with warning for empty input
const countLabel = document.querySelector('.label-info');
var countItems = document.querySelectorAll('li').length;

//counter for html labels and ids
var i = 4;


loadEventListeners();

function loadEventListeners() {

    inputItem.addEventListener('keypress', setInputValue);
    form.addEventListener('submit', addItem);
    items.addEventListener('click', removeItem);
    items.addEventListener('click', editItem);
    items.addEventListener('click', checkItem);
    items.addEventListener('submit', confirmEdit);
    confirmBtn.addEventListener('click', removeAll);
}

function addItem (e) {
    
    if (inputItem.value === '') {
        invalidInput.style.display = 'inline-block';
      }
    else {
        //create a new li and append to the ul element
        const li = document.createElement('li');
        li.className = 'list-group-item';
        //using the liElement function to render the li content
        liElement(li, inputItem.value);

        items.appendChild(li);

        inputItem.value = '';
        countItems++; 
    }

    i++;
    e.preventDefault();
}
//on first key press remove the warning of empty input
function setInputValue (e) {
    invalidInput.style.display = 'none';
}
function removeItem (e) {

    if(e.target.classList.contains('fa-trash-alt')) {
        e.target.parentElement.parentElement.parentElement.remove();
        countItems--;
    }
}
function editItem (e) {

    const targetEdit = e.target.parentElement.parentElement.parentElement;
    //console.log(targetEdit);

    if(e.target.classList.contains('fa-pencil-alt')) {
        //getting the current label value to place in the new input
        var labelValue = e.target.parentElement.parentElement.previousElementSibling.children[1].textContent;
        //replace the li content with a form to edit the item
        targetEdit.innerHTML = '<form id="editForm"></form>';

        const form = document.querySelector('#editForm');
        const div = document.createElement('div');
        div.className = 'input-group-prepend';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.id = 'edit';
        input.value = labelValue;

        const btn = document.createElement('button');
        btn.type = 'submit';
        btn.className = 'btn btn-light ml-3';
        btn.id = 'confirmButton';
        btn.innerHTML = '<i class="far fa-check-circle fa-2x"></i>';

        div.appendChild(input);
        div.appendChild(btn);
        form.appendChild(div);

        input.focus();

    }
}
 //on submit rerender the li with the new input value
function confirmEdit (e) {
    let liConfirm = e.target.parentElement;
    let input = e.target.children[0].children[0].value;

    //passing a div instead li, just to make reusable de liElement function, because in this case I already have the li
    liConfirm.innerHTML = '<div id = "div-box"></div>';

    let div = document.querySelector('#div-box');

    liElement(div, input);
    //remove the class name of div to avoid crashes from the querySelector
    div.classList.remove('div-box');

    e.preventDefault();

}
//add a line-through if checked the inputs checkbox
//add transition effect and move checked elements down the list
function checkItem (e) {
    //if the input clicked the label is the sibling
    let label = e.target.nextElementSibling || e.target;

    let parent= e.target.parentElement.parentElement;
    //the li parent element of the checkbox after being edited
    if(e.target.parentElement.parentElement.id =='div-box'){
        parent = e.target.parentElement.parentElement.parentElement;
    }

    if(e.target.parentElement.classList.contains('checkbox') && e.target.checked){

        if(items.lastElementChild === parent){
            //add a line through text of the label
            label.className = 'line-t';
        }

        else {
            label.className = 'line-t';
            //the class for transition effect
            parent.classList.add('moveli');
            //combining with timeout to get a slowly get down effect(not working very well) 
            setTimeout(function(){ 

                parent.classList.remove('moveli');

                parent.classList.add('finishmove');
                
            }, 800);
       }    
       e.stopPropagation();
    }
    //get back elements if unchecked
    if (e.target.type === 'checkbox' && !e.target.checked) {

        if (items.lastElementChild === parent){

            label.classList.remove('line-t');
        }
    
        else {

            label.classList.remove('line-t');

            parent.classList.add('moveliback');
      
            setTimeout(function(){ 

                parent.classList.remove('moveliback');

                parent.classList.remove('finishmove');
            
            }, 1000);
        }
    }

}
function removeAll () {
        while(items.firstChild) {
            items.removeChild(items.firstChild);
        }
}
//count all the items
countLabel.innerText = countItems;

