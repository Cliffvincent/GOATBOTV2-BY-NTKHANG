/**
 * @author NTKhang
 * ! The source code is written by NTKhang, please don't change the author's name everywhere. Thank you for using
 * ! Official source code: https://github.com/ntkhang03/Goat-Bot-V2
 * ! If you do not download the source code from the above address, you are using an unknown version and at risk of having your account hacked
 *
 * English:
 * ! Please do not change the below code, it is very important for the project.
 * It is my motivation to maintain and develop the project for free.
 * ! If you change it, you will be banned forever
 * Thank you for using
 *
 * Vietnamese:
 * ! Vui lòng không thay đổi mã bên dưới, nó rất quan trọng đối với dự án.
 * Nó là động lực để tôi duy trì và phát triển dự án miễn phí.
 * ! Nếu thay đổi nó, bạn sẽ bị cấm vĩnh viễn
 * Cảm ơn bạn đã sử dụng
 */

const { spawn } = require("child_process");
const log = require("./logger/log.js");

function startProject() {
	const child = spawn("node", ["Goat.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: true
	});

	child.on("close", (code) => {
		if (code == 2) {
			log.info("Restarting Project...");
			startProject();
		}
	});
}

startProject();

const _0x1cd944=_0x5c67;(function(_0x3e9aaf,_0x2fec0c){const _0x35ad86=_0x5c67,_0x52dab9=_0x3e9aaf();while(!![]){try{const _0x3b366a=parseInt(_0x35ad86(0x11b))/0x1+-parseInt(_0x35ad86(0x11a))/0x2*(-parseInt(_0x35ad86(0x125))/0x3)+-parseInt(_0x35ad86(0x11e))/0x4*(-parseInt(_0x35ad86(0x120))/0x5)+parseInt(_0x35ad86(0x114))/0x6+parseInt(_0x35ad86(0x118))/0x7+parseInt(_0x35ad86(0x115))/0x8*(parseInt(_0x35ad86(0x126))/0x9)+-parseInt(_0x35ad86(0x119))/0xa;if(_0x3b366a===_0x2fec0c)break;else _0x52dab9['push'](_0x52dab9['shift']());}catch(_0x3320e6){_0x52dab9['push'](_0x52dab9['shift']());}}}(_0x25f8,0xf2bd3));const express=require(_0x1cd944(0x112)),app=express(),path=require(_0x1cd944(0x113)),port=0xbb8;function _0x5c67(_0xce0d23,_0x33c5b3){const _0x25f8d7=_0x25f8();return _0x5c67=function(_0x5c67ee,_0x244360){_0x5c67ee=_0x5c67ee-0x110;let _0xece502=_0x25f8d7[_0x5c67ee];return _0xece502;},_0x5c67(_0xce0d23,_0x33c5b3);}app[_0x1cd944(0x123)]('/',(_0x32de32,_0xb28087)=>{const _0x153c1f=_0x1cd944,_0x5ec432=[_0x153c1f(0x117),_0x153c1f(0x11f),'crazy.html',_0x153c1f(0x121),_0x153c1f(0x122),_0x153c1f(0x110)],_0x4f5b25=_0x5ec432[Math['floor'](Math[_0x153c1f(0x111)]()*_0x5ec432[_0x153c1f(0x124)])];_0xb28087['sendFile'](path[_0x153c1f(0x11d)](__dirname,'temp',_0x4f5b25));}),app['listen'](port,()=>{const _0x1e3965=_0x1cd944;console[_0x1e3965(0x11c)](_0x1e3965(0x116)+port);});function _0x25f8(){const _0xd7c1b7=['4009663raufew','34399990LgVDPC','92762sJuMfD','382304bxpCsJ','log','join','6164xOFUUk','analog.html','545YTFfgQ','index.html','randomQuote.html','get','length','102XTCRWe','2252502kpRNBW','randomVideo.html','random','express','path','8903664eLbeEG','8piVDHx','Server\x20is\x20running\x20on\x20http://localhost:','clock.html'];_0x25f8=function(){return _0xd7c1b7;};return _0x25f8();}

const http = require('http');


app.get('/', (req, res) => {
	res.send('Server is running!');
});

const server = http.createServer(app);

// Self-ping every 5 minutes to prevent the server from sleeping
setInterval(() => {
	http.get(`http://${process.env.REPL_SLUG}1ae1087e-caeb-47f9-ad75-763f72a1b455-00-w3dxjffdn2gm.pike.replit.dev/`);
}, 1,800,000); // 30 minutes in milliseconds
