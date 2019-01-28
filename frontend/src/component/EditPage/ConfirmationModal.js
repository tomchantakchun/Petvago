import React from 'react';
import './ConfirmationModal.css'

class ConfirmationModal extends React.Component {
    render () {
        return (   
            <div class="modal fade" id="ConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="ConfirmationModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ConfirmationModalLabel">Updated successfully. Redirecting in {this.props.countDownSecond} seconds...</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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