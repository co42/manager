import get from 'lodash/get';

export default class RemovePopConfigurationCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
  }

  removePopConfigure() {
    this.isLoading = true;
    this.cloudConnectService
      .removePopConfiguration(this.cloudConnectId, this.popId, this.interfaceId)
      .then((task) => {
        this.pop.setDeleting();
        this.goBack(
          {
            textHtml: this.$translate.instant(
              'cloud_connect_pop_remove_configuration_success',
              {
                tasksUrl: this.tasksHref,
              },
            ),
          },
          'success',
          false,
        )
        .then(() => {
          if (task) {
            this.cloudConnectService.checkTaskStatus(this.cloudConnectId, task.id)
            .finally(() => {
              this.cloudConnect.removePopConfiguration(this.interfaceId);
            });
          }
        });
      })
      .catch((error) =>
        this.goBack(
          this.$translate.instant(
            'cloud_connect_pop_remove_configuration_error',
            {
              message: get(error, 'data.message', error.message),
            },
          ),
          'error',
        ),
      )
      .finally(() => {
        this.isLoading = false;
      });
  }
}
