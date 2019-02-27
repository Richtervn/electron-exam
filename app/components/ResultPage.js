import React from 'react';
import styles from './ResultPage.css';

export default ({ result, total, onClickOk }) => {
	const correctCount = Object.values(result).filter(a => a).length;
	return (
		<div className={styles.result}>
			<h2>
				{`Bạn đã trả lời đúng ${correctCount} trên tổng số ${total} câu hỏi.`}
			</h2>
			<h1>{`Điểm số: ${Math.round((correctCount / total) * 100) / 10} điểm`}</h1>
			<button onClick={() => onClickOk()}>Làm lại</button>
		</div>
	);
};
