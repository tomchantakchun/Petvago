import React from 'react';
import './EditPage.css'

// Setting up Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faPlusSquare)

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
                                        <td><input type='text' name='hotelTel' value={this.state.hotelTel} onChange={this.handleInputChange}></input></td>
                                    </tr>
                                    <tr>
                                        <td><label>Address: </label></td>
                                        <td><input type='text' name='hotelAddress' value={this.state.hotelAddress} onChange={this.handleInputChange}></input></td>
                                    </tr>
                                    <tr>
                                        <td><label>Description: </label></td>
                                        <td><input type='text' name='hotelDescription' value={this.state.hotelDescription} onChange={this.handleInputChange}></input><br/></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id='HotelIcon'></div>
                        </div>
                        

                        <label>Room Types:</label>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                </tr>
                                {this.state.roomType}
                                <tr>
                                    <td><FontAwesomeIcon icon="plus-square" /></td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <label>Vaccine Requirement</label>
                        <input type='checkbox' name='RabiesVaccination' value='RabiesVaccination'/>
                        <p>Rabies Vaccination</p>
                        <input type='checkbox' name='DHPPiLVaccination' value='DHPPiLVaccination'/>
                        <p>DHPPiL Vaccination</p>
                        <input type='checkbox' name='FVRCPVaccination' value='FVRCPVaccination'/>
                        <p>FVRCP Vaccination</p>

                        <input type='submit' value='Upadate'></input>
                        <button onClick={this.handleCancel}>Cancel</button>

                    </form>
                </section>
            </div>
        )
    }
}

export default EditPage;