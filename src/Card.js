import React from 'react';

class Card extends React.Component {
    constructor(props) {
	super(props);
	console.log(props);

    }

    render() {
	console.log("render called");
	
	let stream;
	if (this.props.stream) {
	    console.log("no stream ", this.props.profile.display_name);
	    stream = (
		<div>
		    <p> {this.props.stream.status} </p>
		    <p> {this.props.stream.game} </p>
		</div>
	    );
	}
	
	return (
	    <div className = "card">
		<p> {this.props.profile.display_name} </p>
		<img src={this.props.profile.logo}/>
		{stream}
	    </div>
	);
    }
}

export default Card;
	    
