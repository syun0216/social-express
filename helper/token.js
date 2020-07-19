'use strict';
import md5 from 'md5';

const store = {}

export default {
    makeToken: uid => {
      const token = md5(Date.now());
  
      store[token] = uid;
      return token;
    },
    getUid: token => token && store[token],
    deleteToken: token => {
      return token && delete store[token]
    }
  }