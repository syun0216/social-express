import userModel from '../models/user';

class User {
    static async login(req, res, next) {
        const { sequelize } = APP
        try {
            const user = await userModel(sequelize);
            const user1 = await user.findOne({where: { id: 1 }})
            const { id, username, email, avatar } = user1.dataValues
            console.log(id, username, email, avatar);
    
            res.send({
                ret: 0,
                msg: 'hello'
            })
        }
        catch(err) {
            res.send({
                ret: 10004,
                msg: JSON.stringify(err)
            })
        }
    }
}

export default User