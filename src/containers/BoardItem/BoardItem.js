import React from "react";

import ListItem from "../../components/ListItem/ListItem";

const BoardItem = () => {
	return (
		<div
			style={{
				border: "0.02rem solid rgba(0,0,0,0.5)",
				padding: "1rem",
				width: "300px",
			}}
		>
			{/* title, editable input */}
			<h6>work board</h6>
			<ol>
				<li>
					go to work <button>update</button>
					<button>delete</button>
				</li>
				<li>
					great everyone<button>update</button>
					<button>delete</button>
				</li>
				<li>
					start implementing tasks<button>update</button>
					<button>delete</button>
				</li>
			</ol>
		</div>
	);
};

export default BoardItem;
