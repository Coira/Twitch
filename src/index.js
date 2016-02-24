import React from 'react';
import ReactDOM from 'react-dom';
import ajax from 'superagent';

//import './stylesheet.css';
import './stylesheet.scss';
import Card from './Card';

class App extends React.Component {
    constructor(props) {
	super(props);

	this.streamers = ['Drathy', 'handmade_hero', 'freecodecamp', 'darnisart',
			  'brunofin', 'richard_hammer', 'Monstercat',
			  'theindieinitiative', 'imaqtpie', 'DansGaming',
			  'RobTheSwan', 'thatsBamboo', 'extracredits',
			  'ProblemsIRL','comster404' ];
	this.state = {
	    streamerData: [],
	    mode: "all"
	};
    }

    componentDidMount() {
	this.streamers.map((name, index) => {
	    this.fetchData(name);
	});

    }

    fetchData(name) {
	let profile = {};
	let stream = {};
	let status = "";
	
	const pURL = 'https://api.twitch.tv/kraken/users/';
	const sURL = 'https://api.twitch.tv/kraken/streams/';
	
	$.when(

	    // fetch user's profile data
	    $.getJSON(`${pURL}${name}?callback=?`, (data) => {
		profile.display_name = data.display_name;
		profile.logo = data.logo ? data.logo :
			       '/imgs/GlitchIcon_purple.png';
	    }),

	    // fetch stream if account is currently streaming
	    $.getJSON(`${sURL}${name}?callback=?`, (data) => {

		if (data.error) {  // closed/non-existent account
		    status = "closed";
		}
		else if (data.stream === null) {  // account offline
		    stream = null;
		    status = "offline";
		}
		else {  // account online
		    stream.game = data.stream.game;
		    stream.status = data.stream.channel.status;
		    status = "online";
		}
	    })

	).done($.proxy(function() {
	    let data = {
		name: name,
		profile: profile,
		stream: stream,
		status: status
	    }
	    
	    this.setState({
		streamerData: this.state.streamerData.concat([data])
	    });
	    
	}, this));
	
    }

    allMode() {
	this.setState({mode: "all"});
    }

    offlineMode() {
	this.setState({mode: "offline"});
    }

    onlineMode() {
	this.setState({mode: "online"});
    }
            
    render() {
	return (
	    <div className="streamCont">
		<div className="twitchHeader">Twitch Streamers</div>
		<div className="buttons">
		    <button className="allBtn"
			    onClick={this.allMode.bind(this)}>All</button>
		    <button className="onlineBtn"
			 onClick={this.onlineMode.bind(this)}>Online</button>
		    <button className="offlineBtn"
			    onClick={this.offlineMode.bind(this)}>Offline</button>
		</div>
		{
		    this.state.streamerData.map((streamer, index) => {
			return (
			    <div key={index}>
				<Card name={streamer.name}
				      profile={streamer.profile}
				      stream={streamer.stream}
				      status={streamer.status}
				      mode={this.state.mode}>
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
