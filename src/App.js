import { useEffect, useState } from 'react';
import './scss/App.scss';
import PokemonNameCard from './components/PokemonNameCard';
import PokemonDetails from './components/PokemonDetails';
import Filter from './components/Filter';
import { MdArrowDropDownCircle } from "react-icons/md"

function App() {
	const limit = 60;

	const [ pokemons, setPokemons ] = useState([]);
	const [ selectedPokemon, setSelectedPokemon ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ selectedIndex, setSelectedIndex ] = useState(-1);
	const [ pageOffset, setPageOffset ] = useState(0);
	const [ disableLoadMore, setDisableLoadMore ] = useState(false);
	const [ showFilter, setShowFilter ] = useState(false);
	const [ showClearFilter, setshowClearFilter ] = useState(false);

	useEffect(() => {
		getPokemonList();
	}, [ pageOffset ]);

	function getPokemonList() {
		setDisableLoadMore(true);

		fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${ pageOffset }&limit=${ limit }`)
			.then(response => response.json())
			.then(
				(data) => {
					if (data.results && data.results.length > 0) {
						setPokemons((previousList) => {
							return pageOffset === 0 ? data.results : [ ...previousList, ...data.results]
						});

						setDisableLoadMore(false);
					}
				},
				(error) => {
					
				}
			);
	}

	function getPokemonDetails(url, index) {
		setSelectedIndex(index);
		setIsLoading(true);

		fetch(url)
			.then(response => response.json())
			.then(
				(data) => {
					setSelectedPokemon(data);
					setIsLoading(false);
				},
				(error) => {
					console.log(`Error: ${ error }`);
					setIsLoading(false);
				}
			);
	}

	function getPokemonByType(type) {
		fetch(`https://pokeapi.co/api/v2/type/${type}`)
			.then(response => response.json())
			.then(
				(data) => {
					setshowClearFilter(true);

					setPokemons(data.pokemon.map((pokemonObj) => {
						return {
							name: pokemonObj.pokemon.name,
							url: pokemonObj.pokemon.url
						};
					}));
				},
				(error) => {

				}
			);
	}

	function doLoadMore() {
		setPageOffset((previoudOffset) => previoudOffset + limit);
	}

	function toggleFilter() {
		setShowFilter((prvious) => !prvious);
	}

	function doFilter(filter) {
		// TODO: filter = type for now
		getPokemonByType(filter);
		toggleFilter();
		setSelectedIndex(-1);
		setSelectedPokemon(null);
	}

	function clearFilter() {
		setshowClearFilter(false);
		pageOffset === 0 ? getPokemonList() : setPageOffset(0);
		setSelectedIndex(-1);
		setSelectedPokemon(null);
	}

	return (
		<div className="App">
			<div className={ `filter-container ${ showFilter ? 'active' : '' }` }>
				<Filter formSubmitted={ doFilter }></Filter>
				<button className="toggle-btn" onClick={ toggleFilter }><MdArrowDropDownCircle /></button>
			</div>

			<ul className="pokemon-list">
				{
					showClearFilter && 
						<li>
							<button onClick={ clearFilter } className="clear-filter-btn">Clear Filters</button>
						</li>
				}

				{
					pokemons.map((pokemon, index) => {
						return (
							<li key={ index }>
								<PokemonNameCard 
									pokemonObj={ pokemon } 
									handleClick={ () => getPokemonDetails(pokemon.url, index) }
									isSelected={ index === selectedIndex } 
								/>
							</li>
						);
					})
				}

				{
					!showClearFilter && 
						<li className="load-more">
							<button onClick={ doLoadMore } disabled={ disableLoadMore }>Load More</button>
						</li>
				}
			</ul>
			
			<PokemonDetails pokemonObj={ selectedPokemon } showLoading={ isLoading } />
		</div>
	);
}

export default App;
