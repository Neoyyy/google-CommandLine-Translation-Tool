const superagent = require('superagent');
const isChinese = require('is-chinese');
const token = require('./gettoken.js');
const dealresult = require('./dealresult.js');

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

						  				console.log(dealresult(res));
										    								}
									});
								
			},function(err){
				console.log("get token err:"+err);
			});
}

module.exports = getResult



