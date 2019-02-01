import React from 'react';
import './EditPage.css'
import axios from 'axios';
import RoomModal from './RoomModal'
import WarningModal from './WarningModal'
import ConfirmationModal from './ConfirmationModal'
import PhotoUpload from '../PhotoUpload/PhotoUpload'

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
            userName: '',
            hotelName: '',
            hotelTel: '',
            hotelAddress: '',
            hotelDistrict: '',
            hotelDescription: '',
            hotelIcon: '',
            hotelIconFile: '',
            roomType: [],
            addedButNotUpdatedRoomType: [],
            vaccineRequirement: [],
            isHost: false,
            editRoomTypeID: '',
            editRoomTypeContent: [],
            newPhotoID: -1,
            isSaved: false,
            countDownSecond: 5,
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
        this.setState({ roomType: newRoomType });
    }

    handleChangeCheckbox = (e) => {
        let storedVaccine = this.state.vaccineRequirement.find((element) => {
            return element === e.target.value
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
                    return element !== e.target.value
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
        axios.post(`https://petvago.site/api/hotel/edit/new-room-type`, {}, { headers: { Authorization: `Bearer ${this.jwt}` } })
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
        axios.put(`https://petvago.site/api/hotel/edit/delete-room-type/${this.state.editRoomTypeID}`, {}, { headers: { Authorization: `Bearer ${this.jwt}` } })
            .then(() => {
                this.constructEditPage();
            })
    }

    handleChangeDistrict = (e) => {
        this.setState({ hotelDistrict: e.target.value })
    }

    handleAddRoomTypePhoto = async (e) => {
        let newRoomType = this.state.roomType;
        let arrayIndex;

        for (let i in this.state.roomType) {
            if (this.state.editRoomTypeID === this.state.roomType[i].roomTypeID.toString()) {
                arrayIndex = i
            }
        }

        newRoomType[arrayIndex].photos.push({
            icon: false,
            path: URL.createObjectURL(e.target.files[0]),
            files: e.target.files[0],
            photoID: this.state.newPhotoID,
            name: `hotel-${this.state.userName}-${newRoomType[arrayIndex].roomType.replace(' ', '')}-other-no=-=`,
        });
        await this.setState({ roomType: newRoomType });
        await this.setState({ newPhotoID: this.state.newPhotoID - 1 })
    }

    handleDeleteRoomTypePhoto = (e) => {

        let targetID = e.currentTarget.parentElement.id.split('other-photo-')[1];
        let newRoomType = this.state.roomType;
        let arrayIndex;

        for (let i in this.state.roomType) {
            if (this.state.editRoomTypeID === this.state.roomType[i].roomTypeID.toString()) {
                arrayIndex = i
            }
        }
        newRoomType[arrayIndex].photos = newRoomType[arrayIndex].photos.map((e) => {
            if (e.photoID.toString() === targetID) {
                return {
                    icon: false,
                    path: e.path,
                    photoID: e.photoID,
                    isDelete: true,
                }
            } else {
                return e
            }
        });
        this.setState({ roomType: newRoomType });
    }

    handleEditRoomTypeIconPhoto = async (e) => {
        let newRoomType = this.state.roomType;
        let arrayIndex;

        for (let i in this.state.roomType) {
            if (this.state.editRoomTypeID === this.state.roomType[i].roomTypeID.toString()) {
                arrayIndex = i
            }
        }

        for (let i in newRoomType[arrayIndex].photos) {
            if (newRoomType[arrayIndex].photos[i].icon === true) {
                newRoomType[arrayIndex].photos[i] = {
                    icon: false,
                    path: newRoomType[arrayIndex].photos[i].path,
                    photoID: newRoomType[arrayIndex].photos[i].photoID,
                    isDelete: true,
                }
            }
        }

        newRoomType[arrayIndex].photos.push({
            icon: true,
            path: URL.createObjectURL(e.target.files[0]),
            files: e.target.files[0],
            photoID: this.state.newPhotoID,
            name: `hotel-${this.state.userName}-${newRoomType[arrayIndex].roomType.replace(' ', '')}-icon-no=-=`,
        });

        await this.setState({ roomType: newRoomType });
        await this.setState({ newPhotoID: this.state.newPhotoID - 1 })
    }

    handleEditBigIconPhoto = (e) => {
        this.setState({
            hotelIcon: URL.createObjectURL(e.target.files[0]),
            hotelIconFile: e.target.files[0],
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let submitVac = {
            "vaccine": this.state.vaccineRequirement.map((e) => {
                if (e === 'KennelCough') {
                    return 'Kennel Cough'
                } else {
                    return e
                }
            })
        }

        let deletePhotoArray = [];
        for (let i in this.state.roomType) {
            for (let j in this.state.roomType[i].photos) {
                if (this.state.roomType[i].photos[j].isDelete !== undefined) {
                    deletePhotoArray.push(this.state.roomType[i].photos[j].photoID)
                }
            }
        }

        let addPhotosArray = [];
        for (let i in this.state.roomType) {
            for (let j in this.state.roomType[i].photos) {
                if (this.state.roomType[i].photos[j].photoID < 0) {
                    addPhotosArray.push({
                        photoName: this.state.roomType[i].photos[j].name,
                        files: this.state.roomType[i].photos[j].files,
                        roomTypeID: this.state.roomType[i].roomTypeID,
                        path: this.state.roomType[i].photos[j].path,
                        icon: this.state.roomType[i].photos[j].icon,
                    })
                }
            }
        }

        let promiseSubmit = new Promise((resolve, reject) => {
            axios.post(
                `https://petvago.site/api/hotel/edit/submit`,
                {
                    name: this.state.hotelName,
                    telephone: this.state.hotelTel,
                    address: this.state.hotelAddress,
                    description: this.state.hotelDescription,
                    vaccineRequirement: submitVac,
                    district: this.state.hotelDistrict,
                    deletePhotos: deletePhotoArray,
                    addPhotos: [],
                },
                { headers: { Authorization: `Bearer ${this.jwt}` } })
                .then((res) => {
                    resolve(res);
                })
        })

        let promiseArray = []
        promiseArray.push(promiseSubmit)

        for (let i in this.state.roomType) {
            promiseArray.push(new Promise((resolve, reject) => {
                axios.put(
                    `https://petvago.site/api/hotel/edit/roomType/${this.state.roomType[i].roomTypeID}`,
                    {
                        roomType: this.state.roomType[i].roomType,
                        price: this.state.roomType[i].price,
                        description: this.state.roomType[i].description,
                        roomTypeID: this.state.roomType[i].roomTypeID,
                    },
                    { headers: { Authorization: `Bearer ${this.jwt}` } }
                ).then((res) => {
                    resolve(res);
                })
            }))
        }

        for (let i in addPhotosArray) {
            let formData = new FormData();

            formData.append('file', addPhotosArray[i].files, addPhotosArray[i].photoName);
            formData.append('roomTypeID', addPhotosArray[i].roomTypeID);
            formData.append('icon', addPhotosArray[i].icon);

            promiseArray.push(new Promise((resolve, reject) => {
                axios.post(
                    `https://petvago.site/api/hotel/uploadPhoto`,
                    formData,
                    { headers: { Authorization: `Bearer ${this.jwt}` } }
                ).then((res) => {
                    resolve(res);
                })
            }))
        }

        if (this.state.hotelIconFile !== '') {
            let formData = new FormData();

            formData.append('file', this.state.hotelIconFile);
            formData.append('icon', true);

            promiseArray.push(new Promise((resolve, reject) => {
                axios.post(
                    `https://petvago.site/api/hotel/uploadBigIcon`,
                    formData,
                    { headers: { Authorization: `Bearer ${this.jwt}` } }
                ).then((res) => {
                    resolve(res);
                })
            }))
        }

        Promise.all(promiseArray).then(async (res) => {
            if (res[0].status === 200) {
                this.setState({ isSaved: true })
                for (let i = 0; i < 5; i++) {
                    await this.minusOne();
                }
                document.getElementsByTagName('body')[0].classList.remove('modal-open');
                document.getElementsByTagName('body')[0].style = '';
                this.props.history.push('/host-management');
            }
        })
    }

    handleCancel = () => {
        this.props.history.push('/host-management')
    }

    handleWindowBeforeClose = (e) => {
        if (!this.state.isSaved) {
            const confirmationMessage = 'Are you sure you want to leave?';
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
        }
    }

    componentDidMount() {
        this.constructEditPage();
        window.addEventListener('beforeunload', this.handleWindowBeforeClose);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleWindowBeforeClose);
    }

    minusOne() {
        return new Promise((res, ref) => {
            setTimeout(() => {
                this.setState({ countDownSecond: this.state.countDownSecond - 1 })
                res()
            }, 1000);
        })
    }

    constructEditPage() {
        if (this.jwt) {
            axios.get(`https://petvago.site/api/hotel/edit/info`, { headers: { Authorization: `Bearer ${this.jwt}` } })
                .then(async (res) => {
                    let resVaccines = res.data[0].vaccineRequirement.vaccine
                    let newResVaccines = resVaccines.map((vaccine) => {
                        if (vaccine === 'Kennel Cough') {
                            return 'KennelCough';
                        } else {
                            return vaccine;
                        }
                    })

                    let processedRoomType = [];
                    for (let i in res.data[0].rooms) {
                        await axios.get(`https://petvago.site/api/hotel/edit/roomtype/${res.data[0].rooms[i].roomTypeID}`)
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

                    processedRoomType = processedRoomType.sort((a,b) => {
                        if(a.roomType < b.roomType) { return -1; }
                        if(a.roomType > b.roomType) { return 1; }
                        return 0;
                    })

                    await axios.get(
                        `https://petvago.site/api/hotel/edit/bigicon`,
                        { headers: { Authorization: `Bearer ${this.jwt}` } }
                    ).then((res) => {
                        this.setState({hotelIcon: res.data})
                    })

                    this.setState({
                        userName: res.data[0].userName,
                        hotelName: res.data[0].name,
                        hotelTel: res.data[0].telephone,
                        hotelAddress: res.data[0].address,
                        hotelDistrict: res.data[0].district,
                        hotelDescription: res.data[0].description,
                        roomType: processedRoomType,
                        editRoomTypeID: processedRoomType[0].roomTypeID,
                        editRoomTypeContent: processedRoomType[0],
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

            let vaccineI = 0;
            this.vaccines = this.allVaccine.map((vaccine) => {
                let requiredVaccine = this.state.vaccineRequirement.find((element) => {
                    return element === vaccine
                })
                if (requiredVaccine) {
                    vaccineI ++;
                    return (
                        <div className='custom-control custom-checkbox' key={vaccineI}>
                            <input type='checkbox' name={vaccine} value={vaccine} id={vaccine} className="custom-control-input" onChange={this.handleChangeCheckbox} checked />
                            <label className="custom-control-label" htmlFor={vaccine}>{vaccine}</label>
                        </div>
                    );
                } else {
                    vaccineI ++;
                    return (
                        <div className='custom-control custom-checkbox' key={vaccineI}>
                            <input type='checkbox' name={vaccine} value={vaccine} id={vaccine} className="custom-control-input" onChange={this.handleChangeCheckbox} />
                            <label className="custom-control-label" htmlFor={vaccine}>{vaccine}</label>
                        </div>
                    );
                }
            })

            let districtI = 0;
            this.options = this.allDistricts.map((district) => {
                if (this.state.hotelDistrict === district) {
                    districtI ++;
                    return <option key={districtI} value={true}>{district}</option>
                } else {
                    districtI ++;
                    return <option key={districtI}>{district}</option>
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
                                            <div className="form-group">
                                                <select className="form-control district" id="sel1" onChange={this.handleChangeDistrict}>
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
                                <img src={this.state.hotelIcon === '' ? './image/empty-photo.png' : this.state.hotelIcon} alt={`Icon for this hotel: ${this.state.hotelName}`}></img>
                                <PhotoUpload isEdit={true} handleEditRoomTypeIconPhoto={this.handleEditBigIconPhoto}></PhotoUpload>
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
                            <input type='submit' value='Upadate' className='btn btn-success btn-lg px-5' data-toggle="modal" data-target="#ConfirmationModal"></input>
                            <button onClick={this.handleCancel} className='btn btn-lg px-5'>Cancel</button>
                        </div>

                    </form>
                </div>
            )
        } else if (localStorage.getItem('petvago-token') === null) {
            this.result = <h2>Please login as host to edit</h2>
        } else if (JSON.parse(window.atob(localStorage.getItem('petvago-token').split('.')[1])).isHotel === false) {
            this.result = <h2>Please login as host to edit</h2>
        } else {
            this.result = <h2>Please wait for the page to load</h2>
        }

        return (
            <div id='EditPage'>
                <div className='bg-image'></div>
                <section>
                    {this.result}
                </section>
                <RoomModal
                    editRoomTypeID={this.state.editRoomTypeID}
                    editRoomTypeContent={this.state.editRoomTypeContent}
                    handleRoomDescription={this.handleRoomDescription}
                    handleAddRoomTypePhoto={this.handleAddRoomTypePhoto}
                    handleDeleteRoomTypePhoto={this.handleDeleteRoomTypePhoto}
                    handleEditRoomTypeIconPhoto={this.handleEditRoomTypeIconPhoto}></RoomModal>

                <WarningModal
                    editRoomTypeID={this.state.editRoomTypeID}
                    editRoomTypeContent={this.state.editRoomTypeContent}
                    handleConfirmDeleteRoomType={this.handleConfirmDeleteRoomType}></WarningModal>

                <ConfirmationModal
                    countDownSecond={this.state.countDownSecond}></ConfirmationModal>
            </div>
        )
    }
}

export default EditPage;