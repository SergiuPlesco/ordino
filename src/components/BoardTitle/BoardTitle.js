import React, { useState } from "react";
import Form from "../Form/Form";
import styles from "./BoardTitle.module.css";

const BoardTitle = ({ item, saveBoardTitle }) => {
	const [isEditing, setIsEditing] = useState(false);

	const handleEditing = () => {
		setIsEditing(true);
	};

	return (
		<div className={styles.container}>
			{isEditing || item.isNew ? (
				<Form
					item={item}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					saveBoardTitle={saveBoardTitle}
				/>
			) : (
				<h5
					style={{
						width: "100%",
						cursor: "pointer",
					}}
					onClick={handleEditing}
				>
					{item.title}
				</h5>
			)}
		</div>
	);
};

export default BoardTitle;
