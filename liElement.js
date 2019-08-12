const liElement = function (li, inputValue) {

    const div = document.createElement('div');
    div.className = 'checkbox';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `checkbox${i}`;
    div.appendChild(input);
    
    let labelFor = 5;
    const label = document.createElement('label');
    label.htmlFor = `checkbox${i}`;
    label.className = 'labelValue ml-1';
    label.appendChild(document.createTextNode(inputValue));
    div.appendChild(label);

    const div2 = document.createElement('div');
    div2.className = 'float-right';

    const link = document.createElement('a');
    link.href = '#';
    link.innerHTML = '<i class="fas fa-pencil-alt mr-4"></i>';
    div2.appendChild(link);

    const link2 = document.createElement('a');
    link2.className = 'trash';
    link2.href = '#';
    link2.innerHTML = '<i class="fas fa-trash-alt mr-3"></i>';
    div2.appendChild(link2);

    li.appendChild(div);
    li.appendChild(div2);
    
}