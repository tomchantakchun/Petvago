import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const mapStateToProps = state => {
    return {
        SearchResult: state.search,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SortToReducer: (sort) => dispatch({type: actionTypes.SORTRESULT, sort:sort})
    }
};

class Sorter extends React.Component{

    onSort = (sortCriteria) =>{
        console.log(sortCriteria)
        this.props.SortToReducer(sortCriteria)        
    }
    render(){
        //Buttons

        let nameButton, priceButton, ratingButton;
      
        if (this.props.SearchResult.sortPeference === "NameAscending"){
            nameButton = <button className="lightgreen" onClick={()=>this.onSort('NameDescending')}>Name A-Z </button>;
        } else if (this.props.SearchResult.sortPeference === "NameDescending") {
            nameButton = <button className="lightgreen" onClick={()=>this.onSort('NameAscending')}>Name Z-A</button>;
        } else {
            nameButton = <button className="grey" onClick={()=>this.onSort('NameAscending')}>Name</button>;
        }
        if (this.props.SearchResult.sortPeference === "PriceAscending"){
            priceButton = <button className="lightgreen" onClick={()=>this.onSort('PriceDescending')}>Price: Low to High </button>;
        } else if (this.props.SearchResult.sortPeference === "PriceDescending") {
            priceButton = <button className="lightgreen" onClick={()=>this.onSort('PriceAscending')}>Price: High to Low</button>;
        } else {
            priceButton = <button className="grey" onClick={()=>this.onSort('PriceAscending')}>Price</button>;
        }
       
        if (this.props.SearchResult.sortPeference === "RatingAscending"){
            ratingButton = <button className="lightgreen" onClick={()=>this.onSort('RatingDescending')}>Rating: Low to High </button>;
        } else if (this.props.SearchResult.sortPeference === "RatingDescending") {
            ratingButton = <button className="lightgreen" onClick={()=>this.onSort('RatingAscending')}>Rating: High to Low</button>;
        } else {
            ratingButton = <button className="grey" onClick={()=>this.onSort('RatingDescending')}>Rating</button>;
        }
        
        //end of Buttons

        return (
            <div className="sort">
            {nameButton}
            {priceButton}
            {ratingButton}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorter)