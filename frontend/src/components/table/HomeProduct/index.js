import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { publishProduct, PUBLISH_PRODUCT_SUCCESS } from '../../../actions/opensea/publish'

class HomeProduct extends React.Component {

	constructor(props) {
		super(props)
		this.publishToMarketPlace = this.publishToMarketPlace.bind(this)
	}
	
	publishToMarketPlace(event) {
		const { token, session,publishProduct } = this.props
		var token_type = 0
		if (token.quantity)
			token_type = 1
		const payload = {
			id: token.id,
			address: session.data.address,
			type: token_type
		}
		publishProduct(payload)
	}

	render() {
		const { token, session } = this.props
		return(
			<Row key={token.id} className="invoice-header">
	          <Col>
	          	{token.name}
	          </Col>
	          <Col>{ token.description }</Col>
	          <Col>
	            <a target='_blank'>{ token.external_url }</a>
	          </Col>
	          { session.data.address ? (<Col>
	          	<Button block color="primary" onClick={this.publishToMarketPlace}>
			        Publish to Opensea
			    </Button>
	          </Col>) : null}
	        </Row>
		)
	}
}

const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { publishProduct })(HomeProduct);
export default withRouter(connectedComponent);