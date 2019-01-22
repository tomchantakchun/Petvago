import React from 'react';
import styles from 'HomepageStyles';
import Axios from 'axios';
class Homepage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hotelInfo:[null],
        }
    }
    componentDidMount(){
//    call hotel info api from backend
    Axios.get('http://localhost:8080/api/hotel')
//    and then set state

    }

    hotelInfoList(){
        return this.state.hotelInfo.map(){

        }
    }


    render(){
        return(
            <div className="body" style={styles.body}>
                <div className="background">
                    <div className="searchBar">{props.searchBar}</div>
                </div>
                <div className="hotel-container">
                    {hotelInfoList}
                </div>
            </div>
        )
    }
}


export default Homepage;