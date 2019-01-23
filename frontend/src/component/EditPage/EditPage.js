import React from 'react';
import './EditPage.css'

// Setting up Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faPlusSquare)
library.add(faEdit)

class EditPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hotelName: '',
            hotelTel: '',
            hotelAddress: '',
            hotelDescription: '',
            hotelIcon: '',
            roomType: [],
            vaccineRequirement: [],

        }
    }

    handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    render () {
        return (
            <div id='EditPage'>
                <div className='bg-image'></div>
                <section>
                    <h1>Edit Hotel Info</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div id='FormHeader'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><label>Name: </label></td>
                                        <td><h3>{this.state.hotelName}</h3><br/></td>
                                    </tr>
                                    <tr>
                                        <td><label>Tel: </label></td>
                                        <td><input type='text' name='hotelTel' value={this.state.hotelTel} onChange={this.handleInputChange} className='inputField'></input></td>
                                    </tr>
                                    <tr>
                                        <td><label>Address: </label></td>
                                        <td><input type='text' name='hotelAddress' value={this.state.hotelAddress} onChange={this.handleInputChange} className='inputField'></input></td>
                                    </tr>
                                    <tr>
                                        <td><label>Description: </label></td>
                                        <td><input type='text' name='hotelDescription' value={this.state.hotelDescription} onChange={this.handleInputChange} className='inputField'></input><br/></td>
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
                                        <th>Type</th>
                                        <th>Price</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.roomType}
                                    <tr className='table-secondary'>
                                        <td></td>
                                        <td className='plusSquare'><FontAwesomeIcon icon="plus-square" /></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <h4>Vaccine Requirement</h4>
                        <div className='custom-control custom-checkbox'>
                            <input type='checkbox' name='RabiesVaccination' value='RabiesVaccination' id='RabiesVaccination' className="custom-control-input"/>
                            <label className="custom-control-label" for="RabiesVaccination">Rabies Vaccination</label>
                        </div>
                        <div className='custom-control custom-checkbox'>
                            <input type='checkbox' name='DHPPiLVaccination' value='DHPPiLVaccination' id='DHPPiLVaccination' className="custom-control-input"/>
                            <label className="custom-control-label" for="DHPPiLVaccination">DHPPiL Vaccination</label>
                        </div>
                        <div className='custom-control custom-checkbox'>
                            <input type='checkbox' name='FVRCPVaccination' value='FVRCPVaccination' id='FVRCPVaccination' className="custom-control-input"/>
                            <label className="custom-control-label" for="FVRCPVaccination">FVRCP Vaccination</label>
                        </div>

                        <div id='FormFooter'>
                            <input type='submit' value='Upadate' className='btn btn-success btn-lg px-5'></input>
                            <button onClick={this.handleCancel} className='btn btn-lg px-5'>Cancel</button>
                        </div>

                    </form>
                </section>
            </div>
        )
    }
}

export default EditPage;