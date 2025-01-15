const recipeInfo = JSON.parse(localStorage.getItem('recipeInfo'));

document.getElementById('title').textContent = recipeInfo[0];
document.getElementById('recipeTitle').textContent = recipeInfo[0];
document.getElementById('author').textContent = "Chef: " + recipeInfo[1] + "  |  ";
document.getElementById('link').href = recipeInfo[2];
document.getElementById('photo').src = `full_images/${recipeInfo[3]}`;
document.getElementById('photo').alt = recipeInfo[0];

document.getElementById('ingredients1Title').textContent = recipeInfo[4];
addIngredients('ingredients1', JSON.parse(recipeInfo[5]));
if (recipeInfo[6] !== '') {
    document.getElementById('ingredients2Title').textContent = recipeInfo[6];
    addIngredients('ingredients2', JSON.parse(recipeInfo[7]));
    if (recipeInfo[8] !== '') {
        document.getElementById('ingredients3Title').textContent = recipeInfo[8];
        addIngredients('ingredients3', JSON.parse(recipeInfo[9]));
    }
}

document.getElementById('instructions1Title').textContent = recipeInfo[10];
addInstructions('instructions1', JSON.parse(recipeInfo[11]));
if (recipeInfo[12] !== '') {
    document.getElementById('instructions2Title').textContent = recipeInfo[12];
    addInstructions('instructions2', JSON.parse(recipeInfo[13]));
}

localStorage.clear();

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
