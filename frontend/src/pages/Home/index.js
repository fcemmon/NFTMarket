import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchErc721 } from '../../actions/erc721/fetch'
import { fetchErc1155 } from '../../actions/erc1155/fetch'
import { Button } from 'reactstrap';
import HomeProduct from '../../components/table/HomeProduct'
import React from 'react';
import './index.css';

class Home extends React.Component {
	
	componentWillMount() {
		this.loadProducts()
	}

	loadProducts = async () => {
		this.props.fetchErc721();
		this.props.fetchErc1155();
	}

	render() {
		return(
			<div className="page">
				<div className="container">
					<Link to="/product/new">Create Product</Link>
					<div className="list">
						<label>Products</label>
						{this.props.product.data ? 
							(
								<div>
									{this.props.product.data.map((product) => {
										return (<HomeProduct key={product.id} token={product} />)
									})}
								</div>
							) : null}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ session, product }) => ({ session, product });
const connectedComponent = connect(mapStateToProps, { fetchErc721, fetchErc1155 })(Home);
export default withRouter(connectedComponent);