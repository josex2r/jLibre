import Ember from 'ember';

export function truncate(params/*, hash*/) {
    return (params[0].length > params[1]) ? params[0].substr(0, params[1] - 1) + '...' : params[0];
}

export default Ember.Helper.helper(truncate);
