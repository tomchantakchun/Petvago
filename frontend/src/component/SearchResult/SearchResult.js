import React from 'react';
import { connect } from 'react-redux';
import "./SearchResult.css";
import Filter from "../Filter/Filter";
import Sorter from "../Sorter/Sorter";

import convert from 'object-array-converter';
import RatingBar from "./RatingBar-non-edit";

const mapStateToProps = state => {
    return {
        SearchResult: state.search,
    }
};

class SearchResult extends React.Component {
   
    render() {
        //convert object to Array
        let searchResultArray = []
        let searchArray = convert.toArray(this.props.SearchResult)
        for (let i = 0; i < searchArray.length; i++) {
            if (searchArray[i].key === "searchResult") {
                searchResultArray = convert.toArray(searchArray[i].value)
            }
        }

        //show min price
        searchResultArray = searchResultArray.map(e => e.value).sort(
            function(a,b){
                if (a.hotelID === b.hotelID){
                    if (a.price < b.price) {
                        return -1;
                      }
                    else if (a.price > b.price) {
                        return 1;
                      }
                    else {return 0}
                } else {
                    return 0}    // sort same hotel only          
            });
        

        //get only unique hotel
        function getUnique(arr, comp) {
            const unique = arr.map(e => e[comp])
                // store the keys of the unique objects
                .map((e, i, final) => final.indexOf(e) === i && i)
                // eliminate the dead keys & store unique objects
                .filter(e => arr[e]).map(e => arr[e]);
            return unique;
        }

        let uniqueArray = getUnique(searchResultArray, 'hotelID')

        //sorting functions
        switch (this.props.SearchResult.sortPeference){
            case "NameAscending":
            uniqueArray.sort(function(a, b){
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                  } else if (nameA > nameB) {
                    return 1;
                  } else {// names must be equal
                    return 0;}
            })
            break;

            case "NameDescending":
            uniqueArray.sort(function(a, b){
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA > nameB) {
                    return -1;
                  } else if (nameA < nameB) {
                    return 1;
                  } else {// names must be equal
                    return 0;}
            })
            break;

            case "PriceDescending":
            uniqueArray.sort(function(a, b){
                if (a.price > b.price) {
                    return -1;
                  } else if (a.price  < b.price) {
                    return 1;
                  } else {// names must be equal
                    return 0;}
            })
            break;
            
            case "PriceAscending":
            uniqueArray.sort(function(a, b){
                if (a.price < b.price) {
                    return -1;
                  } else if (a.price > b.price) {
                    return 1;
                  } else {// names must be equal
                    return 0;}
            })
            break;

            case "RatingAscending":
            uniqueArray.sort(function(a, b){
                if (a.averageRating < b.averageRating) {
                    return -1;
                  } else if (a.averageRating > b.averageRating) {
                    return 1;
                  } else {// names must be equal
                    return 0;}
            })
            break;

            case "RatingDescending":
            uniqueArray.sort(function(a, b){
                console.log(a.averageRating)
                if (a.averageRating > b.averageRating) {
                    return -1;
                  } else if (a.averageRating < b.averageRating) {
                    return 1;
                  } else {// names must be equal
                    return 0;}
            })
            break;
            

            default:
            console.log("default")
        }

        //create list item with unique hotel list and map function
        const listItems = (
            uniqueArray.map((e) => {
                return <div id={e.hotelID.toString()} key={e.hotelID.toString()} className="hotel-info-2"  >
                    <img className="hotel-icon-2" src={e.photo} alt="NA" />
                    <div className="hotel-detail-2">
                        <div className="hotel-row-2"> 
                            <div className="hotel-name-2">{e.name}</div>
                            <RatingBar rating={e.averageRating}/>
                            </div>
                       
                        <div className="hotel-row2-2">
                            <div className="hotel-address-2">{e.district}</div>
                            <div className="hotel-price-2"> starting ${e.price}</div>
                        </div>
                    </div>
                </div>
            })
        )
            
        return (
            <div className="result-body">
                <div className="filter-container">
                    <Filter />
                </div>
                <div className="sorter-container">
                    <Sorter />
                </div>
                <div className="hotel-container-2" >
                    {listItems}
                </div>

                <div className="hotel-container-2">
                    <div className="hotel-info-2"  >
                        <img className="hotel-icon-2" src={"https://i.imgur.com/img0gF3.jpg"} alt="NA" />
                        <div className="hotel-detail-2">
                            <div className="hotel-row-2"> 
                                <div className="hotel-name-2">DOGGY DOGGY</div>
                                <RatingBar rating={4.0}/>
                            </div>
                            <div className="hotel-row2-2">
                                <div className="hotel-address-2">Wan Chai</div>
                                <div className="hotel-price-2"> $888</div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SearchResult);