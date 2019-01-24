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
            const _hotelInfo = await Axios.get('http://localhost:8080/api/hotel/');
            this.setState({ hotelInfo: _hotelInfo.data });
            console.log(this.state.hotelInfo)
            const listItems = this.state.hotelInfo.map(
                (e) => <div key={e.id.toString()} className="hotel-info"  >
                    <img className="hotel-icon" src={e.path}  onClick={(e)=>{this.onClickHotelInfo(e)}}></img>
                    <div className="hotel-name">{e.name}</div>
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
                <div className="hotel-container" >
                    {this.state.hotelListItems}
                </div>
            </div>
        )
    }
}

export default SearchResult;