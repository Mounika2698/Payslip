import Aux from '../../hoc/Aux_';
import TopBar from './TopBar';
import Footer from './Footer';
import React, {Component } from 'react';
import { withRouter } from 'react-router-dom';

class layout extends Component {

    render() {
        return (
            <Aux>
            {!this.props.Pages_login ?
                <main>
                    {this.props.topbar ? <TopBar  /> : null}
                            {this.props.children}
                            {this.props.footer ? <Footer /> : null}
                </main>:this.props.children}  
            </Aux> 
        );
    }
}

export default withRouter(layout);

