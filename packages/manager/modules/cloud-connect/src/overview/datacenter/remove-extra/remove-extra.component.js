import controller from './remove-extra.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnect: '<',
    cloudConnectId: '<',
    datacenterId: '<',
    datacenter: '<',
    extraId: '<',
    extra: '<',
    goBack: '<',
    popId: '<',
    tasksHref: '<',
  },
  controller,
  template,
};
