import React from 'react';
import './WarningModal.css'

class WarningModal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }

    render () {
        return (   
            <div class="modal fade" id="WarningModal" tabindex="-1" role="dialog" aria-labelledby="WarningModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="WarningModalLabel">Are you sure you want to delete room type " {this.props.editRoomTypeContent.roomType} " ?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.props.handleConfirmDeleteRoomType}>Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default WarningModal;