import React from 'react';
import { connect } from 'react-redux';
import './Sorter.css'
import * as actionTypes from '../../store/actions';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faAngleDown)
library.add(faAngleUp)
library.add(faDollarSign)
library.add(faStar)




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
            nameButton = <button className="btn sort-button" style={{color:'#fff',backgroundColor:'#50b5a9'}} onClick={()=>this.onSort('NameDescending')}>Name <FontAwesomeIcon icon="angle-up" style={{marginLeft:'5px'}}/> </button>;
        } else if (this.props.SearchResult.sortPeference === "NameDescending") {
            nameButton = <button className="btn sort-button" style={{color:'#fff',backgroundColor:'#50b5a9'}}  onClick={()=>this.onSort('NameAscending')}>Name <FontAwesomeIcon icon="angle-down" style={{marginLeft:'5px'}}/></button>;
        } else {
            nameButton = <button className="btn sort-button-grey sort-button" onClick={()=>this.onSort('NameAscending')}>Name</button>;
        }
        if (this.props.SearchResult.sortPeference === "PriceAscending"){
            priceButton = <button className="btn sort-button" style={{color:'#fff',backgroundColor:'#50b5a9'}}  onClick={()=>this.onSort('PriceDescending')}><FontAwesomeIcon icon="dollar-sign" style={{marginRight:'5px'}}/>Price <FontAwesomeIcon icon="angle-up" style={{marginLeft:'5px'}}/></button>;
        } else if (this.props.SearchResult.sortPeference === "PriceDescending") {
            priceButton = <button className="btn sort-button" style={{color:'#fff',backgroundColor:'#50b5a9'}}  onClick={()=>this.onSort('PriceAscending')}><FontAwesomeIcon icon="dollar-sign" style={{marginRight:'5px'}}/>Price <FontAwesomeIcon icon="angle-down" style={{marginLeft:'5px'}}/></button>;
        } else {
            priceButton = <button className="btn sort-button-grey sort-button" onClick={()=>this.onSort('PriceAscending')}><FontAwesomeIcon icon="dollar-sign" style={{marginRight:'5px',color:'#50b5a9'}}/>Price</button>;
        }
       
        if (this.props.SearchResult.sortPeference === "RatingAscending"){
            ratingButton = <button className="btn sort-button" style={{color:'#fff',backgroundColor:'#50b5a9'}}  onClick={()=>this.onSort('RatingDescending')}><FontAwesomeIcon icon="star" style={{marginRight:'5px'}}/>Rating <FontAwesomeIcon icon="angle-up" style={{marginLeft:'5px'}}/> </button>;
        } else if (this.props.SearchResult.sortPeference === "RatingDescending") {
            ratingButton = <button className="btn sort-button " style={{color:'#fff',backgroundColor:'#50b5a9'}}  onClick={()=>this.onSort('RatingAscending')}><FontAwesomeIcon icon="star" style={{marginRight:'5px'}}/>Rating <FontAwesomeIcon icon="angle-down" style={{marginLeft:'5px'}}/></button>;
        } else {
            ratingButton = <button className="btn sort-button-grey sort-button" onClick={()=>this.onSort('RatingDescending')}><FontAwesomeIcon icon="star" style={{marginRight:'5px',color:'#50b5a9'}}/>Rating</button>;
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