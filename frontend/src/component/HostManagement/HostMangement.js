import React from 'react';
import './HostManagement.css'
import axios from 'axios';
import moment from 'moment'

class HostManagement extends React.Component {

    addDay(dateObj, noOfDay=1) {
        return new Date(dateObj.setTime( dateObj.getTime() + noOfDay * 86400000 ))
    }

    convertYMD(dateObj) {
        let mm = dateObj.getMonth() + 1;
        let dd = dateObj.getDate();
        return [dateObj.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-')
    }

    findLastDOW(dateObj) {
        while (dateObj.getDay() < 6) {
            dateObj = this.addDay(dateObj)
        }
        return dateObj;
    }

    findfirstDOW(dateObj) {
        while (dateObj.getDay() > 0) {
            dateObj = this.addDay(dateObj,-1)
        }
        return dateObj;
    }

    constructor(props) {
        super(props);
        this.mm = new Date().getMonth() + 1;
        this.dd = new Date().getDate();
        this.state = {
            startDOW: '2019-02-03',
            // startDOW: this.convertYMD(this.findfirstDOW(new Date())),
            startDate: this.convertYMD(new Date()),
            endDate: this.convertYMD(this.findLastDOW(new Date())),
            booking: [],
            isDataReceived: false
        }
        this.rooms = null;
        this.jwt = localStorage.getItem('petvago-token');
    }

    convertDM(dateObj) {
        let mm = dateObj.getMonth() + 1;
        let dd = dateObj.getDate();
        return [dd,mm].join('/')
    }

    handleEditDetail = () => {
        this.props.history.push('/edit-hotel-info')
    }

    async componentDidMount() {
        await axios.put(
            `http://localhost:8080/api/booking/hotel-with-date`,
            {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            },
            { headers: { Authorization: `Bearer ${this.jwt}` } }
        ).then((res) => {
            let newResData = res.data.sort((a,b) => {
                if(a.roomType < b.roomType) { return -1; }
                if(a.roomType > b.roomType) { return 1; }
                return 0;
            })
            this.setState({booking: newResData, isDataReceived: true})
        })
    }

    render() {
        if (this.state.isDataReceived) {
            this.rooms = this.state.booking.map((e) => {
                return (
                    <tr key={e.roomTypeID}>
                        <td>{e.roomType}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                )
            })
        }

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
                                <th className='th-dow'>{this.convertDM(new Date(this.state.startDOW))}</th>
                                <th className='th-dow'>
                                    {this.convertDM(this.addDay(new Date(this.state.startDOW)))}
                                </th>
                                <th className='th-dow'>
                                    {this.convertDM(this.addDay(new Date(this.state.startDOW),2))}
                                </th>
                                <th className='th-dow'>
                                    {this.convertDM(this.addDay(new Date(this.state.startDOW),3))}
                                </th>
                                <th className='th-dow'>
                                    {this.convertDM(this.addDay(new Date(this.state.startDOW),4))}
                                </th>
                                <th className='th-dow'>
                                    {this.convertDM(this.addDay(new Date(this.state.startDOW),5))}
                                </th>
                                <th className='th-dow'>
                                    {this.convertDM(this.addDay(new Date(this.state.startDOW),6))}
                                </th>
                            </tr>
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