export function switchToHighGalactic() {
    var page = document.querySelector('.b-page');
    page.classList.remove('b-page_system_aurebesh');
    page.classList.add('b-page_system_high-galactic');
    var linkHg = document.querySelector('#js-language-high-galactic');
    var linkAurebesh = document.querySelector('#js-language-aurebesh');
    linkHg.classList.add('b-language__link_active_yes');
    linkAurebesh.classList.remove('b-language__link_active_yes');
}

export function switchToAurebesh() {
    var page = document.querySelector('.b-page');
    page.classList.add('b-page_system_aurebesh');
    page.classList.remove('b-page_system_high-galactic');
    var linkHg = document.querySelector('#js-language-high-galactic');
    var linkAurebesh = document.querySelector('#js-language-aurebesh');
    linkHg.classList.remove('b-language__link_active_yes');
    linkAurebesh.classList.add('b-language__link_active_yes');
}

export function wireUpLanguageSwitch() {
    var linkHg = document.querySelector('#js-language-high-galactic');
    linkHg.addEventListener('click', function(e) {
        switchToHighGalactic();
    });
    var linkAurebesh = document.querySelector('#js-language-aurebesh');
    linkAurebesh.addEventListener('click', function(e) {
        switchToAurebesh();
    });
}
