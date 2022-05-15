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
		console.log("entra en filtrar");
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
		<div className="home">
			<h1>To Do List</h1>
			<div className="entrada">
				<input
					placeholder="Add to do here"
					onChange={(e) => {
						setTarea(e.target.value);
					}}
				/>
				<button
					className="ml-3"
					onClick={() => {
						setLista([...lista, { label: tarea, done: false }]);
					}}>
					Agregar tarea
				</button>
			</div>

			<ul>
				{lista?.map((object, index) => {
					if (object.label == "sample task") {
					} else {
						return (
							<li className="mt-2" key={index}>
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
					}
				})}
			</ul>
		</div>
	);
}
