import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../store/actions';


import "./Filter.css";

//daterangepicker
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment'

const mapStateToProps = state => {
    return {
        SearchResult: state.search,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (history) => dispatch({ type: actionTypes.SEARCHHOTEL, history: history }),
        afterSearch: (result) => dispatch({ type: actionTypes.SEARCHRESULT, result: result })
    }
};

class Filter extends React.Component {
    districts = ['Central and Western', 'Eastern', 'Islands', 'Kowloon City', 'Kwai Tsing', 'Kwun Tong', 'North', 'Sai Kung', 'Sha Tin', 'Sham Shui Po', 'Southern', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Wan Chai', 'Wong Tai Sin', 'Yau Tsim Mong', 'Yuen Long']

    districtChange = (e) => {
        e.preventDefault();
        this.props.SearchResult.district = e.target.value
        axios.post(`http://petvago.site/api/search/`,
            {
                startDate: this.props.SearchResult.startDate,
                endDate: this.props.SearchResult.endDate,
                district: this.props.SearchResult.district || "all",
                petType: this.props.SearchResult.petType || "all",
            })
            .then(response => {
                if (response === null) {
                    console.log('you are living failure')
                } else {
                    console.log(response.data)
                    this.props.afterSearch(response.data)
                }

                this.props.onSearch(this.props.SearchResult);
            })
            .catch(error => {
                console.log(error)
            })
    }

    petTypeChange = (e) => {
        e.preventDefault();
        this.props.SearchResult.petType = e.target.value
        console.log(this.props.SearchResult.petType)
        axios.post(`http://petvago.site/api/search/`,
            {
                startDate: this.props.SearchResult.startDate,
                endDate: this.props.SearchResult.endDate,
                district: this.props.SearchResult.district || "all",
                petType: this.props.SearchResult.petType || "all",
            })
            .then(response => {
                if (response === null) {
                    console.log('you are living failure')
                } else {
                    console.log(response.data)
                    this.props.afterSearch(response.data)
                }
                this.props.onSearch(this.props.SearchResult);
            })
            .catch(error => {
                console.log(error)
            })
    }


    dateChange = (e, picker) => {
        e.preventDefault();
        console.log(this.props.SearchResult.startDate)
        console.log(picker.startDate._d)
        this.props.SearchResult.startDate = moment(new Date(picker.startDate._d)).format("YYYY-MM-DD")
        this.props.SearchResult.endDate = moment(new Date(picker.endDate._d)).format("YYYY-MM-DD")
        axios.post(`http://petvago.site/api/search/`,
            {
                startDate: this.props.SearchResult.startDate,
                endDate: this.props.SearchResult.endDate,
                district: this.props.SearchResult.district || "all",
                petType: this.props.SearchResult.petType || "all",
            })
            .then(response => {
                if (response === null) {
                    console.log('you are living failure')
                } else {
                    console.log(response.data)
                    this.props.afterSearch(response.data)
                }
                this.props.onSearch(this.props.SearchResult);
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let today = new Date().toISOString().split('T')[0];
        //find 12 weeks later
        let threeMonthLater = new Date();
        threeMonthLater.setDate(threeMonthLater.getDate() + 84);
        threeMonthLater = threeMonthLater.toISOString().split('T')[0];
        
        return (
            <div className="filter">
                <div className="filter-box">
                <DateRangePicker
                    minDate={moment(new Date(today))}
                    maxDate={moment(new Date(threeMonthLater))}
                    startDate={moment(new Date(this.props.SearchResult.startDate || today))}
                    endDate={moment(new Date(this.props.SearchResult.endDate || today))}
                    onApply={this.dateChange}
                    props={this.props}
                >
                    <button className="filterDate">Date : {moment(this.props.SearchResult.startDate).format('l')}- {moment(this.props.SearchResult.endDate).format('l')} </button>
                </DateRangePicker>
                    <div className='filterDistrict'>
                    <select name="district" defaultValue={this.props.SearchResult.district || "all"} onChange={this.districtChange} required >
                        <option value="all" disabled selected hidden >District</option>
                        <option value="all" >- All district -</option>
                        {this.districts.map((district, index) => {
                            return <option value={district} key={index} >{district}</option>
                        })}
                    </select>
                    </div>
                    <div className='filterPet'>
                    <select name="petType" defaultValue={this.props.SearchResult.petType || "all"} onChange={this.petTypeChange} required>
                        <option value="all" disabled hidden>Type of Pet</option>
                        <option value='all'>- All pet type -</option>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                    </select>
                    </div>
                    </div>
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);