import React from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import "./Search.css";


class Search extends React.Component {
    districts = ['Central and Western', 'Eastern', 'Islands', 'Kowloon City', 'Kwai Tsing', 'Kwun Tong', 'North', 'Sai Kung', 'Sha Tin', 'Sham Shui Po', 'Southern', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Wan Chai', 'Wong Tai Sin', 'Yau Tsim Mong', 'Yuen Long']

    handleSearch = (e) => {
        e.preventDefault();
        console.log('search start')
        console.log(this.state)
        axios.post(`http://localhost:8080/api/search/`,
            {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                district: this.state.district || "all",
                petType: this.state.petType || "all",
            })
            .then(response => {
                if (response === null) {
                    console.log('you are living failure')
                } else {
                    console.log(response.data)
                    this.props.afterSearch(response.data)
                    this.props.history.push('./search_result');
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
            <select name="district" onChange={this.districtChange} required>
                <option value="all" disabled selected hidden>--District--</option>
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
            <div className="search">
                <form onSubmit={this.handleSearch}>
                    <input type='date' id='start' name='startDate' min={today} max={threeMonthLater} onChange={this.startDateChange} required />
                    <input type='date' id='end' name='endDate' min={today} max={threeMonthLater} onChange={this.endDateChange} required />
                    {serachDistricts}
                    <select name="petType" onChange={this.petTypeChange} required>
                        <option value="all" disabled selected hidden>--Type of Pet--</option>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                    </select>
                    <button type="submit" value="Submit">Search</button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        searchResult: state,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (history) => dispatch({type: actionTypes.SEARCHHOTEL, history:history}),
        afterSearch: (result) => dispatch({type: actionTypes.SEARCHRESULT, result:result})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));