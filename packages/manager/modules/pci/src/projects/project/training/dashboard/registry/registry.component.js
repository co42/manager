import controller from './registry.controller';
import template from './registry.html';

export default {
  controller,
  template,
  bindings: {
    userLink: '<',
    goToDashboard: '<',
    goBack: '<',
    regions: '<',
  },
};
