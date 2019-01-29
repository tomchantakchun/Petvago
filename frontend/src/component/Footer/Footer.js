import React from "react";
import styles from "./FooterStyles";
import "./FooterStyles.css"

function Footer() {
    return (
        <footer className="footer">
            
                {/* <div style={styles.footerStyle}> */}
                    <div className="footer-box" style={styles.childrenStyle}>
                    <div className="footer-container">
                        <div className="footer-items">
                            <a href="/about">About us</a>
                            <a href="/helpcenter">Help center</a>
                            <a href="/term">Terms and conditions</a>
                            <a href="/prviacy">Privacy policy</a>
                        </div>

                        <div className="footer-items">
                            <a href="/becomehost">Become a host</a>
                            <a href="/term">Hosting</a>

                        </div>


                    </div>
                    <p className="copyright">Petvago 2019</p>
                      
                        
                        
                      
                    </div>
                    
                {/* </div> */}
        </footer>
    );
}

export default Footer
