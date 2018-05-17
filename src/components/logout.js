import React from "react";



class Logout extends React.Component {
  
  componentWillMount() {

    this.props.history.push('/');
  }

	render() {

		return (<div>Logout</div>);

	}

}

export default Logout;

