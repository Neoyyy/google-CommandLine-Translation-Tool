
function dealresult(response){
	let obj = eval(response.text);
	var isEn = false;
	let result = {
		orginal : '',
		pronunciation : '',
		translate : '',
		intro : '',
		other : '',
		
	}
	
	if (obj[0] == null) {
		console.log(obj);
		throw new Error("orignal not exist");
	}else{
		cleannull(obj);

	if (obj[1] == 'en') {
		isEn = true;
	}

		if (obj[0][0][1] !== undefined) {
			result.orginal = obj[0][0][1];
		}
		if (obj[0][1][0] !== undefined) {
			result.pronunciation = (obj[2] == 'en')? obj[0][1][1] : obj[0][1][0];

		}
		if (obj[0][0][0] !== undefined) {
			result.translate = obj[0][0][0];
		}

		if (isEn) {
			if (obj[2][0][0] !== undefined && obj[2][0][2][0][1] !== undefined) {
				result.intro = obj[2][0][0]+','+obj[2][0][2][0][1] ;
			}else if (obj[2][0][0] !== undefined) {
				result.intro = obj[2][0][0] ;
			}else if (obj[2][0][2][0][1] !== undefined) {
				result.intro = obj[2][0][2][0][1] ;
			}


		}else{
					
			if (obj[1][0][0] !== undefined && obj[1][0][2][0][1] !== undefined) {
				result.intro = obj[1][0][0]+','+obj[1][0][2][0][1] ;
			}else if (obj[1][0][0] !== undefined) {
				result.intro = obj[1][0][0] ;
			}else if (obj[1][0][2][0][1] !== undefined) {
				result.intro = obj[1][0][2][0][1] ;
			}
		}


		if ( obj[6] !== undefined) {

			result.other = (obj[2] == 'en')? (obj[6][0][1][0].concat(obj[6][0][1][1])) : obj[6][0];

		}
	}


	return result;


}


function cleannull(arr){



	if ( arr == null) {
		return;
	}else{

		let i = arr.length;

		while(i--){
			if (arr[i] == null) {
				arr.splice(i,1);
			
			}else{
				if (Array.isArray(arr[i])) {
						cleannull(arr[i]);

				}
			}
		}


		return arr;

	}




}

module.exports = dealresult;