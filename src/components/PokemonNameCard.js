import '../scss/PokemonNameCard.scss'

function PokemonNameCard(props) {
	return (
		<button 
			className={ `pokemon-name-card ${ props.isSelected ? 'selected' : '' }` } 
			onClick={ props.handleClick }>{ props.pokemonObj.name }</button>
	);
}

export default PokemonNameCard;