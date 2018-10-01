import React, { Component } from 'react';

class MainPrivacy extends Component {
    render() {
        return (
            <div className="main_response_container">
                <h1>{t('privacy_policy_title')}</h1>
                <p>{t('privacy_policy_text')}</p>
<div className="privacy_button_group">
<button className="btn btn-outline-secondary btn-lg privacy_accept_button" onClick={this.props.onAccept}>{t('privacy_policy_accept')}</button>
<button className="btn btn-outline-secondary btn-lg privacy_cancel_button" onClick="">{t('privacy_policy_cancel')}</button>
</div>
            </div>
        );
    }
}

export default MainPrivacy;
