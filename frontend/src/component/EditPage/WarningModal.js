import React from 'react';
import './WarningModal.css'

class WarningModal extends React.Component {
    render () {
        return (   
            <div className="modal fade" id="WarningModal" tabIndex="-1" role="dialog" aria-labelledby="WarningModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="WarningModalLabel">Are you sure you want to delete room type " {this.props.editRoomTypeContent.roomType} " ?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.handleConfirmDeleteRoomType}>Yes</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default WarningModal;