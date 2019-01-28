import React from 'react';
import './PhotoUpload.css'

// Setting up Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus)
library.add(faEdit)

class PhotoUpload extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        // document.getElementById('PhotoUploadInput').click();
    }

    render() {
        if (this.props.isEdit === true) {
            return (
                <div id='PhotoUpload' className='edit-photo' onClick={this.handleClick}>
                    <input type="file" name="" id="PhotoUploadInput" onChange={this.props.handleEditRoomTypeIconPhoto} />
                    <FontAwesomeIcon icon="edit" />
                </div>
            )
        } else {
            return (
                <div id='PhotoUpload' className='add-photo'>
                    <input type="file" name="" id="PhotoUploadInput" onChange={this.props.handleAddRoomTypePhoto} />
                    <FontAwesomeIcon icon="plus" />
                </div>
            )
        }
    }
}

export default PhotoUpload;