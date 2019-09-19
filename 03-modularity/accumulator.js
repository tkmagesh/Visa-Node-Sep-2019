function accumulatorFactory(initialResult = 0){
	var result = initialResult;
	return {
		add(x){
			result += x;
		},
		subtract(x){
			result -= x;
		},
		multiply(x){
			result *= x;
		},
		divide(x){
			result /= x;
		},
		getResult(){
			return result;
		}
	}
}

module.exports = accumulatorFactory;