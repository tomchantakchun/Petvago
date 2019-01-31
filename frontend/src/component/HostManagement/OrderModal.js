import React from 'react';
import './OrderModal.css'

class OrderModal extends React.Component {
    render () {
        return (   
            <div className="modal fade" id="OrderModal" tabIndex="-1" role="dialog" aria-labelledby="OrderModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="OrderModalLabel">Are you sure you want to delete room type "" ?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-footer">
                    {/* <button type="button" className="btn btn-danger" data-dismiss="modal">Yes</button> */}
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Go Back</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default OrderModal;