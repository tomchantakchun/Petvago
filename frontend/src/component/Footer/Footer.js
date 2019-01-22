import React from "react";
import styles from "./FooterStyles";
import "./FooterStyles.css"

function Footer() {
    return (
        <div>
            <div style={styles.phantomStyle}/>
                <div style={styles.footerStyle}>
                    <div style={styles.childrenStyle}>
                        <a href="/about">About us</a>
                        <a href="/helpcenter">Help center</a>
                        <a href="/term">Terms & conditions</a>
                        <a href="/prviacy">Privacy terms</a>
                        <a href="/becomehost">Become a host</a>
                        <a href="/term">Hosting</a>
                    </div>
                </div>
        </div>
    );
}

export default Footer
