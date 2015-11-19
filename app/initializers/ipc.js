export function initialize( application ) {
    application.inject('route', 'Ipc', 'service:ipc');
    application.inject('controller', 'Ipc', 'service:ipc');
}

export default {
  name: 'ipc',
  initialize: initialize
};
