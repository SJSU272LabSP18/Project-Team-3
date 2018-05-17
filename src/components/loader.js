import React from "react";



class Loader extends React.Component {
    


    render() {

        var styles = {};

        if(typeof this.props.height !== "undefined")
            styles['height'] = this.props.height+"";

        return (<div style={styles} className="loading-mode">
          Loading Phoenix...</div>);

    }

}

export default Loader;


