import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: undefined,
            username: undefined
        }
        this.children = null
    }

    componentDidMount() {
        const jwt = localStorage.getItem('petvago-token');
        if (!jwt) {
            this.props.history.push('/login')
        }

        axios.get(`http://localhost:8080/auth/verifyjwt`, { headers: { Authorization: `Bearer ${jwt}` } })
            .then(res => {
                this.setState({ userid: res.data.id, username: res.data.username })
            })
            .catch(err => {
                // experimental error handling mechanism
                // error may be caused by server but not wrong user input, need to handle specifically
                console.log(`Cannot verify JWT: ${err}`);
                localStorage.removeItem('petvago-token')
                this.props.history.push('/login')
            })
    }

    render() {
        if (this.state.username === undefined) {
            return (
                <div>Loading ... </div>
            )
        }

        return (
            <div id='AuthenticatedComponent'>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthenticatedComponent);