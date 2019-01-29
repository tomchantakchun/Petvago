import React from 'react';
import "./TextSlideshow.css";

function TextSlideshow () {
    return (
        <div className="carouselContainer">
            <div id="carouselContent" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active text-center p-4" >
                        <div style={{fontSize:'22px',marginBottom:'10px'}}>
                            Jasmine
                        </div>
                        <div style={{fontSize:'17px',marginBottom:'10px', }}>
                            Jasmine booked with us and was an excellent guest. She was really friendly and easy-going. She was totally respectful of the apartment. Would most certainly let her stay - anytime, she is a lovely guest!
                        </div>
                    </div>
                    <div className="carousel-item text-center p-4">
                    <div style={{fontSize:'22px',marginBottom:'10px'}}>
                            Kit
                        </div>
                        <div style={{fontSize:'17px',marginBottom:'10px', }}>
                        It was great hosting Kit. They always kept in touch before and during their stay. He was super nice. 
                         </div>
                    </div>
                    <div className="carousel-item text-center p-4">
                    <div style={{fontSize:'22px',marginBottom:'10px'}}>
                            Pooh
                        </div>
                        <div style={{fontSize:'17px',marginBottom:'10px', }}>
                        It was great hosting Kit. They always kept in touch before and during their stay. He was super nice. 
                         </div>
                    </div>
                </div>
          
       

                <a className="carousel-control-prev" href="#carouselContent" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselContent" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

export default TextSlideshow;