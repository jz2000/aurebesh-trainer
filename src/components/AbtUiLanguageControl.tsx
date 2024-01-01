import React from 'react';
import styles from '@/styles/AbtUiLangiageControl.module.css'
import { AbtUiLanguage } from './abtTypes';


export type AbtUiLanguageControlProps = {
    currentAbtUiLanguage: AbtUiLanguage,
    onChangeAbtUiLanguage: (newAbtUiLanguage: AbtUiLanguage) => void;
};

export const AbtUiLanguageControl = (props: AbtUiLanguageControlProps): React.ReactElement => {
    const onAurebeshLinkClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        props.onChangeAbtUiLanguage('aurebesh');
    };

    const onHighGalacticLinkClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        props.onChangeAbtUiLanguage('high_galactic');
    };

    return (
        <div className={styles.b_language}>
            <div className={styles.b_language__aurebesh}>
                <a
                    href="#"
                    className={`${styles.b_language__link} ${props.currentAbtUiLanguage === 'aurebesh' ? styles.b_language__link_active_yes : ''}`}
                    id="js-language-aurebesh"
                    onClick={onAurebeshLinkClick}
                >
                    ab
                </a>
            </div>
            <div className={styles.b_language__high_galactic}>
                <a
                    href="#"
                    className={`${styles.b_language__link} ${props.currentAbtUiLanguage === 'high_galactic' ? styles.b_language__link_active_yes : ''}`}
                    id="js-language-high-galactic"
                    onClick={onHighGalacticLinkClick}
                >
                    high galactic
                </a>
            </div>
        </div>
    );
};
