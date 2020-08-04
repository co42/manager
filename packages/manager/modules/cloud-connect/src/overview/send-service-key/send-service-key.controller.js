import get from 'lodash/get';

export default class SendServiceKeyCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
  }

  sendServiceKey() {
    this.isLoading = true;
    this.cloudConnectService
      .sendServiceKey(
        this.cloudConnectId,
        this.serviceKeyId,
        this.email,
      )
      .then(() => this.goBack(
        this.$translate.instant('cloud_connect_service_key_send_success'),
        'success',
        false,
      ))
      .catch((error) =>
        this.goBack(
          this.$translate.instant('cloud_connect_service_key_send_error', {
            message: get(error, 'data.message', error.message),
          }),
          'error',
        ),
      )
      .finally(() => {
        this.isLoading = false;
      });
  }
}
