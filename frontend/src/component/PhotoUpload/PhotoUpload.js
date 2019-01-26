import React from 'react';
import axios from 'axios';
import './PhotoUpload.css'

// Setting up Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus)


class PhotoUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            // loaded: 0
        }
    }

    handleselectedFile = e => {
        this.setState({
            selectedFile: e.target.files[0],
            // loaded: 0,
        })
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)

        const jwt = localStorage.getItem('petvago-token');
        if (jwt) {
            console.log(`http://localhost:8080/api/hotel/uploadPhoto`);
            axios.post(`http://localhost:8080/api/hotel/uploadPhoto`, data, 
                {
                    // onUploadProgress: ProgressEvent => {
                    //     this.setState({
                    //         loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    //     })
                    // },
                    headers: { Authorization: `Bearer ${jwt}` }
                })
                .then(res => {
                    this.setState({selectedFile: null})
                    document.getElementById("PhotoUploadInput").value = "";
                    console.log(res.statusText)
                    console.log(`Photo uploaded`);
                })
        } else {
            console.log(`Not yet logged in`)
        }
    }

    render() {
        return (
            <div id='PhotoUpload'>
                <input type="file" name="" id="PhotoUploadInput" onChange={this.handleselectedFile} />
                <FontAwesomeIcon icon="plus" />
                {/* <button onClick={this.handleUpload}>Upload</button> */}
                {/* <div> {Math.round(this.state.loaded, 0)} %</div> */}
            </div>
        )
    }
}

export default PhotoUpload;