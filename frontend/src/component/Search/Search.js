import React from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import "./Search.css";

//daterangepicker
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment'

//AutoCompleteSelector
import AutoComplete from 'react-autocomplete';

const mapStateToProps = state => {
    return {
        search: state.search,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (history) => dispatch({ type: actionTypes.SEARCHHOTEL, history: history }),
        changeDate: (date) => dispatch({ type: actionTypes.CHANGEDATE, date: date }),
        changeDistrict: (district) => dispatch({ type: actionTypes.CHANGEDISTRICT, district: district }),
        changePetType: (petType) => dispatch({ type: actionTypes.CHANGEPETTYPE, petType: petType }),
        afterSearch: (result) => dispatch({ type: actionTypes.SEARCHRESULT, result: result })
    }
};

class Search extends React.Component {
    districts = ['Central and Western', 'Eastern', 'Islands', 'Kowloon City', 'Kwai Tsing', 'Kwun Tong', 'North', 'Sai Kung', 'Sha Tin', 'Sham Shui Po', 'Southern', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Wan Chai', 'Wong Tai Sin', 'Yau Tsim Mong', 'Yuen Long']


    handleSearch = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/search/`,
            {
                startDate: this.props.search.startDate || moment(new Date()).format("YYYY-MM-DD"),
                endDate: this.props.search.endDate || moment(new Date()).format("YYYY-MM-DD"),
                district: this.props.search.district || "all",
                petType: this.props.search.petType || "all",
            })
            .then(response => {
                if (response === null) {
                    console.log('you are living failure')
                } else {
                    console.log(response.data)
                    this.props.afterSearch(response.data)
                    this.props.history.push('./search_result');
                }
            this.props.onSearch(this.props.search);
            })
            .catch(error => {
                console.log(error)
            })
    }

    dateChange = async (e, picker) =>{
        e.preventDefault();
        console.log('dateChange')
        await this.setState({ 
            startDate: moment(new Date(picker.startDate._d|| this.props.search.startDate)).format("YYYY-MM-DD") ,
            endDate: moment(new Date(picker.endDate._d || this.props.search.endDate)).format("YYYY-MM-DD")  })
        this.props.changeDate(this.state);
    }

    districtChange = async (e) => {
        e.preventDefault();
        await this.setState({district: e.target.value},)
        this.props.changeDistrict(this.state);
    }

    petTypeChange = async (e) => {
        e.preventDefault();
        await this.setState({ petType: e.target.value })
        this.props.changePetType(this.state);
    }


    render() {
        const serachDistricts = (
            <select name="district" onChange={this.districtChange} required>
                <option value="all" disabled selected hidden>--District--</option>
                <option value="all">All District</option>
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
                <DateRangePicker
                    minDate={moment(new Date(today))}
                    maxDate={moment(new Date(threeMonthLater))}
                    startDate={moment(new Date(this.props.search.startDate || today))}
                    endDate={moment(new Date(this.props.search.endDate || today))}
                    onApply={this.dateChange}
                    props={this.props}>
                    <button className="orange">DATE {this.props.search.startDate || today} {this.props.search.endDate || today} </button>
                </DateRangePicker>

                    {serachDistricts}

                    <select name="petType" onChange={this.petTypeChange} required>
                        <option value="all" disabled selected hidden>--Type of Pet--</option>
                        <option value="all">All PetType</option>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                    </select>
                    <button type="submit" value="Submit" onClick={this.handleSearch}>Search</button>
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));