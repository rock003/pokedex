import { useEffect, useRef, useState } from "react";
import "../scss/Gallery.scss"

function Gallery({ images }) {
	const delay = 2500;

	const [index, setIndex] = useState(0);
	const intervalRef = useRef(null);

	function reset() {
		if (intervalRef.current) {
			clearTimeout(intervalRef.current);
		}
	}

	useEffect(() => {
		reset();

		intervalRef.current = setTimeout(() => {
			setIndex((previous) => 
				previous >= images.length - 1 ? 0 : previous + 1
			);
		}, delay);

		return () => {
			reset();
		}
	}, [ index, images ]);

	return (
		<div className="gallery" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
			{
				images.map((image, index) => (
					<img key={ index } src={ image } alt="gallery" className="img-item" />
				))
			}
		</div>
	);
}

export default Gallery;