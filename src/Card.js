import React from 'react';

class Card extends React.Component {
    constructor(props) {
	super(props);
	console.log(props);

    }

    render() {

	let stream;
	let status = "";
	if (this.props.stream) {
	    stream = (
		<span>
		    <span className="game">{this.props.stream.game}</span>
		    <p>{this.props.stream.status}</p>
		</span>
	    );

	    status = "online";
	}
	else {
	    stream = (
		<p>Offline</p>
	    );

	    status = "offline";
	}
	
	return (
	    <a target="_blank" href={"//twitch.tv/"+this.props.name}
	       className = {"card " + status}>
		<img src={this.props.profile.logo}/>
		<div className = "userDetails">
		    <span className = "userName ">
			{this.props.profile.display_name}
		    </span>
		    {stream}
		</div>
	    </a>
	);
    }
}

export default Card;
	    
