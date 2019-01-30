import React from 'react';
import './HostManagement.css'
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

//daterangepicker
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
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
            // startDOW: '2019-02-03',
            minDate: this.convertYMD(this.addDay(new Date(), -1)),
            startDOW: this.convertYMD(this.findfirstDOW(new Date())),
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

    handleDateChange = async (e, picker) => {
        e.preventDefault();
        console.log(picker.startDate._d)
        await this.setState({
            startDOW: this.convertYMD(this.findfirstDOW(new Date(picker.startDate._d))),
            startDate: this.convertYMD(this.findfirstDOW(new Date(picker.startDate._d))),
            endDate: this.convertYMD(this.findLastDOW(new Date(picker.startDate._d))),
        })
        this.searchBookingRecord(this.state.startDate, this.state.endDate);
    }

    searchBookingRecord(startDate, endDate) {
        return new Promise((resolve, reject) => {
            axios.put(
                `http://localhost:8080/api/booking/hotel-with-date`,
                {
                    startDate: startDate,
                    endDate: endDate,
                },
                { headers: { Authorization: `Bearer ${this.jwt}` } }
            ).then(async (res) => {
                let newResData = res.data.sort((a,b) => {
                    if(a.roomType < b.roomType) { return -1; }
                    if(a.roomType > b.roomType) { return 1; }
                    return 0;
                })
                await this.setState({booking: newResData, isDataReceived: true});
                resolve();
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        })
    }

    handleEditDetail = () => {
        this.props.history.push('/edit-hotel-info');
    }

    async componentDidMount() {
        await this.searchBookingRecord(this.state.startDate, this.state.endDate)
    }

    render() {
        if (this.state.isDataReceived) {
            let chartOptions = {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    yAxes: [{
                        stacked: true
                    }],
                    xAxes: [{
                        stacked: true
                    }]
                }
            }
            this.rooms = this.state.booking.map((e) => {
                let dowArr = [];
                for (let i = 0; i < 7; i++) {
                    dowArr.push(this.convertDM(this.addDay(new Date(this.state.startDOW),i)))
                }

                let availableArr = [];
                let confirmedArr = [];
                let outsideArr = [];
                let pastArr = [];

                for (let i in dowArr) {
                    let targetDate = e.dateArr.find((eDate) => {
                        // console.log(`date: `,this.convertDM(new Date(eDate.date)));
                        // console.log(`dowArr: `,[this.convertDM(new Date(dowArr[i])).split('/')[1],this.convertDM(new Date(dowArr[i])).split('/')[0]].join('/'));
                        // console.log(`comparison: `,this.convertDM(new Date(eDate.date)) === [this.convertDM(new Date(dowArr[i])).split('/')[1],this.convertDM(new Date(dowArr[i])).split('/')[0]].join('/'));

                        

                        return this.convertDM(new Date(eDate.date)) === [this.convertDM(new Date(dowArr[i])).split('/')[1],this.convertDM(new Date(dowArr[i])).split('/')[0]].join('/')
                    })

                    if (targetDate === undefined) {
                        availableArr.push(0)
                        confirmedArr.push(0)
                        outsideArr.push(0)
                        pastArr.push(e.quantity)
                    } else {
                        availableArr.push(targetDate.availability.available)
                        confirmedArr.push(targetDate.availability.confirmed)
                        outsideArr.push(targetDate.availability.outside)
                        pastArr.push(0)
                    }
                }

                let chartData = {
                    labels: dowArr,
                    datasets: [{
                        label: 'available',
                        backgroundColor: '#8DCF8A',
                        data: availableArr
                        // 0,3,4,5,8,9,4
                    },{
                        label: 'confirmed',
                        backgroundColor: '#FFB0AA',
                        data: confirmedArr
                        // 0,3,3,1,2,1,5
                    },{
                        label: 'outside',
                        backgroundColor: '#D4996A',
                        data: outsideArr
                        // 0,4,3,4,0,0,1
                    },{
                        label: 'past',
                        backgroundColor: '#777777',
                        data: pastArr
                        // 10,0,0,0,0,0,0
                    }]
                }

                return (
                    <tr key={e.roomTypeID}>
                        <td>{e.roomType}</td>
                        <td colSpan={7}>
                            <Bar
                                data={chartData}
                                options={chartOptions} />
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div id='HostManagement'>
                <h2>Hotel Name: </h2>
                <div className='edit-hotel'>
                    <h2>Edit Hotel Information</h2>
                    <button type="button" className="btn btn-outline-secondary" onClick={this.handleEditDetail}>Edit</button>
                </div>
                <h2>Booking Management</h2>
                <div className='booking-management'>
                    <DateRangePicker
                        singleDatePicker={true}
                        minDate={moment(new Date(this.state.minDate))}
                        // maxDate={moment(new Date(threeMonthLater))}
                        startDate={moment(new Date(this.state.startDOW))}
                        endDate={moment(new Date(this.state.endDate))}
                        onApply={this.handleDateChange}
                        // props={this.props}
                    >
                        <button className="date-picker btn btn-outline-secondary">From {this.state.startDOW} to {this.state.endDate} </button>
                    </DateRangePicker>
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