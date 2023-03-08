import React, { useState } from "react";
import Form from "../Form/Form";

const BoardTitle = ({ item, saveBoardTitle }) => {
	const [isEditing, setIsEditing] = useState(false);

	const handleEditing = () => {
		setIsEditing(true);
	};

	return (
		<>
			{isEditing || item.isNew ? (
				<Form
					item={item}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					saveBoardTitle={saveBoardTitle}
				/>
			) : (
				<h5 onClick={handleEditing}>{item.title}</h5>
			)}
		</>
	);
};

export default BoardTitle;
