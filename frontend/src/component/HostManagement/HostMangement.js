import React from 'react';
import './HostManagement.css'

class HostManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.rooms = null;
    }

    handleEditDetail = () => {
        this.props.history.push('/edit-hotel-info')
    }

    componentDidMount() {

    }

    render() {


        return (
            <div id='HostManagement'>
                <h2>Hotel Name: </h2>
                <div className='edit-hotel'>
                    <h2>Edit Hotel Information</h2>
                    <button type="button" class="btn btn-outline-secondary" onClick={this.handleEditDetail}>Edit</button>
                </div>
                <h2>Booking Management</h2>
                <div className='booking-management'>
                    <table className='table table-hover table-bordered'>
                        <thead className='thead-dark'>
                            <tr>
                                <th className=''></th>
                                <th className='th-dow'>Sun</th>
                                <th className='th-dow'>Mon</th>
                                <th className='th-dow'>Tue</th>
                                <th className='th-dow'>Wed</th>
                                <th className='th-dow'>Thu</th>
                                <th className='th-dow'>Fri</th>
                                <th className='th-dow'>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.rooms}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default HostManagement;