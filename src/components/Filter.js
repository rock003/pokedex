import { useEffect, useState } from "react";
import "../scss/Filter.scss"

function Filter(props) {
	const [ types, setTypes ] = useState([]);
	const [ selectedType, setSelectedType ] = useState('');

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/type')
			.then((response) => response.json())
			.then(
				(data) => {
					setTypes(data.results);
					setSelectedType(data.results[0].name);
				},
				(error) => {

				});
	}, []);

	function handleTypeChange(event) {
		setSelectedType(event.target.value);
	}

	function handleFilterSubmit(event) {
		event.preventDefault();

		props.formSubmitted(selectedType);
	}

	return (
		<form className="filter-form" onSubmit={ handleFilterSubmit }>
			<div className="type-container">
				<label htmlFor="typeFilter">Select a type</label>
				<select name="typeFilter" value={ selectedType } onChange={ handleTypeChange }>
					{
						types.map((type, idx) => 
							<option key={ idx } value={ type.name }>{ type.name }</option>
						)
					}
				</select>
			</div>

			<input className="submit-btn" type="submit" value="Filter!"></input>
		</form>
	);
}

export default Filter;