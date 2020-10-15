import get from 'lodash/get';

export default class PciTrainingRegistriesDeleteController {
  /* @ngInject */
  constructor($translate) {
    this.$translate = $translate;
  }

  $onInit() {
    this.loading = false;

    this.registry = {
      username: null,
      password: null,
      registry: null,
    };
  }

  deleteRegistryConfirm() {
    this.loading = true;

    this.deleteRegistry(this.registryId)
      .then(() =>
        this.goBack(
          this.$translate.instant(
            'pci_projects_project_training_registries_delete_success',
          ),
        ),
      )
      .catch((error) =>
        this.goBack(
          this.$translate.instant(
            'pci_projects_project_training_registries_delete_error',
            {
              message: get(error, 'data.message'),
            },
          ),
          'error',
        ),
      );
  }
}
