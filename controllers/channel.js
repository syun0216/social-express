'use strict';
import channelModel from '../models/channel';
import errorHandler from '../helper/errorHandler';

class channel {
    static async getChannels(req, res) {
        const { isAuthed } = req.userStatus;
        if(isAuthed) {
            const { sequelize } = APP
            const channelM = await channelModel(sequelize);
            const channels = await channelM.findAll();
            return res.send({
                ret: 0,
                msg: 'success',
                data: channels.map(v => v.dataValues)
            })
        }
        errorHandler.send403(res, 'invalid_token');
    }
}

export default channel;