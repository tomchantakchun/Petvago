import React from 'react';
import './HostManagement.css'

class HostManagement extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }

    handleEditDetail = () => {
        this.props.history.push('/edit-hotel-info')
    }

    render () {
        return (
            <div id='HostManagement'>
                <h2>Hotel Name: </h2>
                <div className='edit-hotel'>
                    <h2>Edit Hotel Information</h2>
                    <button type="button" class="btn btn-outline-secondary" onClick={this.handleEditDetail}>Edit</button>
                </div>
                <h2>Booking Management</h2>
            </div>
        )
    }
}

export default HostManagement;