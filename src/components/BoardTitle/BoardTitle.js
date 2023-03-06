import React, { useState } from "react";
import Form from "../Form/Form";

const BoardTitle = ({ value }) => {
	const [isEditing, setIsEditing] = useState(false);

	const handleEditing = () => {
		setIsEditing(true);
	};

	return <>{isEditing ? <Form text={value} /> : <h5 onClick={handleEditing}>{value}</h5>}</>;
};

export default BoardTitle;
