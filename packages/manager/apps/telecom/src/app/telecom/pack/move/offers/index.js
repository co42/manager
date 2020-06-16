import angular from 'angular';

import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import uiRouter from '@uirouter/angularjs';
import angularTranslate from 'angular-translate';

import moveOffers from './move-offers.component';

const moduleName = 'ovhManagerTelecomPackMoveOffers';

angular
  .module(moduleName, [ngTranslateAsyncLoader, uiRouter, angularTranslate])
  .component('packMoveOffers', moveOffers);

export default moduleName;
