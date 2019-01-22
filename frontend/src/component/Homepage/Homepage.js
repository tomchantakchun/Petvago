import React from 'react';
import styles from './HomepageStyles';
import Axios from 'axios';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelInfo: null,
        }
        this.hotelListItems = 'Loading...';
    }
    async componentDidMount() {
        //    call hotel info api from backend
        //    then set state
        try {
            const _hotelInfo = await Axios.get('http://localhost:8080/api/hotel');
            this.setState({ hotelInfo: _hotelInfo.data })
            console.log(_hotelInfo.data);
            this.hotelListItems = this.state.hotelInfo.map(
                (e) => <div key={e.id.toString()} className="hotel-info"> hi</div>
            )
        } catch (err) {
            console.log(err);
        }
    }

    // hotelInfoList = () => {
        
    // }


    render() {
        return (
            <div className="body" style={styles.body}>
                <div className="background">
                    <div className="searchBar"></div>
                </div>
                <div className="hotel-container">
                    {this.hotelListItems}
                </div>
            </div>
        )
    }
}


export default Homepage;