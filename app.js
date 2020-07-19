import express from 'express'
import router from './routes'
import {connect} from './models'

const app = express()
global.APP = {}

router(app);

connect();


app.listen(3333, () => {
	console.log(`成功监听端口：3333`)
});
// don't forget to export!
module.exports = app