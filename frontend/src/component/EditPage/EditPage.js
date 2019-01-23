import React from 'react';

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
                <h1>Edit Hotel Info</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Name: </label>
                    <h3>{this.state.hotelName}</h3>
                    <label>Tel: </label>
                    <input type='text' name='hotelTel' value={this.state.hotelTel} onChange={this.handleInputChange}></input>
                    <label>Address: </label>
                    <input type='text' name='hotelAddress' value={this.state.hotelAddress} onChange={this.handleInputChange}></input>
                    <label>Description: </label>
                    <input type='text' name='hotelDescription' value={this.state.hotelDescription} onChange={this.handleInputChange}></input>

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

                    <input type='submit' value='Upadate' />
                    <button onClick={this.handleCancel}>Cancel</button>

                </form>
            </div>
        )
    }
}

export default EditPage;