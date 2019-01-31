import React from 'react';
import Axios from 'axios';
import "./TextSlide.css";
import "./Homepage.css";
import TextSlideshow from "../TextSlideshow/TextSlideshow";
import RatingBar from "./RatingBar-non-edit";
import Search from '../Search/Search';
import * as actionTypes from '../../store/actions';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
library.add(faQuoteRight);

const mapDispatchToProps = dispatch => {
    return {
        changeHotelId:(hotelId) =>dispatch({type:actionTypes.CHANGEHOTELID, hotelId :hotelId})
    }
};

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
                (e) => <div key={e.id.toString()} id={`hotel-id-${e.id}`} className="hotel-info"  >
                    <img className="hotel-icon " src={e.path}  onClick={(e)=>{this.onClickHotelInfo(e)}} alt="hotelIcon"></img>
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
        console.log(Number(e.target.parentElement.id.replace('hotel-id-','')));
        const _hotelId = Number(e.target.parentElement.id.replace('hotel-id-',''));
        this.props.changeHotelId(_hotelId);
        this.props.history.push('./hotel/');
    }

    redirectToSearchResult = ()=>{
        this.props.history.push('../search_result');
    }

    render() {
        return (
            <div className="home-body" >
                <div className="background" >
                 <Search history={this.redirectToSearchResult}/>
                </div>
                <div className='hotel-container-container'>
                    <div className="split text-left">Recommended Hotel:</div>
                    <div className="hotel-container">
                        {this.state.hotelListItems}
                    </div>
                </div>
                
                <div className="home-testamonial">
                <h2>What pet lovers say about us <FontAwesomeIcon icon="quote-right" style={{marginLeft:'10px', color:'#50b5a9'}}/></h2>
                <TextSlideshow/>
                </div>
               
            </div>
        )
    }
}


export default  withRouter(connect(null,mapDispatchToProps)(Homepage));