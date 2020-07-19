import express from 'express'
import router from './routes'
import {connect} from './models'
import bodyParser from 'body-parser'
import token from './helper/token'

const app = express()
global.APP = {}

connect();

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 允许所有的请求形式
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', (req, res, next) => {
	const usertoken = req.headers['x-blackcat-token'];
	console.log('usertoken :>> ', usertoken);
    const uid = token.getUid(usertoken);

	req.userStatus = { token: usertoken, uid, isAuthed: Boolean(uid) }
	console.log('uid :>> ', uid);
    next()
})

router(app);

app.listen(3333, () => {
	console.log(`成功监听端口：3333`)
});
// don't forget to export!
module.exports = app