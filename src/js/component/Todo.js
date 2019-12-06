import React, { useState } from "react";
import PropTypes from "prop-types";

export const Todo = props => {
	const [list, setList] = useState(props.initiallist);
	var empty = "";

	if (list.length == 0) {
		empty = "No tasks add a task";
	}
	function tobeadded(e) {
		if (e.key === "Enter") {
			var holder = e.target.value;
			var x = list.concat([holder]);
			setList(x);
			optimise(x);
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
		optimise(filteredOne);
	}
	function optimise(singleValue) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/lcsbharathi5", {
			method: "PUT",
			body: JSON.stringify(
				singleValue.map(item => {
					return { label: item, done: false };
				})
			),
			headers: {
				"Content-type": "application/json"
			}
		}).then(responseoftodo => {
			return responseoftodo.json();
		});
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
Todo.propTypes = {
	initiallist: PropTypes.array
};
