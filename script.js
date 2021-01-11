let myLibrary = [];
let q = 'hid';

if (storageAvailable('localStorage')) {
    getLibrary(myLibrary);
    myLibrary && myLibrary.length != 0) 
    myLibrary.forEach(book => showLibrary(book));
    let closeCard = document.querySelectorAll('.close2');
    closeCard.forEach((x) => {x.style.visibility = 'hidden';});
}
function Book(title, author, genre, status) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.status = status;
}

document.querySelector('#delete').addEventListener('click', toggleDelete);
const table = document.querySelector('#table'); //creates book list

function showLibrary(newBook) {
    let currentDisplay = document.querySelector("#table");

    let newBookCard = document.createElement('div');
    newBookCard.classList.add('card');

        // Create new book card content
        let titleCard = document.createElement('h4');
        titleCard.classList.add('content', 'titles');
        titleCard.textContent = newBook.title;

        let authorCard = document.createElement('p');
        authorCard.classList.add('content');
        authorCard.textContent = `by ${newBook.author}`;

        let genreCard = document.createElement('p');
        genreCard.classList.add('content', 'genre');
        genreCard.textContent = newBook.genre;

        let readCard = document.createElement('p');
        readCard.classList.add('content', 'read');
        if (newBook.status == 'on') {
            readCard.classList.add('green');
        } else {
            readCard.classList.add('red');
        }
        readCard.addEventListener('click', e => {
            readCard.setAttribute('style', 'font-weight: bold;')
            toggleColor();
            readCard.setAttribute('style', 'font-weight: normal;')
        });

        let closeCard = document.createElement('span');
        closeCard.classList.add('close1','close2');
        closeCard.innerHTML = "x";
        if (q == 'vis') {
            closeCard.style.visibility = 'visible';
        } else {
            closeCard.style.visibility = 'hidden';
        }
        closeCard.addEventListener('click', (e) => {
            e.target.parentNode.parentNode.removeChild(newBookCard)
            myLibrary.splice(e, 1);
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));   
        });
    
    newBookCard.append(closeCard, titleCard, authorCard, genreCard, readCard);
    currentDisplay.appendChild(newBookCard);
};

function addElement(content) {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = content;
    const newContent = document.createTextNode(content);
    table.appendChild(newDiv);
}


const close = document.querySelector('#close');
close.style.display = 'none';

close.addEventListener('click', e => {
    closeForm();
});

const button = document.querySelector('#btn') 

var display = document.querySelector('#formcontent');
var body = document.getElementsByTagName("BODY")[0];

var form = document.createElement("form"); //create's the submission form
    createInput(form, 'Author');
    createInput(form, 'Title');
    createInput(form, 'Genre');
    createInput(form, 'Read');
    form.style.display = 'none';

    const submit = document.createElement('button');
    submit.type = 'button';
    submit.classList.add('submit');
    submit.innerHTML = 'Add';
    form.appendChild(submit);
    submit.style.display = 'none';

    const inputs = document.querySelectorAll('input');

    button.addEventListener('click', e => {
        form.style.display = 'block';
        submit.style.display = 'block';
        close.style.display = 'block';
        display.style.display = 'block';
        submit.style.display = 'block';
        body.classList.add('dim'); 
    });

    
    
    submit.addEventListener('click', e => {
        var author = document.getElementById("Author").value;
        var title = document.getElementById('Title').value;
        var genre = document.getElementById('Genre').value;
        var read = document.getElementById('Read');
        var status;
        inputs.forEach((x) => {
            x.value = '';
        })
        if (read.checked) {
            status = 'on';
        } else {
            status = 'off';
        }
        if (author == '' || title == '') {
            alert('Please fill out author and title.')
        } else {
            let newBook = new Book(title, author, genre, status);
            myLibrary.push(newBook);
            showLibrary(newBook);
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
            closeForm();
        }
    
    });


function createInput(f, labels) {
    var label = document.createElement("div");
    label.innerHTML = labels;
    
    var input = document.createElement("input"); //input element, text
    input.setAttribute('type',"text");
    input.setAttribute('id', labels);
    if (labels == 'Read') {
        label.innerHTML = 'Read?';
        input.setAttribute('type', 'checkbox');
    }

    f.appendChild(label);
    f.appendChild(input);

    let display = document.getElementById('formcontent')
    display.style.display = 'none';
    display.appendChild(f);
}


function closeForm() {
    form.style.display = 'none';
    submit.style.display = 'none';
    close.style.display = 'none';
    display.style.display = 'none';
    body.classList.remove('dim');
}


function toggleDelete() {
    let closeCard = document.querySelectorAll('.close2');
    closeCard.forEach((x) => {
            if (x.style.visibility === 'visible'){
                q = 'hid'
                x.style.visibility = 'hidden';
                x.classList.remove('fade-in')
                x.classList.remove('scale-in-center')
            } else {
                q = 'vis'
                x.classList.add('fade-in')
                x.style.visibility = 'visible';
                x.classList.add('scale-in-center')
            }
    })
}

function toggleColor() {
    let titleCard = document.querySelectorAll('.read');
    titleCard.forEach((x) => {
        if (x.classList.contains('green') && x.style.fontWeight === 'bold') {
            x.classList.remove('green');
            x.classList.add('red');
        } else if (x.classList.contains('red') && x.style.fontWeight === 'bold'){
            x.classList.remove('red');
            x.classList.add('green');
        }
    });
};

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function getLibrary() {
    var currentLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (currentLibrary) {
        myLibrary = currentLibrary;
    }
}


