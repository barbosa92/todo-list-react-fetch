import React, { useState } from "react";

//create your first component
function ToDoList() {
	const [tarea, setTarea] = useState("");
	const [lista, setLista] = useState([]);

	//Recibe un key de toda la lista y filtra para actualizar la lista con todos los elementos menos aquel cuya key se ha pasado
	function borrar(posicion) {
		let listaFiltrada = lista.filter((valor, index) => {
			return index != posicion;
		});
		setLista(listaFiltrada);
	}

	// function limpiarInput () {

	// }

	return (
		<div className="ToDoList">
			<h1>To Do List</h1>
			<input
				placeholder="Add to do here"
				onChange={(e) => {
					setTarea(e.target.value);
				}}
				ref="entrada"
			/>
			<button
				onClick={() => {
					setLista([...lista, tarea]);
					// this.entrada.value = "";
				}}>
				Agregar tarea
			</button>
			<ul>
				{lista.map(function (valor, i) {
					return (
						<li key={i}>
							{valor}
							<button
								onClick={() => {
									borrar(i);
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

export default ToDoList;
