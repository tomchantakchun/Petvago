import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import "./Search.css";
//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel } from '@fortawesome/free-solid-svg-icons'

library.add(faHotel)

class Search extends React.Component {
    districts = ['Central and Western', 'Eastern', 'Islands', 'Kowloon City', 'Kwai Tsing', 'Kwun Tong', 'North', 'Sai Kung', 'Sha Tin', 'Sham Shui Po', 'Southern', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Wan Chai', 'Wong Tai Sin', 'Yau Tsim Mong', 'Yuen Long']

    handleSearch = (e) => {
        e.preventDefault();
        console.log('search start')
        axios.post(`http://localhost:8080/api/search/`,
            {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                district: this.state.district,
                petType: this.state.petType
            })
            .then(response => {
                if (response === null) {
                    console.log('you are living failure')
                } else {
                    console.log(response.data)
                    for (let i=0; i < response.data.length; i++){
                    console.log(response.data[i].startDate)
                    };
                }
            this.props.onSearch(this.state);
            })
            .catch(error => {
                console.log(error)
            })
    }

    startDateChange = (e) => {
        console.log('startDateChange')
        this.setState({ startDate: e.target.value })
    }

    endDateChange = (e) => {
        console.log('endDateChange')
        this.setState({ endDate: e.target.value })
    }

    districtChange = (e) => {
        console.log('districtChange')
        this.setState({ district: e.target.value })
    }

    petTypeChange = (e) => {
        console.log('petTypeChange')
        this.setState({ petType: e.target.value })
    }


    render() {
        const serachDistricts = (
            <select name="district" onChange={this.districtChange}>
                <option value="NA" disabled selected hidden>--District--</option>
                {this.districts.map((district, index) => {
                    return <option value={district} key={index}>{district}</option>
                })}
            </select>
        )

        let today = new Date().toISOString().split('T')[0];
        
        //find 12 weeks later
        let threeMonthLater = new Date();
        threeMonthLater.setDate(threeMonthLater.getDate()+84);
        threeMonthLater = threeMonthLater.toISOString().split('T')[0];
               
        return (
            <div className="search" >
             <h1>{this.props.SearchHistory.district}</h1>
                <form>
                <FontAwesomeIcon icon="hotel" />
                    <input type='date' id='start' name='startDate' min={today} max={threeMonthLater} onChange={this.startDateChange}></input>
                    <input type='date' id='end' name='endDate' min={today} max={threeMonthLater} onChange={this.endDateChange}></input>
                    {serachDistricts}
                    <select name="petType" onChange={this.petTypeChange} >
                        <option value="NA" disabled selected hidden>--Type of Pet--</option>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                    </select>
                    <button type="submit" value="Submit" onClick={this.handleSearch}>Search</button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        SearchHistory: state.searchHistory
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (state) => dispatch({type: actionTypes.SEARCHHOTEL, state:state})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);