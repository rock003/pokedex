import "../scss/PokemonStats.scss"
import { RiSwordFill, RiShieldFlashFill } from "react-icons/ri"
import { FaChartPie } from "react-icons/fa"
import { GiRunningShoe } from "react-icons/gi"
import { BsShieldFill, BsFillHeartFill, BsLightningFill } from "react-icons/bs"
import { useEffect, useRef, useState } from "react"
import AnimatedCounter from "./AnimatedCounter"

function PokemonStats({ stats }) {
	const ratio = 1.5;
	const delayToStartAnimation = 200;

	const [ statsArr, setStatsArr ] = useState([]);
	const [ totalStat, setTotalStat ] = useState(0);
	const timeoutRef = useRef(null);

	function calculateStatBarWidth(stat) {
		return stat ? Math.ceil(stat.base_stat / ratio) : 0;
	}

	function reset() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	function calculateTotal(arr) {
		return arr.reduce((sum, stat) => {
			sum += stat.base_stat;

			return sum;
		}, 0);
	}

	function getIcon(name) {
		switch (name) {
			case "attack":
				return (
					<RiSwordFill className="heading-icon" />
				);
			case "defense":
				return (
					<BsShieldFill className="heading-icon" />
				);
			case "special-attack":
				return (
					<BsLightningFill className="heading-icon" />
				);
			case "special-defense":
				return (
					<RiShieldFlashFill className="heading-icon" />
				);
			case "speed":
				return (
					<GiRunningShoe className="heading-icon" />
				);
			default:
				return (
					<BsFillHeartFill className="heading-icon" />
				);
		}
	}

	useEffect(() => {
		reset();

		if (stats) {
			timeoutRef.current = setTimeout(() => {
				setStatsArr(stats);
				setTotalStat(calculateTotal(stats));
			}, delayToStartAnimation);
		}

		return () => {
			reset();
		};
	}, [ stats ]);

	return (
		<div className="stat-container">
			<h4 className="total"><AnimatedCounter target={ totalStat } duration="500" /></h4>
			<h3 className="header-with-icon"><FaChartPie className="heading-icon" /> <span>Stats</span></h3>
			<ul className="stat-list">
				{
					stats.map((item, index) =>
						<li key={ index }>
							<div className="stat-item">
								<h3 className="header-with-icon">{ getIcon(item.stat.name) } <span>{ item.stat.name }</span></h3>
								<div className={ `bar ${ item.stat.name }`  } style={{ width: `${ calculateStatBarWidth(statsArr[index]) }%` }}>
									<p>{ item.base_stat }</p>
								</div>
							</div>
						</li>
					)
				}
			</ul>
		</div>
	);
}

export default PokemonStats;