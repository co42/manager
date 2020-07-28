import { ListLayoutHelper } from '@ovh-ux/manager-ng-layout-helpers';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.microsoft.office.index', {
    url: `/configuration/microsoft/office/license?${ListLayoutHelper.urlQueryParams}`,
    component: 'managerListLayout',
    params: ListLayoutHelper.stateParams,
    resolve: {
      ...ListLayoutHelper.stateResolves,
      apiPath: () => '/license/office',
      dataModel: () => 'license.office.OfficeTenant',
      defaultFilterColumn: () => 'displayName',
      header: /* @ngInject */ ($translate) =>
        $translate.instant('domains_title'),
      customizableColumns: () => true,
    },
  });
};
