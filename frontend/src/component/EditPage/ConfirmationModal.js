import React from 'react';
import './ConfirmationModal.css'

class ConfirmationModal extends React.Component {
    render () {
        return (   
            <div className="modal fade" id="ConfirmationModal" tabIndex="-1" role="dialog" aria-labelledby="ConfirmationModalLabel" aria-hidden="true" data-backdrop="false">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="ConfirmationModalLabel">Updated successfully <span className='tick'>&#10004;</span> Redirecting in {this.props.countDownSecond} seconds...</h5>
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

export default ConfirmationModal;