import React from "react";

//include images into your bundle

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.audio = null;
		this.state = {
			currentIndex: 1,
			songs: [{}]
		};
	}

	componentDidMount() {
		this.pauseButton.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(songs => this.setState({ songs }));
	}

	changeTrack(i) {
		this.setState({ currentIndex: i });
		this.audio.current.pause();
		this.audio.current.load();
		this.audio.currentIndex.play();
	}

	play = i => {
		let url = this.state.songs[i].url;
		const songUrl = "https://assets.breatheco.de/apis/sound/" + url;
		this.audio.src = songUrl;
		this.audio.play();
		this.pauseButton.style.display = "none";
		this.pauseButton.style.display = "inline-block";
		this.setState({ currentIndex: i });
	};

	pause = () => {
		this.audio.pause();
		this.playButton.style.display = "inline-block";
		this.pauseButton.style.display = "none";
	};

	render() {
		const liList = this.state.songs.map((song, index) => {
			return (
				<li
					className="shadow-none p-3 mb-5 bg-light rounded"
					key={index}
					onClick={() => this.play(this.state.currentIndex)}>
					<span>{index + 1 + " "}</span>
					<span>{song.name}</span>
				</li>
			);
		});

		const audioPlayer = (
			//los tag vacios es como si fuera un section
			<>
				<div className="container">
					{/*<button className="">*/}
					<button
						className="btn btn-primary"
						onClick={() => this.play(this.state.currentIndex - 1)}>
						<i className="fa fa-caret-left" aria-hidden="true" />
					</button>
					<button
						className="btn btn-primary"
						ref={element => (this.playButton = element)}
						onClick={() => this.play(this.state.currentIndex)}>
						<i className="fa fa-play" aria-hidden="true" />
					</button>
					<button
						className="btn btn-primary"
						ref={element => (this.pauseButton = element)}
						onClick={() => this.pause(this.state.currentIndex)}>
						<i className="fa fa-pause" aria-hidden="true" />
					</button>
					<button
						className="btn btn-primary"
						onClick={() => this.play(this.state.currentIndex + 1)}>
						<i className="fa fa-caret-right" aria-hidden="true" />
					</button>
					{/*</button>*/}
				</div>
				<audio ref={element => (this.audio = element)} />
			</>
		);
		return (
			<>
				{liList}
				{audioPlayer}
			</>
		);
	}
}
