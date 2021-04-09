import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import './index.css';

class CreateNewProduct extends React.Component {
	render() {
		return(
			<div className="page">
				<div className="container">
					<div className="button-container">
						<Link to="/product/new/single">Create ERC-721</Link>
						<Link to="/product/new/multi">Create ERC-1155</Link>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, {})(CreateNewProduct);
export default withRouter(connectedComponent);