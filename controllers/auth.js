import md5 from 'md5';
import errorHandler from '../helper/errorHandler';
import token from '../helper/token';
import userModel from '../models/user';

const makeSalt = () =>
  Math.ceil(Math.random() * Math.pow(10, 16)).toString() +
  Math.ceil(Math.random() * Math.pow(10, 16)).toString();
const encrypte = (password, salt) => md5(`${password}${salt}`).slice(0, 32)

class auth {
    static async register(req, res, next) {
        const { sequelize } = APP;
        const user = await userModel(sequelize);
        const { username, password, avatar, email } = req.body;
        const exist = await user.findOne({where: { username }});
        if (exist !== null) {
            return errorHandler.send403(res, 'error_username_exist')
        }
        if (!username || !password || !email || !avatar) {
            return errorHandler.send400(res, 'error_missing_param')
        }
        const salt = makeSalt()
        const newUser = await user.create({
            username,
            salt,
            password: encrypte(password, salt),
            avatar,
            email
        })
        res.send({
            ret: 0,
            msg: 'success',
            data: {
                token: token.makeToken(newUser.dataValues.id),
                userId: newUser.dataValues.id
            }
        })
    }
    static async login(req, res) {
        const { sequelize } = APP;
        const user = await userModel(sequelize);
        const { username, password } = req.body;
        if (!username || !password) {
            return errorHandler.send400(res, 'error_missing_param')
          }
        const exist = await user.findOne({
            where: { username }
        })
    
        if (exist === null) {
            return send404(reply, 'error_user_not_found')
        }
    
        if (
            exist.dataValues.password ===
        encrypte(password, exist.dataValues.salt)
        ) {
        const _token = token.makeToken(exist.dataValues.id)
        const { id, username, email, avatar } = exist.dataValues
    
        return res
            .send({
                ret: 0,
                msg: 'success',
                data: {
                    token: _token,
                    user: { id, username, email, avatar }
                }
            })
        }
        errorHandler.send403(reply, 'error_password')
    }
    static async logout(req, res) {
    }
}

export default auth