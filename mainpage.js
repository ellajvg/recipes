const buttons = document.querySelectorAll('.topBtn');
const dropdowns = document.querySelectorAll('.dropdown');

function displayOrHideMenu(id) {
    const dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
        displayMenu(id);
    } else {
        hideMenu(id);
    }
}

function displayMenu(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.add('visible');
    dropdown.classList.remove('hidden');
}

function hideMenu(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.add('hidden');
    dropdown.classList.remove('visible');
}

function hideOtherMenus(currentId) {
    dropdowns.forEach(dropdown => {
        if (dropdown.id !== currentId) {
            hideMenu(dropdown.id);
        }
    });
}

buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        const dropdownId = event.target.id.replace('Btn', 'Menu');
        displayOrHideMenu(dropdownId);
        hideOtherMenus(dropdownId);
    });

    button.addEventListener('mouseenter', function (event) {
        const dropdownId = event.target.id.replace('Btn', 'Menu');
        displayMenu(dropdownId);
        hideOtherMenus(dropdownId);
    });
});

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseleave', function () {
        hideMenu(dropdown.id);
    });
});

document.addEventListener('click', function (event) {
    if (!document.getElementById('topBar').contains(event.target)) {
        dropdowns.forEach(dropdown => {
            hideMenu(dropdown.id);
        });
    }
});

document.getElementById('homeBtn').addEventListener('click', function () {
    location.reload();
});


document.getElementById("leftSide").addEventListener("click", function() {
    const images = document.getElementById("images");
    if (images.style.display !== 'none') {
        images.scrollBy({
            left: -390,
            behavior: 'smooth'
        });
    } else {
        const browseId = getVisibleMenu();
        const browse = document.getElementById(browseId);
        browse.scrollBy({
            left: -390,
            behavior: 'smooth'
        });
    }
});

document.getElementById("rightSide").addEventListener("click", function() {
    const images = document.getElementById("images");
    if (images.style.display !== 'none') {
        images.scrollBy({
            left: 390,
            behavior: 'smooth'
        });
    } else {
        const browseId = getVisibleMenu();
        const browse = document.getElementById(browseId);
        browse.scrollBy({
            left: 390,
            behavior: 'smooth'
        });
    }
});

function getVisibleMenu() {
    const menus = document.querySelectorAll('.browse');
    for (let browse of menus) {
        const displayStyle = window.getComputedStyle(browse).display;
        if (displayStyle !== 'none') {
            console.log(browse.id);
            return browse.id;
        }
    }
}



