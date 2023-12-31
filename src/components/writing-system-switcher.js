import styles from '@/styles/Home.module.css'

export function switchToHighGalactic() {
    var page = document.querySelector(`.${styles['b-page']}`);
    page.classList.remove(styles['b-page_system_aurebesh']);
    page.classList.add(styles['b-page_system_high-galactic']);
    var linkHg = document.querySelector('#js-language-high-galactic');
    var linkAurebesh = document.querySelector('#js-language-aurebesh');
    linkHg.classList.add(styles['b-language__link_active_yes']);
    linkAurebesh.classList.remove(styles['b-language__link_active_yes']);
}

export function switchToAurebesh() {
    var page = document.querySelector(`.${styles['b-page']}`);
    page.classList.add(styles['b-page_system_aurebesh']);
    page.classList.remove(styles['b-page_system_high-galactic']);
    var linkHg = document.querySelector('#js-language-high-galactic');
    var linkAurebesh = document.querySelector('#js-language-aurebesh');
    linkHg.classList.remove(styles['b-language__link_active_yes']);
    linkAurebesh.classList.add(styles['b-language__link_active_yes']);
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
