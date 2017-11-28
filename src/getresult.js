const superagent = require('superagent');
const isChinese = require('is-chinese');
const token = require('./gettoken.js');
const dealresult = require('./dealresult.js');
const colors = require('colors');

const getResult = (input, spinner)=>{
	const isCh = isChinese(input);
	var options = {};
	options.from = isCh ? 'zh-CN' : 'en';
	options.to = isCh ? 'en' : 'zh-CN';
	return token.get(input).then(function(tk){
				//console.log(tk);
				let arg = {
					client: 't',
					sl: options.from,
					tl: options.to,
					hl: options.from,
					dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
					ie: 'UTF-8',
					oe: 'UTF-8',
					otf: 1,
					ssel: 0,
					tsel: 0,
					kc: 7,
					tk:tk.value,
					q:input
				}
				var request = superagent.get('https://translate.google.cn/translate_a/single')
						  .query(arg)
						  .end(function(err,res){
						  			spinner.stop(true);

 									if (err || !res.ok) {
 											console.log("query err:"+err);
     								} else {

     									try{
     										var result = dealresult(res);

     										console.log("-----------result-----------".red);
     										console.log("orginal : ".green+result.orginal);
						  					console.log("pronunciation : ".green+result.pronunciation);
						  					console.log("translate : ".green+result.translate);
						  					console.log("intro : ".green+result.intro);
						  					
						  					if (result.other != '') {
						  						console.log("other :".green);
						  						printArray(result.other);
						  					}
     									}catch(err){
     										console.log(err.message)
     										console.log("出错了..欢迎来提issue:https://github.com/Neoyyy/google-CommandLine-Translation-Tool/issues".red)
     									}
     									
										    								}
									});
								
			},function(err){
				console.log("get token err:"+err);
			});
}

function printArray(arr){
	arr.forEach(function(ele){
		if ("string" == typeof (ele) ) {
			console.log("       "+ele);
		}else if("object"== typeof (ele)){
			printArray(ele);
		}
	});
}

module.exports = getResult



