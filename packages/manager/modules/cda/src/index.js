import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-api-services';
import 'ovh-ui-angular';
import 'angular-ui-bootstrap';
import '@ovh-ux/ng-ovh-sidebar-menu';

import ovhManagerCore from '@ovh-ux/manager-core';
import ngAtInternet from '@ovh-ux/ng-at-internet';
import ngOvhCloudUniverseComponents from '@ovh-ux/ng-ovh-cloud-universe-components';
import ngOvhDocUrl from '@ovh-ux/ng-ovh-doc-url';

import cdaDetails from './details';
import cdaDetailsHome from './details/home';
import cdaIp from './ip';
import cdaPool from './pool';
import cdaUser from './user';
import routing from './routing';
import service from './cda.service';

import 'ovh-ui-kit-bs/dist/ovh-ui-kit-bs.css';
import 'ovh-ui-kit/dist/oui.css';
import './cda.less';

const moduleName = 'ovhManagerCda';

angular
  .module(moduleName, [
    'pascalprecht.translate',
    'ui.router',
    'ovh-api-services',
    'oui',
    'ui.bootstrap',
    'ngOvhSidebarMenu',
    ovhManagerCore,
    ngAtInternet,
    ngOvhDocUrl,
    ngOvhCloudUniverseComponents,
    cdaDetails,
    cdaDetailsHome,
    cdaIp,
    cdaUser,
    cdaPool,
  ])
  .config(routing)
  .config(
    /* @ngInject */ (
      $qProvider,
      ovhDocUrlProvider,
      TranslateServiceProvider,
    ) => {
      ovhDocUrlProvider.setUserLocale(TranslateServiceProvider.getUserLocale());
      $qProvider.errorOnUnhandledRejections(false);
    },
  )
  .service('CdaService', service)
  .run(($transitions, CdaService) => {
    $transitions.onSuccess({ to: 'cda.**' }, (transition) => {
      CdaService.initDetails(transition.params().serviceName);
    });
  })
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;