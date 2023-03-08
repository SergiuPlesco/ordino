import React from "react";
import Button from "@/components/Button/Button";
import BoardTitle from "@/components/BoardTitle/BoardTitle";

const BoardItem = ({ item, saveBoardTitle, removeBoardItem }) => {
	return (
		<div
			style={{
				border: "0.01rem solid rgba(0,0,0,0.5)",
				borderRadius: "3px",
				padding: "1rem",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<BoardTitle item={item} saveBoardTitle={saveBoardTitle} />
				<Button onClick={removeBoardItem(item.id)}>x</Button>
			</div>
			<ol
				style={{
					paddingLeft: "1rem",
				}}
			>
				<li>
					go to work <button>update</button>
					<button>delete</button>
				</li>
				<li>
					greet everyone<button>update</button>
					<button>delete</button>
				</li>
				<li>
					start working<button>update</button>
					<button>delete</button>
				</li>
			</ol>
		</div>
	);
};

export default BoardItem;
