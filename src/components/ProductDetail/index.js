import React, { Component } from "react";


class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title:"",
        image: "",
        price:"",
        description:""
    }
  }

  componentDidMount() {
    const items = this.props.location.state;
    console.log(items)
    this.setState({
        title:items.description[0],
        image:items.description[8],
        price:items.description[7],
        description:items.description[9]
    })
  }
  render() {
      const { title, image, price,description } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <h2>${price}</h2>
        <p>{description}</p>
        <img width='100' src={image} alt="product picture" />
      </div>
    );
  }
}
export default ProductDetail;