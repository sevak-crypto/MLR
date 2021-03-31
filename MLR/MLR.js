process.stdin.resume();
process.stdin.setEncoding('utf8');
var _input = "";
var X = [];
var Y = [];
var theta = [];
var rate_learning = 0.5;
var count_features;
var count_samples;
var count_tests;
var count = 0;
var writeLine = function(data){
	process.stdout.write(data.toString());
	process.stdout.write("\r\n");
}
var multiply = function(m1,m2){
	
	if(m1.length <1 || m2.length < 1) return;
	if(m1[0].length != m2.length) return;
	var size_j = 1;
	var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < size_j; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k];
            }
            result[i][j] = sum.toFixed(2);
        }
    }
    return result;
}
var multiply_scaler = function(num, m){
	if(m.length < 1 || m[0].length < 1) return;
	var r = m.length;
	var c = m[0].length;
	for(var i = 0 ; i < r ; i++){
			m[i] = m[i] * num;
	}

	return m;
}
var subtract = function(m1,m2){
	if(m1.length != m2.length) return;
	var result = [];
	for(var i = 0 ; i < m1.length ; i++){
		result[i] = m1[i] - m2[i];
	}
	return result;
}
var compare = function(m1,m2){
	if(m1.length < 1 && m2.length != m1.length < 1) return;
	
	var result = true;
	for(var i = 0; i < m1.length ; i++){
		m1[i] = parseFloat(m1[i]).toFixed(2);
		m2[i] = parseFloat(m2[i]).toFixed(2);
		if(parseInt(m1[i]) != parseInt(m2[i])) {
			result = false;
			break;
		}
	}
}
var transpose = function(m){


	if(m.length < 1 || m[0].length < 1) return;
	var result = [];
	var r = m.length;
	var c = m[0].length;
	for(var i = 0 ; i < c ; i++){
		result[i] = [];
		for(var j = 0; j < r ; j++){
			result[i].push(m[j][i]);
		}
	}
	return result;
}
var GradientDescent = function(the) {
	count++;

	var vector_Cost = subtract(multiply(X,the), Y);
	var vector_J = multiply_scaler(rate_learning/count_samples,multiply(transpose(X), vector_Cost));
	var newThe = subtract(the, vector_J);
	
	if(compare(the, newThe)) return newThe;
	else {

		if(count == 400) return newThe;
		return GradientDescent(newThe);
	}
}
process.stdin.on('data',function(data){
	_input += data;
});
process.stdin.on('end',function(){
	var tokens = _input.split('\r\n');


	count_features  = tokens[0].split(' ')[0];
	count_samples = tokens[0].split(' ')[1];
	tokens.shift();


	for(var i = 0; i < count_samples ; i++){
		var row = new Array(); 
		row = tokens[0].split(' ');
		Y[i] = parseFloat(row.pop());
		row.splice(0,0,1);
		row.every(function(ele,idx,array){
			row[idx] = parseFloat(ele);
			return true;
		});
		X[i] = row.slice(0);
		tokens.shift();
	}

	
	for(var i = 0 ; i <= count_features ; i++) theta[i] = 50;
	
	
	var result = GradientDescent(theta);
	theta = result;	

	count_tests = parseInt(tokens.shift());
	for(var i = 0 ; i < count_tests ; i++){
		
		var testVector = tokens[i].split(' '); 
		testVector.splice(0,0,1);
		var testValue = 0;
		testVector.every(function(ele,idx,array){
			testValue += parseFloat(ele) * theta[idx];
			return true;
		});
		writeLine(testValue);
	}

});