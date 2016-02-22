import React from 'react';
import ReactDOM from 'react-dom';
import ajax from 'superagent';

//import './stylesheet.css';
import './stylesheet.scss';
import Card from './Card';

class App extends React.Component {
    constructor(props) {
	super(props);

	/*this.state = {streamers: ['richard_hammer', 'Drathy', 'handmade_hero', 'freecodecamp', 'darnisart', 'brunofin', 'comster404', 'DansGaming', 'RobTheSwan', 'thatsBamboo', 'extracredits', 'ProblemsIRL', 'theindieinitiative']};*/
	this.streamers = ['ProblemsIRL', 'theindieinitiative', 'SirTwiggy'];	

	this.state = {streamerData: [] };
    }

    componentDidMount() {
	this.streamers.map((name, index) => {
	    this.fetchData(name);
	});

    }

    fetchData(name) {
	let profile = {};
	let stream = {};

	const pURL = 'https://api.twitch.tv/kraken/users/';
	const sURL = 'https://api.twitch.tv/kraken/streams/';
	
	$.when(

	    // fetch user's profile data
	    $.getJSON(`${pURL}${name}?callback=?`, (data) => {
		profile.display_name = data.display_name;
		profile.logo = data.logo;
	    }),

	    // fetch user's stream, if user is currently streaming
	    $.getJSON(`${sURL}${name}?callback=?`, (data) => {
		if (data.stream === null) {
		    stream = null;
		}
		else {
		    stream.game = data.stream.game;
		    stream.status = data.stream.channel.status;
		}
	    })

	).done($.proxy(function() {
	    let data = {
		name: name,
		profile: profile,
		stream: stream
	    }
	    
	    this.setState({
		streamerData: this.state.streamerData.concat([data])
	    });
	    
	}, this));
	
    }
        
    render() {
	console.log(this.state.streamerData.length);
	return (
	    <div className="streamCont">
		Twitch
		{
		    this.state.streamerData.map((streamer, index) => {
			return (
			    <div>
				<Card key={index}
				      profile={streamer.profile}
				      stream={streamer.stream}>
				</Card>
			    </div>
			);
		    })
		}
	    </div>
	);	
    }

    
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
