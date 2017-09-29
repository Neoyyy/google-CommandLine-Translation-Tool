#!/usr/bin/env node


const Spinner = require('cli-spinner').Spinner;
const getresult = require('./getresult.js');


var spinner = new Spinner('正在非常拼命的帮你查.. %s');
spinner.setSpinnerString('|/-\\');
spinner.start();


const input = process.argv[2];
//console.log("命令行输入的是："+input);





getresult(input,spinner);




//console.log("get的url:"+getUrl);
/*
superagent.get(getUrl)
		.end(function(req,res){
console.log(res);



console.log("准备写入文件");
fs.writeFile('get.html', res.text,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");

});


			$ = cheerio.load(res.text);
			var result = $('.goog-menuitem-content').html()
			spinner.stop(true);
			console.log("解析:"+result);
			//console.log(res.header);
});

*/
 

//<span class="" contenteditable="false" tabindex="-1">Work on the site is</span>
//<div class="goog-menuitem-content" style="">Hello there</div>


