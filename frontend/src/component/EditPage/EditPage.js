import React from 'react';
import './EditPage.css'
import axios from 'axios';
import RoomModal from './RoomModal'
import WarningModal from './WarningModal'
import { withRouter } from 'react-router';

// Setting up Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
library.add(faPlusSquare)
library.add(faEdit)
library.add(faTimes)

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelName: '',
            hotelTel: '',
            hotelAddress: '',
            hotelDistrict: '',
            hotelDescription: '',
            hotelIcon: '',
            roomType: [],
            addedButNotUpdatedRoomType: [],
            vaccineRequirement: [],
            isHost: false,
            editRoomTypeID: '',
            editRoomTypeContent: [],
            isSaved: false,
        }
        this.result = '';
        this.rooms = '';
        this.options = '';
        this.vaccines = '';
        this.allVaccine = ['Rabies', 'DHPPiL', 'FVRCP', 'KennelCough'];
        this.allDistricts = ['Central and Western', 'Eastern', 'Islands', 'Kowloon City', 'Kwai Tsing', 'Kwun Tong', 'North', 'Sai Kung', 'Sha Tin', 'Sham Shui Po', 'Southern', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Wan Chai', 'Wong Tai Sin', 'Yau Tsim Mong', 'Yuen Long']
        this.jwt = localStorage.getItem('petvago-token');
    }

    handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleRoomDescription = (e) => {
        let newRoomType = this.state.roomType;
        let arrayIndex;

        for (let i in this.state.roomType) {
            if (this.state.editRoomTypeID === this.state.roomType[i].roomTypeID.toString()) {
                arrayIndex = i
            }
        }
        newRoomType[arrayIndex].description = e.target.value;
        this.setState({roomType: newRoomType});
    }

    handleChangeCheckbox = (e) => {
        let storedVaccine = this.state.vaccineRequirement.find((element) => {
            return element == e.target.value
        })

        if (e.target.checked) {
            if (!storedVaccine) {
                let newVaccineRequirement = this.state.vaccineRequirement
                newVaccineRequirement = [...newVaccineRequirement, e.target.value]
                this.setState({ vaccineRequirement: newVaccineRequirement })
            }
        } else {
            if (storedVaccine) {
                let newVaccineRequirement = this.state.vaccineRequirement.filter((element) => {
                    return element != e.target.value
                })
                this.setState({ vaccineRequirement: newVaccineRequirement })
            }
        }
    }

    handleRoomChange = (e) => {
        let newRoomType = this.state.roomType;
        let newSingleRoomType = newRoomType.find((element) => {
            return element.roomTypeID.toString() === e.target.parentElement.parentElement.id.replace('roomType', '')
        })

        newSingleRoomType[e.target.name] = e.target.value
        newRoomType = newRoomType.map((element) => {
            if (element.roomTypeID.toString() === e.target.parentElement.parentElement.id.replace('roomType', '')) {
                return newSingleRoomType
            } else {
                return element
            }
        })
        this.setState({ roomType: newRoomType })
    }

    handleAddRoomType = () => {
        axios.post('http://localhost:8080/api/hotel/edit/new-room-type', {}, { headers: { Authorization: `Bearer ${this.jwt}` } })
            .then(res => {
                this.constructEditPage();
                let newAddedButNotUpdatedRoomType = this.state.addedButNotUpdatedRoomType;
                newAddedButNotUpdatedRoomType.push(res.data[0])
                this.setState({ addedButNotUpdatedRoomType: newAddedButNotUpdatedRoomType })
            })
    }

    handleEditRoomDetial = (e) => {
        let roomTypeID;

        if (e.target.parentElement.parentElement.tagName === 'TR') {
            roomTypeID = e.target.parentElement.parentElement.id.replace('roomType', '')
        } else if (e.target.parentElement.parentElement.tagName === 'TD') {
            roomTypeID = e.target.parentElement.parentElement.parentElement.id.replace('roomType', '')
        } else if (e.target.parentElement.parentElement.tagName === 'DIV') {
            roomTypeID = e.target.parentElement.parentElement.parentElement.parentElement.id.replace('roomType', '')
        }

        let chosenRoom = this.state.roomType.filter((element) => {
            return element.roomTypeID.toString() === roomTypeID
        })

        this.setState({
            editRoomTypeID: roomTypeID,
            editRoomTypeContent: chosenRoom[0]
        })
    }

    handleDeleteRoomType = (e) => {
        let roomTypeID;

        if (e.target.parentElement.parentElement.tagName === 'TR') {
            roomTypeID = e.target.parentElement.parentElement.id.replace('roomType', '')
        } else if (e.target.parentElement.parentElement.tagName === 'TD') {
            roomTypeID = e.target.parentElement.parentElement.parentElement.id.replace('roomType', '')
        } else if (e.target.parentElement.parentElement.tagName === 'DIV') {
            roomTypeID = e.target.parentElement.parentElement.parentElement.parentElement.id.replace('roomType', '')
        }

        let chosenRoom = this.state.roomType.filter((element) => {
            return element.roomTypeID.toString() === roomTypeID
        })

        this.setState({
            editRoomTypeID: roomTypeID,
            editRoomTypeContent: chosenRoom[0]
        })
    }

    handleConfirmDeleteRoomType = (e) => {
        console.log(`http://localhost:8080/api/hotel/edit/delete-room-type/${this.state.editRoomTypeID}`);
        axios.put(`http://localhost:8080/api/hotel/edit/delete-room-type/${this.state.editRoomTypeID}`, {}, { headers: { Authorization: `Bearer ${this.jwt}` } })
            .then(() => {
                this.constructEditPage();
            })
    }

    handleChangeDistrict = (e) => {
        console.log(`e.target.value: `,e.target.value);
        this.setState({hotelDistrict: e.target.value})
    }

    handleSubmit = () => {

    }

    handleCancel = () => {

    }

    handleWindowBeforeClose = (e) => {
        const confirmationMessage = 'Are you sure you want to leave?';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }

    componentDidMount() {
        this.constructEditPage();
        window.addEventListener('beforeunload', this.handleWindowBeforeClose);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleWindowBeforeClose);
    }

    constructEditPage() {
        if (this.jwt) {
            console.log(`http://localhost:8080/api/hotel/edit/info`);
            axios.get(`http://localhost:8080/api/hotel/edit/info`, { headers: { Authorization: `Bearer ${this.jwt}` } })
                .then(async (res) => {
                    let resVaccines = res.data[0].vaccineRequirement.vaccine
                    let newResVaccines = resVaccines.map((vaccine) => {
                        if (vaccine == 'Kennel Cough') {
                            return 'KennelCough';
                        } else {
                            return vaccine;
                        }
                    })

                    let processedRoomType = [];
                    for (let i in res.data[0].rooms) {
                        await axios.get(`http://localhost:8080/api/hotel/edit/roomtype/${res.data[0].rooms[i].roomTypeID}`)
                            .then((res2) => {
                                if (res2.data[0] !== undefined) {
                                    processedRoomType.push({
                                        ...res.data[0].rooms[i],
                                        description: res2.data[0].description,
                                        photos: res2.data[0].photos
                                    })
                                } else {
                                    processedRoomType.push({
                                        ...res.data[0].rooms[i],
                                        description: '',
                                        photos: []
                                    })
                                }
                            })
                    }

                    console.log(`processedRoomType: `, processedRoomType);

                    this.setState({
                        hotelName: res.data[0].name,
                        hotelTel: res.data[0].telephone,
                        hotelAddress: res.data[0].address,
                        hotelDistrict: res.data[0].district,
                        hotelDescription: res.data[0].description,
                        roomType: processedRoomType,
                        vaccineRequirement: newResVaccines,
                        isHost: true
                    })
                })
        } else {
            console.log(`Not yet logged in`)
        }
    }

    render() {
        if (this.state.isHost) {
            this.rooms = this.state.roomType.map((room) => {
                return (
                    <tr key={room.roomTypeID} id={`roomType${room.roomTypeID}`}>
                        <td>
                            <input type='text' name='roomType' value={room.roomType} onChange={this.handleRoomChange} className='inputField'></input>
                        </td>
                        <td>
                            <input type='text' name='price' value={room.price} onChange={this.handleRoomChange} className='inputField'></input>
                        </td>
                        <td>
                            <input type='text' name='quantity' value={room.quantity} onChange={this.handleRoomChange} className='inputField'></input>
                        </td>
                        <td>
                            <div className='icon' data-toggle="modal" data-target="#RoomModal" onClick={this.handleEditRoomDetial}>
                                <FontAwesomeIcon icon="edit" />
                            </div>
                        </td>
                        <td>
                            <div className='icon' data-toggle="modal" data-target="#WarningModal" onClick={this.handleDeleteRoomType}>
                                <FontAwesomeIcon icon="times" />
                            </div>
                        </td>
                    </tr>
                )
            })

            this.vaccines = this.allVaccine.map((vaccine) => {
                let requiredVaccine = this.state.vaccineRequirement.find((element) => {
                    return element == vaccine
                })
                if (requiredVaccine) {
                    return (
                        <div className='custom-control custom-checkbox'>
                            <input type='checkbox' name={vaccine} value={vaccine} id={vaccine} className="custom-control-input" onChange={this.handleChangeCheckbox} checked />
                            <label className="custom-control-label" for={vaccine}>{vaccine}</label>
                        </div>
                    );
                } else {
                    return (
                        <div className='custom-control custom-checkbox'>
                            <input type='checkbox' name={vaccine} value={vaccine} id={vaccine} className="custom-control-input" onChange={this.handleChangeCheckbox} />
                            <label className="custom-control-label" for={vaccine}>{vaccine}</label>
                        </div>
                    );
                }
            })

            this.options = this.allDistricts.map((district) => {
                if (this.state.hotelDistrict === district) {
                    return <option selected>{district}</option>
                } else {
                    return <option>{district}</option>
                }
            })

            this.result = (
                <div>
                    <h1>Edit Hotel Info</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div id='FormHeader'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><label>Name: </label></td>
                                        <td><h3>{this.state.hotelName}</h3><br /></td>
                                    </tr>
                                    <tr>
                                        <td><label>Tel: </label></td>
                                        <td><input type='text' name='hotelTel' value={this.state.hotelTel} onChange={this.handleInputChange} className='inputField'></input></td>
                                    </tr>
                                    <tr>
                                        <td><label>Address: </label></td>
                                        <td><textarea type='text' name='hotelAddress' value={this.state.hotelAddress} onChange={this.handleInputChange} className='inputField'></textarea></td>
                                    </tr>
                                    <tr>
                                        <td><label>District: </label></td>
                                        <td>
                                            <div class="form-group">
                                                <select class="form-control district" id="sel1" onChange={this.handleChangeDistrict}>
                                                    {this.options}
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label>Description: </label></td>
                                        <td><textarea type='text' name='hotelDescription' value={this.state.hotelDescription} onChange={this.handleInputChange} className='inputField'></textarea><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id='HotelIcon'>
                                <FontAwesomeIcon icon="edit" />
                            </div>
                        </div>

                        <div id='EditHotelRoomType'>
                            <h4>Room Types:</h4>
                            <table className='table table-hover table-bordered'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th className='th-type'>Type</th>
                                        <th className='th-price'>Price</th>
                                        <th className='th-quantity'>Quantity</th>
                                        <th className='th-edit'>Edit Detail</th>
                                        <th className='th-delete'>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.rooms}
                                    <tr className='table-secondary'>
                                        <td colSpan={5}>
                                            <div className='plusSquare'>
                                                <FontAwesomeIcon icon="plus-square" onClick={this.handleAddRoomType} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4>Vaccine Requirement</h4>
                        {this.vaccines}

                        <div id='FormFooter'>
                            <input type='submit' value='Upadate' className='btn btn-success btn-lg px-5'></input>
                            <button onClick={this.handleCancel} className='btn btn-lg px-5'>Cancel</button>
                        </div>

                    </form>
                </div>
            )
        } else {
            this.result = <h2>Please wait for the loading or login as host to edit</h2>
        }

        return (
            <div id='EditPage'>
                <div className='bg-image'></div>
                <section>
                    {this.result}
                </section>
                <RoomModal editRoomTypeID={this.state.editRoomTypeID} editRoomTypeContent={this.state.editRoomTypeContent} handleRoomDescription={this.handleRoomDescription}></RoomModal>
                <WarningModal editRoomTypeID={this.state.editRoomTypeID} editRoomTypeContent={this.state.editRoomTypeContent} handleConfirmDeleteRoomType={this.handleConfirmDeleteRoomType}></WarningModal>
            </div>
        )
    }
}

export default EditPage;