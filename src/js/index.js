//import react into the bundle
import React, { useState } from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import { Home } from "./component/home.js";
import { Todo } from "./component/Todo.js";

//render your react application
fetch("https://assets.breatheco.de/apis/fake/todos/user/lcsbharathi5")
	.then(ResponseOfTodo => {
		if (ResponseOfTodo.status == 404) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/lcsbharathi5",
				{
					method: "POST",
					body: JSON.stringify([]),
					headers: {
						"Content-type": "application/json"
					}
				}
			).then(ResponseOfTodo1 => {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/lcsbharathi5"
				)
					.then(ResponseOfTodo1 => {
						return ResponseOfTodo1.json();
					})
					.then(bodyobj1 => {
						var y = bodyobj1.map(item => {
							return item.label;
						});
						ReactDOM.render(
							<Todo initiallist={y} />,
							document.querySelector("#app")
						);
					});
			});
		} else {
			return ResponseOfTodo.json();
		}
	})
	.then(bodyobj => {
		if (bodyobj != undefined) {
			var x = bodyobj.map(item => {
				return item.label;
			});
			ReactDOM.render(
				<Todo initiallist={x} />,
				document.querySelector("#app")
			);
		}
	})
	.catch(error => {
		console.log(error);
	});
