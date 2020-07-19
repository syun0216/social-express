import user from './user';
import auth from './auth';
import channel from './channel';

export default app => {
    app.use('/user', user);
    app.use('/auth', auth);
    app.use('/channel', channel);
}