import React from 'react';

class Card extends React.Component {

    render() {

	let stream;
	let streamMessage = "";
	let link = "//twitch.tv/" + this.props.name;
	let game = "";
	let className = "card";
	let display = "";

	// is the streamer online/offline/non-existent?
	// set display info depending on whether person is streaming
	if (this.props.status === "online") {
	    game = this.props.stream.game;
	    streamMessage = this.props.stream.status;
	}
	else if (this.props.status === "offline") {
	    link += "/profile";
	    streamMessage = "Offline";
	    className += " offline";
	}
	else {
	    link = "/profile";
	    streamMessage = "Account Closed";
	    className += " closed";
	}

	// which view mode has the user selected?
	if (this.props.mode === "all") {
	    display = "show";
	}
	else if (this.props.mode === "online") {
	    display = (this.props.status === "online") ? "show" : "hide";
	}
	else if (this.props.mode === "offline") {
	    display = (this.props.status === "offline") ? "show" : "hide";
	}
	    
	
	    
	return (
	    <div className = {display}>
		<a target="_blank" href={link} className = {className}>
		    <img src={this.props.profile.logo}/>
		    
		    <div className = "userDetails">
			<span className = "userName">
			    {this.props.profile.display_name}
			</span>
			<span className="game">{game}</span>
			<p>{streamMessage}</p>
		    </div>
		</a>
	   </div>
	);
    }
}

export default Card;
	    
