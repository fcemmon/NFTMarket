import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createErc1155, CREATE_ERC1155_SUCCESS } from '../../../actions/erc1155/create'

import '../css/index.css'

class CreateERC1155Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      externalURL: "",
      quantity: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let user = this.props.session.data
    let payload = {
      userId: user.id,
      externalUrl: this.state.externalURL,
      name: this.state.name,
      description: this.state.description,
      userWallet: user.address,
      quantity: this.state.quantity,
      tokenType: "erc1155"
    }
    let action = await this.props.createErc1155(payload)
    if (action.type === CREATE_ERC1155_SUCCESS) {
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        </label>
        <label>
          Quantity:
          <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
        </label>
        <label>
          External URL:
          <input type="text" name="externalURL" value={this.state.externalURL} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
const mapStateToProps = ({ session }) => ({ session });
const connectedComponent = connect(mapStateToProps, { createErc1155 })(CreateERC1155Form);
export default withRouter(connectedComponent);