import React from "react";
import axios from "axios";
import variables from "./config.js";
import Qs from 'qs';

class ProductCard extends React.Component {
    constructor () {
        super();
        this.state = {
            imageURL:""
        }
    }
    componentDidMount () {
        axios({
            method: 'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
                params: {
                reqUrl: `${variables.apiURL}/listings/${this.props.data.listing_id}/images`,
            params: {
            api_key: `${variables.apiKey}`
            },
            xmlToJSON: false
            }}).then(({ data }) => {
                this.setState({
                    imageURL:data.results[0].url_fullxfull
                })
            })
        }

    render() {
        console.log(this.props.data);
        return (
            <div className="productCard">
                <img src={this.state.imageURL} alt=""/>
                <h2 className="heading__product">{this.props.data.title}</h2>
                <h3>{`$${this.props.data.price} ${this.props.data.currency_code}`}</h3>
                <h3>{`${this.props.data.quantity} remaining`}</h3>
                <a href={`${this.props.data.url}`}>Link to Item</a>
                <button onClick={() => this.props.add(this.props.data)}>Add me!</button>
            </div>
        )
    }
}

export default ProductCard;