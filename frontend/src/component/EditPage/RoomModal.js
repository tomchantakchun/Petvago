import React from 'react';
import axios from 'axios'
import './RoomModal.css'

class RoomModal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }

    render () {
        return (   
            <div class="modal fade" id="RoomModal" tabindex="-1" role="dialog" aria-labelledby="RoomModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="RoomModalLabel">Room Types: {this.props.editRoomTypeContent.roomType}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Room Description: </label>
                        <textarea type="text" class="form-control" id="recipient-name" value={this.props.editRoomTypeContent.description} onChange={this.props.handleRoomDescription}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Room Photo:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default RoomModal;