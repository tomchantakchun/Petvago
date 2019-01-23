import React from 'react';
import styles from './HomepageStyles';
import Axios from 'axios';
import "./Homepage.css";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelInfo: null,
            hotelListItems: null,
        }
    }
    async componentDidMount() {
        //    call hotel info api from backend,then set state
        try {
            const _hotelInfo = await Axios.get('http://localhost:8080/api/hotel');
            this.setState({ hotelInfo: _hotelInfo.data });
            const listItems = this.state.hotelInfo.map(
                (e) => <div key={e.id.toString()} className="hotel-info" style={styles.hotalInfo}> 
                         <img src={e.path} style={styles.image}></img>
                         <div style={styles.text}>{e.name}</div>
                        </div>
            );
            this.setState({hotelListItems:listItems});
        } catch (err) {
            console.log(err);
        }
    }

    
    render() {
        return (
            <div className="body" style={styles.body}>
                <div className="background" style={styles.background}>
                    <div className="search-bar" style={styles.searchBar}>I'm Search Bar</div>
                </div>
                <div className="hotel-container" style={styles.container}>
                    {this.state.hotelListItems}
                </div>
            </div>
        )
    }
}


export default Homepage;