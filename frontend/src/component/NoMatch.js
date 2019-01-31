import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class NoMatch extends Component {
   constructor(props){
       super(props);
       this.state={ }
   }

   home=()=>{
      this.props.history.push('/')
   }

   render(){
      return(
         <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20vh', fontFamily:"Sarabun"}}>
         <h2 style={{fontSize:'30px'}}>Seems like this page does not exist!</h2>
         <img style={{borderRadius:"50%", marginTop:'30px'}} src="./image/testamonial1.jpg" alt="dog"/>
         <button className="booking-button" style={{width:'200px'}} onClick={this.home}>Go to homepage</button>
      </div>

      )
   }
   
};

 export default withRouter(NoMatch);