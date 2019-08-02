
/**
 * Get total of element points
 * 
 * @param {Object} element 
 * 
 * @return {Number} Total
 */
export const sumOfElementPoints = (element) =>{
	const sum = Object.keys(element).reduce((acc, curr)=> acc+curr);
	return sum;
}
