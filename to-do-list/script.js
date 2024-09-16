const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_container");

let addBtn = document.getElementById("add_btn");

// Funktion til at tilføje opgaver:
function addTask() {
    if(inputBox.value === '') {
        alert("Skriv en opgave for at tilføje den til listen")
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li); //Tilføj li indhold til listContainer

        //Tilføj kryds til opgaveelementer
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    //Slet input boxens indhold:
    inputBox.value = "";
    
    //Kald saveData():
    saveData();
}

addBtn.addEventListener("click", addTask);

/* Tilføj eventListener til Enter tast i input */
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

/* Tilføj eventListener "click" -- Lyt efter checkbox */
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

/* Funktion, der gemmer opgavelisten */
function saveData() {
    reorderList();
    localStorage.setItem("data", listContainer.innerHTML);
}

/* Funktion til at omarrangere opgavelisten */
function reorderList() {
    let items = Array.from(listContainer.getElementsByTagName('li'));
    items.sort((a, b) => {
        return a.classList.contains('checked') - b.classList.contains('checked');
    });
    items.forEach(item => listContainer.appendChild(item));
}

/* Vis gemte data, når browser åbnes */
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    reorderList(); 
}
showTask();
