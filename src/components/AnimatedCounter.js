import { useEffect, useRef, useState } from "react";

function AnimatedCounter(props) {
	const [ num, setNum ] = useState(0);
	const timeoutRef = useRef(null);
	const duration = Math.floor(props.duration / props.target);

	function reset() {
		if (timeoutRef.current) {
			clearInterval(timeoutRef.current);
		}
	}

	useEffect(() => {
		reset();

		timeoutRef.current = setTimeout(() => {
			setNum((previousNum) => {
				if (previousNum < props.target) {
					return previousNum + 1;
				} else if (previousNum > props.target) {
					return previousNum - 1;
				}

				return previousNum;
			});
		}, duration);

		return () => {
			reset();
		};
	}, [ num, duration, props ]);

	return (
		<span className="animated-counter">{ num }</span>
	);
}

export default AnimatedCounter;