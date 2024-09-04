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

    const sectionId = id.replace('Menu', '');
    document.getElementById(sectionId).querySelector('.down').style.display = 'none';
    document.getElementById(sectionId).querySelector('.up').style.display = 'inline-block';
}

function hideMenu(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.add('hidden');
    dropdown.classList.remove('visible');

    const sectionId = id.replace('Menu', '');
    document.getElementById(sectionId).querySelector('.up').style.display = 'none';
    document.getElementById(sectionId).querySelector('.down').style.display = 'inline-block';
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



