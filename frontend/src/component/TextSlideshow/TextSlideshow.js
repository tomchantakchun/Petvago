import React from 'react';
import "./TextSlideshow.css";

function TextSlideshow () {
    return (
        <div className="carouselContainer">
            <div id="carouselContent" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active text-center p-4" >
                        <div className="testamonial-box">
                        <img className="testamonial-icon" src="./image/testamonial1.jpg" alt="test1"/>
                        <div style={{fontSize:'17px',marginBottom:'10px', marginLeft:'20px'}}>
                            <span style={{fontStyle: 'italic'}}>"Jasmine booked with us and was an excellent guest. She was really friendly and easy-going. Would most certainly let her stay - anytime, she is a lovely guest!"</span>
                            <span style={{display:'block', marginTop:'20px',fontSize:'15px',color:'gray'}}>Jasmine</span>
                        </div>
                        </div>
                    </div>
                <div className="carousel-item text-center p-4">
                    <div className="testamonial-box">
                        <img className="testamonial-icon" src="./image/testamonial2.jpg" alt="test2"/>
                        <div style={{fontSize:'17px',marginBottom:'10px',marginLeft:'20px' }}>
                                <span style={{fontStyle: 'italic'}}>"It was great hosting Kit. They always kept in touch before and during their stay. He was super nice. "</span>
                                <span style={{display:'block', marginTop:'20px',fontSize:'15px',color:'gray'}}>Kit-kit</span>
                        </div>
                    </div>
                
                </div>
                <div className="carousel-item text-center p-4">
                    <div className="testamonial-box">
                        <img className="testamonial-icon" src="./image/testamonial3.jpg" alt='test3'/>
                        <div style={{fontSize:'17px',marginBottom:'10px',marginLeft:'20px'  }}>
                                <span style={{fontStyle: 'italic'}}>"By default jobs only have one attempt, that is when they fail, they are marked as a failure, and remain that way until you intervene."</span>
                                <span style={{display:'block', marginTop:'20px',fontSize:'15px',color:'gray'}}>Pooh</span>
                        </div>
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