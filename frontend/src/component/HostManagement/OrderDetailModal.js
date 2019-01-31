import React from 'react';
import './OrderDetailModal.css'

class OrderDetailModal extends React.Component {
    render () {
        return (   
            <div className="modal fade" id="OrderDetailModal" tabIndex="-1" role="dialog" aria-labelledby="OrderDetailModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="OrderDetailModalLabel">Order Detail</h5>
                    <h6>Room Type:   {}</h6>
                    <h6>Search Date: {}</h6>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default OrderDetailModal;