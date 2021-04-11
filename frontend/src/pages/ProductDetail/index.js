import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchErc1155, FETCH_ERC1155_SUCCESS } from '../../actions/erc1155/fetch';
import { fetchErc721, FETCH_ERC721_SUCCESS } from '../../actions/erc721/fetch';
import { publishProduct, PUBLISH_PRODUCT_SUCCESS } from '../../actions/opensea/publish'
import { getProduct, GET_PRODUCT_SUCCESS } from '../../actions/product/get';

import '../../style/app.scss';

class ProductDetail extends React.Component {
	
	constructor(props) {
		super(props)
		this.publishToMarketPlace = this.publishToMarketPlace.bind(this)

		this.state = {
			product: {},
			token: {}
		}
	}

	async componentWillMount() {
		const { match: { params } } = this.props;

		const productId = params.productId

		const { getProduct, fetchErc721, fetchErc1155 } = this.props;

		var action = await getProduct({productId})

		if (action.type === GET_PRODUCT_SUCCESS) {
			this.setState({
				product: action.data
			})

			const { product } = this.state

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
		var { product, token } = this.state

		const {session} = this.props
		if (!product.id || !token.id)
			return (
				<div className="container">
					<label>No data</label>
					<Link to="/">Back to dashboard</Link>
				</div>)
		return(
				<div className="container">
					<Row key={product.id} className="invoice-header">
			          <Col>
			          	<img src={ token.image } className="detail-image" alt='logo' />
			          </Col>
			          <Col>
			          	{ token.name }
			          </Col>
			          <Col>
			          	<a href={ token.exturnal_url }>{ token.exturnal_url }</a>
			          </Col>
			          { session.data.id && session.data.id == product.user_id ? (<Col>
			          	<Button block color="primary" onClick={this.publishToMarketPlace} disabled={ product.status !== 'minted'}>
					        Publish to Opensea
					    </Button>
			          </Col>) : null}
			        </Row>

			        <Link to="/">Back to dashboard</Link>
		        </div>
			)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { publishProduct, getProduct, fetchErc721, fetchErc1155 })(ProductDetail);
export default withRouter(connectedComponent);