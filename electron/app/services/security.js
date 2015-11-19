import Q from 'Q';

export default {

    pattern: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',

    getToken () {
        return this.pattern.replace(/[xy]/g, function(c) {
            var r = crypto.randomBytes(1)[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

}
