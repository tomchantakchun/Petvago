import React from 'react';
import axios from 'axios';

class PhotoUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }
    }

    handleselectedFile = e => {
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0,
        })
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)

        console.log(`http://localhost:8080/api/hotel/uploadPhoto`);
        axios.post(`http://localhost:8080/api/hotel/uploadPhoto`, data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                console.log(res.statusText)
            })

    }

    render() {
        return (
            <div id='PhotoUpload'>
                <input type="file" name="" id="" onChange={this.handleselectedFile} />
                <button onClick={this.handleUpload}>Upload</button>
                <div> {Math.round(this.state.loaded, 0)} %</div>
            </div>
        )
    }
}

export default PhotoUpload;