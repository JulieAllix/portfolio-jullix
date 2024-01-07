export const getRandomNumber = (range: number) => {
	// Choose a random index for an array
	return Math.floor(Math.random() * range);
};

export const getRandomIndex = (arr) => {
	return Math.floor(Math.random() * arr.length);
};

export const getSeriesOf = (builder, count: number) => {
	const results = [];

	for (let index = 0; index < count; index++) {
		results.push(builder());
	}

	return results;
};
