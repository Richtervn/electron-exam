// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WelcomePage from './WelcomePage';
import QuizPage from './QuizPage';
import ResultPage from './ResultPage';

import routes from '../constants/routes';
import styles from './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 'WELCOME',
			result: null,
			data: []
		};
	}

	render() {
		const { currentPage, data, result } = this.state;
		return (
			<div className={styles.container} data-tid="container">
				{currentPage === 'WELCOME' && (
					<WelcomePage
						onClickBegin={data => {
							this.setState({ currentPage: 'QUIZ', data });
						}}
					/>
				)}
				{currentPage === 'QUIZ' && (
					<QuizPage
						data={data}
						onComplete={result =>
							this.setState({ result, currentPage: 'RESULT' })
						}
					/>
				)}
				{currentPage === 'RESULT' && (
					<ResultPage
						result={result}
						onClickOk={() => this.setState({ currentPage: 'WELCOME' })}
						total={data.length}
					/>
				)}
			</div>
		);
	}
}
