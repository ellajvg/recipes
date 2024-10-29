document.getElementById('title').textContent = localStorage.getItem('recipeTitle');
document.getElementById('recipeTitle').textContent = localStorage.getItem('recipeTitle');
document.getElementById('author').textContent = "Chef: " + localStorage.getItem('author') + "  |  ";
document.getElementById('link').href = localStorage.getItem('link');
document.getElementById('photo').src = `full_images/${localStorage.getItem('photo')}`;
document.getElementById('photo').alt = localStorage.getItem('recipeTitle');

document.getElementById('ingredients1Title').textContent = localStorage.getItem('ingredients1Title');
addIngredients('ingredients1', JSON.parse(localStorage.getItem('ingredients1')));
if (localStorage.getItem('ingredients2')) {
    document.getElementById('ingredients2Title').textContent = localStorage.getItem('ingredients2Title');
    addIngredients('ingredients2', JSON.parse(localStorage.getItem('ingredients2')));
    if (localStorage.getItem('ingredients3') !== null) {
        document.getElementById('ingredients3Title').textContent = localStorage.getItem('ingredients3Title');
        addIngredients('ingredients3', JSON.parse(localStorage.getItem('ingredients3')));
    }
}

document.getElementById('instructions1Title').textContent = localStorage.getItem('instructions1Title');
addInstructions('instructions1', JSON.parse(localStorage.getItem('instructions1')));
if (localStorage.getItem('instructions2') !== null) {
    document.getElementById('instructions2Title').textContent = localStorage.getItem('instructions2Title');
    addInstructions('instructions2', JSON.parse(localStorage.getItem('instructions2')));
}

function addIngredients(divId, ingredients) {
    const div = document.getElementById(divId);
    let listHTML = "<ul>";
    ingredients.forEach(item => {
        listHTML += `
            <li>
                <input type="checkbox" id="${item}" name="ingredient" value="${item}">
                <label for="${item}">${item}</label>
            </li>`;
    });
    listHTML += "</ul>";
    div.innerHTML = listHTML;
}

function addInstructions(divId, instructions) {
    const div = document.getElementById(divId);
    let listHTML = "<ol>";
    instructions.forEach(item => {
        listHTML += `<li>${item}</li>`;
    });
    listHTML += "</ol>";
    div.innerHTML = listHTML;
}
