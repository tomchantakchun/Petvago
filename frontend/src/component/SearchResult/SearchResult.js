import React from 'react';
import { connect } from 'react-redux';
import "./SearchResult.css";
import Filter from "../Filter/Filter";
import convert from 'object-array-converter'

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
        searchResultArray = searchResultArray.map(e => e.value);
        console.log(searchResultArray)

        //get only unique hotel
        function getUnique(arr, comp) {
            const unique = arr.map(e => e[comp])
                // store the keys of the unique objects
                .map((e, i, final) => final.indexOf(e) === i && i)
                // eliminate the dead keys & store unique objects
                .filter(e => arr[e]).map(e => arr[e]);
            return unique;
        }

        //create list item with unique hotel list and map function
        const listItems = (
            getUnique(searchResultArray, 'hotelID').map((e) => {
                return <div key={e.hotelID.toString()} className="hotel-info-2"  >
                    <img className="hotel-icon-2" src={e.photo} alt="NA" />
                    <div className="hotel-detail-2">
                        <div className="hotel-name-2">{e.name}</div>
                        <div className="hotel-rate-2"> {e.averageRating}</div>
                        <div className="room-type"> {e.roomType}</div>
                        <div className="hotel-address">{e.district}</div>
                        <div className="price"> {e.price}</div>
                    </div>
                </div>
            })
        )
            
        return (
            <div className="result-body">
                <div className="filter-container">
                    <Filter />
                </div>
                <div className="hotel-container" >
                    {listItems}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SearchResult);