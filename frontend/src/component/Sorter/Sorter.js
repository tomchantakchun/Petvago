import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

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

class Sorter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            PriceSorter: "",
            RecommendSorter: "",
            RatingSorter: "",
            NameSorter: "",
        }
    }

    priceSort = () =>{
        console.log(this.state.PriceSorter)
        if (this.state.PriceSorter !== "dscending"){
            this.setState({
                PriceSorter: "dscending",
              });

        } else {
            this.setState({
                PriceSorter: "ascending",
              });
        }
    }

    render(){
        console.log(this.props.SearchResult)

        return (
            <div className="sorter">
            <h1>Sort</h1>
            <button className="orange" onClick={this.priceSort}>PRICE </button>
            <button className="orange">RATE </button>
            <button className="orange">Recommend </button>
            <button className="orange">Name </button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorter)