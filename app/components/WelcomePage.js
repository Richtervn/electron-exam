import React, { Component } from 'react';
import styles from './WelcomePage.css';

import data from '../data';

const shuffle = array => {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

export default class WelcomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 2
		};
	}

	handleBegin() {
		const { onClickBegin } = this.props;
		const { count } = this.state;
		if (count < 1) {
			return;
		}

		const questions = shuffle(data).filter((q, i) => i < count);
		onClickBegin(questions);
	}

	render() {
		const { count } = this.state;

		return (
			<div className={styles.welcome}>
				<h1>Trắc nghiệm về tệ nạn xã hội và bạo lực học đường</h1>
				<img src="./assets/welcome.jpg" />
				<div className={styles['input-question-count']}>
					<h2>Số lượng câu hỏi: </h2>
					<input
						type="number"
						value={count}
						onChange={e => this.setState({ count: e.target.value })}
					/>
				</div>
				<button type="button" onClick={() => this.handleBegin()}>
					Bắt đầu
				</button>
			</div>
		);
	}
}
