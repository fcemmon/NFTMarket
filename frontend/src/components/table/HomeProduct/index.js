import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchErc1155, FETCH_ERC1155_SUCCESS } from '../../../actions/erc1155/fetch';
import { fetchErc721, FETCH_ERC721_SUCCESS } from '../../../actions/erc721/fetch';
import { publishProduct, PUBLISH_PRODUCT_SUCCESS } from '../../../actions/opensea/publish'

import '../../../style/app.scss';

class HomeProduct extends React.Component {

	constructor(props) {
		super(props)
		this.publishToMarketPlace = this.publishToMarketPlace.bind(this)

		this.state = {
			token: {}
		}
	}

	async componentWillMount() {
		const { product, fetchErc721, fetchErc1155 } = this.props;

		var action = undefined;
		const tokenId = product.token_id

		if (product.token_type == 0) {
			action = await fetchErc721({ tokenId })
		} else {
			action = await fetchErc1155({ tokenId })
		}

		if (action.type === FETCH_ERC721_SUCCESS) {
			this.setState({
				token: {
					id: tokenId,
					name: action.data[0],
					description: action.data[1],
					exturnal_url: action.data[2],
					image: action.data[3]
				}
			})
		} else if (action.type === FETCH_ERC1155_SUCCESS) {
			this.setState({
				token: {
					id: tokenId,
					name: action.data[0],
					description: action.data[1],
					exturnal_url: action.data[2],
					image: action.data[3],
					quantity: action.data[4]
				}
			})
		}
	}
	
	publishToMarketPlace(event) {
		const { product, session, publishProduct } = this.props
		const payload = {
			id: product.id,
			address: session.data.address,
			type: product.token_type
		}
		publishProduct(payload)
	}

	render() {
		if (this.props.session.isLoading)
			return <div>Loading...</div>
		const { product, session } = this.props
		const { token } = this.state
		return(
			<Row key={product.id} className="invoice-header">
	          <Col>
	          	<img src={ token.image } className="tbl-image" alt='logo' />
	          </Col>
	          <Col>
	          	<Link to={ `/Product/${product.id}` }>{ token.name }</Link>
	          </Col>
	          { session.data.id && session.data.id == product.user_id ? (<Col>
	          	<Button block color="primary" onClick={this.publishToMarketPlace} disabled={ product.status !== 'minted'}>
			        Publish to Opensea
			    </Button>
	          </Col>) : null}
	        </Row>
		)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { publishProduct, fetchErc721, fetchErc1155 })(HomeProduct);
export default withRouter(connectedComponent);