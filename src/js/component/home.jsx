import React, { useState, useEffect } from "react";

//create your first component
export default function Home() {
	const [tarea, setTarea] = useState("");
	const [lista, setLista] = useState([]);

	useEffect(() => {
		conseguirDatos(setLista);
	}, []);

	useEffect(() => {
		enviarDatos(setLista);
	}, [lista]);

	function conseguirDatos() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/barbosa92")
			.then((response) => response.json())
			.then((result) => setLista(result))
			.catch((error) => console.log("error", error));
	}

	function borrar(posicion) {
		let listaFiltrada = lista.filter((valor, index) => {
			return index != posicion;
		});
		setLista(listaFiltrada);
	}

	function enviarDatos() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(lista);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/barbosa92",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	}

	return (
		<div className="Home">
			<h1>To Do List</h1>
			<input
				placeholder="Add to do here"
				onChange={(e) => {
					setTarea(e.target.value);
				}}
			/>
			<button
				onClick={() => {
					setLista([...lista, { label: tarea, done: false }]);
				}}>
				Agregar tarea
			</button>
			<ul>
				{lista?.map((object, index) => {
					return (
						<li key={index}>
							{object.label}
							<button
								onClick={() => {
									borrar(index);
									console.log(lista);
									console.log(setLista);
								}}>
								X
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

//Recibe un key de toda la lista y filtra para actualizar la lista con todos los elementos menos aquel cuya key se ha pasado
// function borrar(posicion) {
// 	let listaFiltrada = lista.filter((valor, index) => {
// 		return index != posicion;
// 	});
// 	setLista(listaFiltrada);
// }

// return (
// 	<div className="ToDoList">
// 		<h1>To Do List</h1>
// 		<input
// 			placeholder="Add to do here"
// 			onChange={(e) => {
// 				setTarea(e.target.value);
// 			}}
// 		/>
// 		<button
// 			onClick={() => {
// 				setLista([...lista, tarea]);
// 			}}>
// 			Agregar tarea
// 		</button>
// 		<ul>
// 			{lista.map(function (valor, i) {
// 				return (
// 					<li key={i}>
// 						{lista?.map((object, index) => {
// 			return <li key={index}>{object.label}</li>;
// 		})}
// 						<button
// 							onClick={() => {
// 								borrar(i);
// 							}}>
// 							X
// 						</button>
// 					</li>
// 				);
// 			})}
// 		</ul>
// 	</div>
// );
