import React, { useState } from "react";

export const Todo = () => {
	const [list, setList] = useState([]);
	var empty = "";

	if (list.length == 0) {
		empty = "No tasks add a task";
	}
	function tobeadded(e) {
		if (e.key === "Enter") {
			var holder = e.target.value;
			var x = list.concat([holder]);
			setList(x);
		}
	}
	function tobedeleted(e) {
		const place = e.target.getAttribute("id");
		const filteredOne = list.filter((item, index) => {
			if (place == item) {
				return false;
			} else {
				return true;
			}
		});

		setList(filteredOne);
	}

	return (
		<div className="todocontainer">
			<div className="header">
				<h1>todos</h1>
			</div>
			<div>
				<input
					className="todotextbox"
					type="text"
					placeholder="What needs to be done?"
					onKeyDown={tobeadded}
				/>
			</div>
			{list.map(item => {
				return (
					<div key={item} className="todoborder">
						<div className="todobuttonleft">{item}</div>
						<div className="todobuttonright">
							<span id={item} onClick={tobedeleted}>
								{"\u00D7"}
							</span>
						</div>
					</div>
				);
			})}
			{empty && <div className="todoborder">{empty}</div>}
			<div className="todoborder fontsmall">
				{list.length + " item left"}
			</div>
		</div>
	);
};
