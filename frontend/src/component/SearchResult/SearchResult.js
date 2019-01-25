import React from 'react';
import Axios from 'axios';
import "./SearchResult.css";
import Filter  from "../Filter/Filter";

class SearchResult extends React.Component{
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
                (e) => <div key={e.id.toString()} className="hotel-info-2"  >
                    <img className="hotel-icon-2" src={e.path}  onClick={(e)=>{this.onClickHotelInfo(e)}}></img>
                    <div className="hotel-detail-2">
                        <div className="hotel-name-2">{e.name}</div>
                        <div className="hotel-rate-2"> </div>
                        <div className="room-type"></div>
                        <div className="price"></div>
                        <div></div>
                    </div>
                    
                </div>
            );
            this.setState({ hotelListItems: listItems });
        } catch (err) {
            console.log(err);
        }
    }

    render(){
        return(
            <div className="result-body">
                <div className="filter-container">
               
                <Filter/>
                </div>
                <div className="hotel-container-2" >
                    {this.state.hotelListItems}

                    {/* const listItems = this.state.hotelInfo.map(
                (e) => <div key={e.id.toString()} className="hotel-info-2"  >
                    <img className="hotel-icon-2" src={e.path}  onClick={(e)=>{this.onClickHotelInfo(e)}}></img>
                    <div className="hotel-detail-2">
                        <div className="hotel-name-2">{e.name}</div>
                        <div className="hotel-rate-2"> </div>
                        <div className="room-type"></div>
                        <div className="price"></div>
                        <div></div>
                    </div> */}
                    
                </div>
                </div>
            </div>
        )
    }
}

export default SearchResult;