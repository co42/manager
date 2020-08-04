import controller from './add-pop-configuration.controller';
import template from './template.html';

export default {
  bindings: {
    allowedPopType: '<',
    cloudConnect: '<',
    cloudConnectId: '<',
    goBack: '<',
    interfaceId: '<',
    popTypes: '<',
    tasksHref: '<',
  },
  controller,
  template,
};
