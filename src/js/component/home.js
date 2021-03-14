import React from "react";

//include images into your bundle

//create your first component

export class Home extends React.Component {
	constructor() {
		super();
		// this.cancionRef = React.createRef();
		// console.log(this.cancionRef);

		//this.audio = null;
		this.state = {
			fetchData: [],
			currentSong: "",
			currentIndex: 0
		};
		this.myAudioRef = React.createRef();
		this.playNext = this.playNext.bind(this);
		this.playBefore = this.playBefore.bind(this);
		this.domain = "https://assets.breatheco.de/apis/sound/";
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => {
				this.setState({ fetchData: data });
				this.loadSong(this.domain + data[0].url, 0);
			});
		// console.log(this.fetchData);
	}

	loadSong(url, index) {
		this.setState({
			currentSong: url,
			currentIndex: index
		});
		this.myAudioRef.current.load();
	}
	playNext() {
		const nextIndex = this.state.currentIndex + 1;
		const nextSong =
			this.state.fetchData[nextIndex] || this.state.fetchData[0];
		this.playSong(this.domain + nextSong.url, nextIndex);
	}

	playBefore() {
		const beforeIndex = this.state.currentIndex - 1;
		const beforeSong =
			this.state.fetchData[beforeIndex] ||
			this.state.fetchData[this.state.fetchData.length - 1];
		this.playSong(this.domain + beforeSong.url, beforeIndex);
	}
	playSong(url, index) {
		this.loadSong(url, index);
		this.myAudioRef.current.play();
	}
	pause = i => {
		this.audio.pause();
		this.playButton.style.display = "inline-block";
		this.pauseButton.style.display = "none";
	};

	// handlePlay = () => {
	// 	this.cancionRef.play();
	// };

	render() {
		return (
			<div className="title">
				<h1>
					<i></i>MUSIC PLAY LIST
				</h1>

				<div className="container">
					{this.state.fetchData.map((song, i) => {
						const songURL = this.domain + song.url;
						return (
							<>
								<div className="shadow p-3 mb-5 bg-white rounded">
									<div key={i}>
										<ul>
											<li
												onClick={() =>
													this.playSong(songURL, i)
												}>
												<h3>{song.name}</h3>
											</li>
										</ul>
									</div>
								</div>
							</>
						);
					})}
				</div>
				<div className="audioPlayer ">
					<i
						onClick={this.playBefore}
						className="fas fa-2x mr-4 fa-step-backward bg-success text-light"></i>
					<audio controls ref={this.myAudioRef}>
						<source
							src={this.state.currentSong}
							type="audio/mpeg"
						/>
					</audio>
					<i
						onClick={this.playNext}
						className="fas fa-2x ml-4 fa-step-forward bg-success text-light"></i>
				</div>
				<div></div>
			</div>
		);
	}
}
