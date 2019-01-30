import React from 'react';
import './RoomModal.css'
import PhotoUpload from '../PhotoUpload/PhotoUpload'

// Setting up Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
library.add(faEdit)
library.add(faTimes)

class RoomModal extends React.Component {
    constructor (props) {
        super(props);
        this.roomPhoto = null;
        this.roomIconPhoto = null;
        this.firstIcon = true
    }

    componentWillUpdate () {
        this.roomPhoto = null;
        this.roomIconPhoto = null;
        this.firstIcon = true
    }

    render () {
        if (this.props.editRoomTypeContent.photos !== [] && this.props.editRoomTypeContent !== undefined && this.props.editRoomTypeContent.photos !== undefined) {
            this.roomPhoto = this.props.editRoomTypeContent.photos.map((e) => {
                if (e.icon) {
                    return null
                } else if (e.isDelete === undefined) {
                    return (
                        <div className='other-photo' key={e.photoID} id={`other-photo-${e.photoID}`}>
                            <img src={e.path} alt={`This room type: ${this.props.editRoomTypeContent.roomType}`}></img>
                            <FontAwesomeIcon icon="times" onClick={this.props.handleDeleteRoomTypePhoto}/>
                        </div>
                    )
                } else {
                    return null
                }
            })

            let roomE;
            for (let i in this.props.editRoomTypeContent.photos) {
                roomE = this.props.editRoomTypeContent.photos[i]
                if (this.firstIcon) {
                    if (roomE.icon) {
                        this.firstIcon = false;
                        this.roomIconPhoto = (
                            <div className='other-photo' key={roomE.photoID} id={`icon-photo-${roomE.photoID}`}>
                                <img src={roomE.path} alt={`This room type: ${this.props.editRoomTypeContent.roomType}`}></img>
                                <PhotoUpload isEdit={true} handleEditRoomTypeIconPhoto={this.props.handleEditRoomTypeIconPhoto}></PhotoUpload>
                            </div>
                        )
                        break;
                    }
                }
            }

            if (this.roomIconPhoto === null) {
                this.roomIconPhoto = (
                    <div className='other-photo'>
                        <img src='./image/empty-photo.png' alt={`No uploaded here yet`}></img>
                        <PhotoUpload isEdit={true} handleEditRoomTypeIconPhoto={this.props.handleEditRoomTypeIconPhoto}></PhotoUpload>
                    </div>
                )
            }
        }

        return (   
            <div className="modal fade" id="RoomModal" tabIndex="-1" role="dialog" aria-labelledby="RoomModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="RoomModalLabel">Room Types: {this.props.editRoomTypeContent.roomType}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Room Description: </label>
                        <textarea type="text" className="form-control" id="recipient-name" value={this.props.editRoomTypeContent.description} onChange={this.props.handleRoomDescription}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Room Icon Photo:</label>
                        <div className='other-photo-group'>
                            {this.roomIconPhoto} 
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Other Room Photo:</label>
                        <div className='other-photo-group'>
                            {this.roomPhoto}
                            <PhotoUpload handleAddRoomTypePhoto={this.props.handleAddRoomTypePhoto}></PhotoUpload>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default RoomModal;