import React, { Component } from 'react';

class MainPrivacy extends Component {
    render() {
        return (
            <div>
                <p>Privacy Policy ertgerstrsetter</p>
                <button onClick={this.props.onAccept}>Accept</button>
            </div>
        );
    }
}

export default MainPrivacy;
