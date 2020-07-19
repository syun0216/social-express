import * as CODES from '../constants/errorCode';

const sender = (res, code, msg) => {
    res.send({
        ret: code,
        msg
    })
}

export default {
    send400: (res, msg) => sender(res, CODES.MISSING_PARAMS, msg),
    send403: (res, msg) => sender(res, CODES.ERROR_PARAMS, msg),
    send404: (res, msg) => sender(res, CODES.NOT_FOUND, msg)
}