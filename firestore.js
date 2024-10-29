import {initializeApp} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCyc-QZ062hJqezfwk-KF23_d3Ofx3oeRU",
    authDomain: "recipes-47932.firebaseapp.com",
    projectId: "recipes-47932",
    storageBucket: "recipes-47932.appspot.com",
    messagingSenderId: "624375411130",
    appId: "1:624375411130:web:8ad902354d76d507226d83",
    measurementId: "G-HMLRH0YPBX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('browseBreakfasts').addEventListener('click', function() {
    const breakfasts = ["bananaBread", "bananaMuffins", "breakfastCookies", "bananaPancakes"];
    previewRecipes("BreakfastRecipes", breakfasts, "breakfastPreviews");
});

document.getElementById('browseDinnerLunches').addEventListener('click', function() {
    const lunchDinners = ["beefBulgogi", "capreseSandwich", "mapleSalmon", "creamyChicken"];
    previewRecipes("LunchDinnerRecipes", lunchDinners, "lunchDinnerPreviews");
});

document.getElementById('browseDesserts').addEventListener('click', function() {
    const desserts = ["appleCrumble", "mugBrownie", "carrotCake", "chocoChip", "chocoPeanut", "strawberry"];
    previewRecipes("DessertRecipes", desserts, "dessertPreviews");
});

document.getElementById('browseAdditions').addEventListener('click', function() {
    const additions = ["boiledEggs", "candiedWalnuts", "mangoSalsa", "oreoFrosting", "rice"];
    previewRecipes("AdditionRecipes", additions, "additionPreviews");
});

async function previewRecipes(collection, recipes, preview) {
    const promises = recipes.map(async (recipe) => {

        const docRef = doc(db, collection, recipe);
        const docSnap = await getDoc(docRef);
        const ingredientList = docSnap.data().ingredients;

        addIngredients(recipe + "Ingredients", ingredientList);

        if (recipe === "appleCrumble") {
            addIngredients("appleCrumbleTopping", docSnap.data().ingredients2);
        } else if (recipe === "bananaMuffins") {
            addIngredients("BananaMuffinTopping", docSnap.data().ingredients2)
        } else if (recipe === "carrotCake") {
            addIngredients("carrotCakeFrosting", docSnap.data().ingredients2);
            addIngredients("carrotCakeDecor", docSnap.data().ingredients3);
        } else if (recipe === "chocoPeanut") {
            addIngredients("chocoPeanutFrosting", docSnap.data().ingredients2);
            addIngredients("chocoPeanutDecor", docSnap.data().ingredients3);
        } else if (recipe === "strawberry") {
            addIngredients("strawberryFrosting", docSnap.data().ingredients2);
            addIngredients("strawberryDecor", docSnap.data().ingredients3);
        }
        document.getElementById(recipe + "Info").textContent = docSnap.data().information;
    });

    await Promise.all(promises);

    document.getElementById('images').style.display = 'none';
    document.getElementById(preview).style.display = 'flex';
}

const recipeButtons = document.querySelectorAll('.toRecipeBtn');
recipeButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.parentElement.id === 'carrotCakeFav') {
            viewRecipe('DessertRecipes', 'carrotCake');
        } else if (this.parentElement.id === 'chocoChipFav') {
            viewRecipe('DessertRecipes', 'chocoChip');
        } else if (this.parentElement.id === 'chocoPeanutFav') {
            viewRecipe('DessertRecipes', 'chocoPeanut');
        } else {
            const recipeId = this.parentElement.parentElement.id;
            let collectionId = this.parentElement.parentElement.parentElement.id;
            collectionId = collectionId.charAt(0).toUpperCase() + collectionId.slice(1);
            collectionId = collectionId.replace("Previews", "Recipes");
            viewRecipe(collectionId, recipeId);
        }
    });
});


async function viewRecipe(collection, recipe) {
    localStorage.clear()

    const docRef = doc(db, collection, recipe);
    const docSnap = await getDoc(docRef);
    const recipeDiv = document.getElementById(recipe);

    localStorage.setItem('recipeTitle', docSnap.data().title);
    localStorage.setItem('author', docSnap.data().author);
    localStorage.setItem('link', docSnap.data().link);
    localStorage.setItem('photo', recipe + ".jpg");

    const ing1Title = recipeDiv.querySelector(".ing1").textContent;
    localStorage.setItem('ingredients1Title', ing1Title);
    const ingredientList1 = docSnap.data().ingredients;
    localStorage.setItem('ingredients1', JSON.stringify(ingredientList1));
    const ingredientList2 = docSnap.data().ingredients2;
    if (ingredientList2) {
        localStorage.setItem('ingredients2', JSON.stringify(ingredientList2));
        const ing2Title = recipeDiv.querySelector(".ing2").textContent;
        localStorage.setItem('ingredients2Title', ing2Title);
        const ingredientList3 = docSnap.data().ingredients3;
        if (ingredientList3) {
            localStorage.setItem('ingredients3', JSON.stringify(ingredientList3));
            const ing3Title = recipeDiv.querySelector(".ing3").textContent;
            localStorage.setItem('ingredients3Title', ing3Title);
        }
    }

    let ins1Title = recipeDiv.querySelector(".ing1").textContent;
    ins1Title = ins1Title.replace("Ingredients", "Steps");
    localStorage.setItem('instructions1Title', ins1Title);
    const instructionList1 = docSnap.data().instructions;
    localStorage.setItem('instructions1', JSON.stringify(instructionList1));
    const instructionList2 = docSnap.data().instructions2;
    if (instructionList2) {
        localStorage.setItem('instructions2', JSON.stringify(instructionList2));
        let ins2Title = recipeDiv.querySelector(".ing2").textContent;
        ins2Title = ins2Title.replace("Ingredients", "Steps");
        localStorage.setItem('instructions2Title', ins2Title);
        /*
        const instructionList3 = docSnap.data().instructions3;
        if (instructionList3) {
            localStorage.setItem('instructions3', JSON.stringify(instructionList3));
            let ins3Title = recipeDiv.querySelector(".ing3").textContent;
            ins3Title = ins3Title.replace("Ingredients", "Steps");
            localStorage.setItem('instructions3Title', ins3Title);

        }

         */
    }

    window.open('full/index.html');
}

function addIngredients(divId, ingredients) {
    const div = document.getElementById(divId);
    let listHTML = "<ul>";
    ingredients.forEach(item => {
        listHTML += `<li>${item}</li>`;
    });
    listHTML += "</ul>";
    div.innerHTML = listHTML;
}




