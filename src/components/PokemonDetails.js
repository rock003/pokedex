import "../scss/PokemonDetails.scss"
import { FaWeightHanging } from "react-icons/fa"
import { GiBodyHeight, GiMuscleUp } from "react-icons/gi"
import { VscGithub } from "react-icons/vsc"
import { RiGalleryFill } from "react-icons/ri"
import { BsQuestionCircle } from "react-icons/bs"
import Gallery from "./Gallery"
import PokemonStats from "./PokemonStats"
import { CgPokemon } from "react-icons/cg"

function PokemonDetails(props) {
	function getAllImages(obj, arr) {
		if (obj) {
			Object.keys(obj).forEach(key => {
				if (obj[key] !== null) {
					if (typeof obj[key] === 'object') {
						getAllImages(obj[key], arr);
					} else if (obj[key]) {
						arr.push(obj[key]);
					}
				}
			});
		}

		return arr;
	}

	function showPlaceholder() {
		return !props.pokemonObj || props.showLoading;
	}

	return (
		<section className="pokemon-details">
			<div className="info-container">
				<section className="avatar">
					<h3 className="header-with-icon"><VscGithub className="heading-icon" /> 
						<span>{ showPlaceholder() ? '???' : props.pokemonObj.name }</span>
					</h3>

					{
						showPlaceholder() || !props.pokemonObj.sprites.other['official-artwork'].front_default ? 
						<BsQuestionCircle className="img-placeholder" /> : 
						<img src={ props.pokemonObj.sprites.other['official-artwork'].front_default } alt={ props.pokemonObj.name }></img>
					}
				</section>

				<section className="information">
					<ul>
						<li>
							<h3 className="header-with-icon"><GiBodyHeight className="heading-icon" /> <span>Height</span></h3>
							<p>{ showPlaceholder() ? '???' : props.pokemonObj.height }</p>
						</li>
						<li>
							<h3 className="header-with-icon"><FaWeightHanging className="heading-icon" /> <span>Weight</span></h3>
							<p>{ showPlaceholder() ? '???' : props.pokemonObj.weight }</p>
						</li>
					</ul>
				</section>
				
				<section className="type-and-ability">
					<section className="type">
						<h3 className="header-with-icon"><CgPokemon className="heading-icon" /> 
							<span>Type</span>
						</h3>
						<p>
							{ 
								showPlaceholder() ? '???' : props.pokemonObj.types.map((typeObj) => typeObj.type.name).join(', ')
							}
						</p>
					</section>

					<section className="ability">
						<h3 className="header-with-icon"><GiMuscleUp className="heading-icon" /> 
							<span>Ability</span>
						</h3>
						<p>
							{ 
								showPlaceholder() ? '???' : props.pokemonObj.abilities.map((abilityObj) => abilityObj.ability.name).join(', ')
							}
						</p>
					</section>
				</section>
			</div>

			<PokemonStats stats={ showPlaceholder() ? [] : props.pokemonObj.stats } />
			
			{/* <h3 className="header-with-icon"><RiGalleryFill className="heading-icon" /> <span>Gallery</span></h3>
			<section className="gallery-container">
				<Gallery images={ showPlaceholder() ? [] : getAllImages(props.pokemonObj.sprites, []) } />
			</section> */}
		</section>
	);
}

export default PokemonDetails;