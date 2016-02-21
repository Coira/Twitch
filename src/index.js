import React from 'react';
import ReactDOM from 'react-dom';
import ajax from 'superagent';

import Card from './Card';

class App extends React.Component {
    constructor(props) {
	super(props);

	/*this.state = {streamers: ['richard_hammer', 'Drathy', 'handmade_hero', 'freecodecamp', 'darnisart', 'brunofin', 'comster404', 'DansGaming', 'RobTheSwan', 'thatsBamboo', 'extracredits', 'ProblemsIRL', 'theindieinitiative']};*/

	this.streamers = ['epiclan1', 'theindieinitiative', 'Drathy'];	
	this.state = {streamerData: [] };
    }

    componentDidMount() {
	let streamerData = [];
	this.streamers.map((name, index) => {
	    let stream = this.fetchStreamData(name);
	    let profile = this.fetchProfileData(name);
	    streamerData.push({name: name,
			       profile: profile,
			       stream: stream});
	    //console.log(stream, profile, name);
	    //console.log(streamerData.length);
		
	});

	this.setState({streamerData});
    }

    fetchProfileData(name) {
	let profile = {};
	const url = 'https://api.twitch.tv/kraken/users/';
	$.getJSON(`${url}${name}?callback=?`, (data) => {
	    console.log(data);
	    profile.display_name = data.display_name;
	    profile.logo = data.logo;
	});
	
	return profile;
	    
    }
    
    fetchStreamData(name) {
	let streamer = {};
	const url = 'https://api.twitch.tv/kraken/streams/';
	$.getJSON(`${url}${name}?callback=?`, (data) => {
	    if (data.stream === null) {
		streamer.online = false;
	    }
	    else {
		streamer.online = true;
		streamer.logo = data.stream.channel.logo;
		streamer.game = data.stream.game;
		streamer.status = data.stream.channel.status;
	    }
	});
	
	return streamer;
    }
    
    render() {
	//this.state.streamData.map((streamer, index) => {
	//    console.log(streamer);
	//});

	console.log(this.state.streamerData);
	
	return(<div>
	    Hello
	    <Card />
	</div>
	);
    }

    
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
