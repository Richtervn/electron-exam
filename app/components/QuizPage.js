import React, { Component } from 'react';
import styles from './QuizPage.css';

export default class QuizPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestionIndex: 0,
			selectedAnswer: '',
			answers: {}
		};
	}

	handleAction(type) {
		const { currentQuestionIndex, answers, selectedAnswer } = this.state;
		const { data, onComplete } = this.props;

		const questionIndex =
			type == 'NEXT' ? currentQuestionIndex + 1 : currentQuestionIndex - 1;
		const myAnswers = {
			...answers,
			[currentQuestionIndex.toString()]:
				selectedAnswer == data[currentQuestionIndex].answers.correct
		};

		if (currentQuestionIndex == data.length - 1) {
			onComplete(myAnswers);
			return;
		} else {
			this.setState({
				answers: myAnswers,
				selectedAnswer: '',
				currentQuestionIndex: questionIndex
			});
		}
	}

	render() {
		const { currentQuestionIndex, selectedAnswer } = this.state;
		const { data } = this.props;
		const question = data[currentQuestionIndex];
		const answers = [...question.answers.choices, question.answers.correct];

		return (
			<div className={styles.quiz}>
				<div className={styles.question}>
					<h1>{`Câu ${currentQuestionIndex + 1}: ${question.question}`}</h1>
					<div className={styles.choices}>
						{answers.map((answer, i) => (
							<label>
								<input
									type="radio"
									value={answer}
									checked={answer === selectedAnswer}
									onChange={e =>
										this.setState({ selectedAnswer: e.target.value })
									}
								/>
								{answer.trim()}
							</label>
						))}
					</div>
					<div className={styles.submit}>
						{currentQuestionIndex > 0 && (
							<button
								style={{ backgroundColor: 'gray' }}
								onClick={() => this.handleAction('PREV')}
							>
								Trở lại
							</button>
						)}
						{currentQuestionIndex < data.length && (
							<button onClick={() => this.handleAction('NEXT')}>
								Tiếp theo
							</button>
						)}
					</div>
				</div>
			</div>
		);
	}
}
