import React from 'react';
import Axios from 'axios';
import "./TextSlide.css";
import "./Homepage.css";
import TextSlideshow from "../TextSlideshow/TextSlideshow";
import RatingBar from "../RatingBar-non-edit";
import Search from '../Search/Search';

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
                (e) => <div key={e.id.toString()} className="hotel-info"  >
                    <img className="hotel-icon " src={e.path}  onClick={(e)=>{this.onClickHotelInfo(e)}}></img>
                    <div className="hotel-detail">
                        <div className="hotel-name">{e.name}</div>
                        <div className="hotel-rate">
                            <RatingBar rating={e.averageRating}/>
                            <p className="hotel-rate-number">{e.averageRating}</p>
                        </div>
                    </div>
                </div>
            );
            this.setState({ hotelListItems: listItems });
        } catch (err) {
            console.log(err);
        }
    }

    onClickHotelInfo(e){
        console.log(e);
        // put corresponding index in to redux for redirection
    }


    render() {
        return (
            <div className="home-body" >
                <div className="background" >
                    <div className="search-bar">
                        <Search/>
                    </div>
                </div>
                <div className="split text-left">Recommended Hotel:</div>
                <div className="hotel-container">
                    
                    {this.state.hotelListItems}
                </div>
                
                <TextSlideshow/>
               
            </div>
        )
    }
}


export default Homepage;