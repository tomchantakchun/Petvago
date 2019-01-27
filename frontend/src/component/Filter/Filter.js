import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../store/actions';


import "./Filter.css";

const mapStateToProps = state => {
    return {
        SearchResult: state.search,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        advancedFilter: (filter) => dispatch({ type: actionTypes.ADVFILTER, filter: filter }),
        onSearch: (history) => dispatch({type: actionTypes.SEARCHHOTEL, history:history}),
        afterSearch: (result) => dispatch({type: actionTypes.SEARCHRESULT, result:result})
    }
};


class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minPrice: "",
            maxPrice: "",
            minRate: "",
            maxRate: "",
            vaccine: "",
        }
    }

    districts = ['Central and Western', 'Eastern', 'Islands', 'Kowloon City', 'Kwai Tsing', 'Kwun Tong', 'North', 'Sai Kung', 'Sha Tin', 'Sham Shui Po', 'Southern', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Wan Chai', 'Wong Tai Sin', 'Yau Tsim Mong', 'Yuen Long']

    districtChange = (e) => {
        console.log('districtChange')
        e.preventDefault();
        console.log(this.props.SearchResult.endDate)
        this.props.SearchResult.district = e.target.value
        axios.post(`http://localhost:8080/api/search/`,
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
        console.log(this.props.SearchResult)
        return (
            <div className="filter">
                <button className="orange">DATE {this.props.SearchResult.startDate} {this.props.SearchResult.endDate} </button>
                <button className="orange">DISTRICT {this.props.SearchResult.district}</button>
                <button className="orange">TYPES {this.props.SearchResult.petTypes} </button>
                <button className="orange">PRICE {this.state.minPrice} {this.state.maxPrice}</button>
                <button className="orange">RATE {this.state.minRate} {this.state.maxRate}</button>
                <button className="orange">VACCINE</button>

                <select name="district" onChange={this.districtChange} required>
                    <option value="all" disabled selected hidden>--District--</option>
                    {this.districts.map((district, index) => {
                        return <option value={district} key={index}>{district}</option>
                    })}
                </select>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);