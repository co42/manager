export default class PciTrainingRegistryController {
  /* @ngInject */
  constructor(CucCloudMessage, CucRegionService, atInternet) {
    this.CucCloudMessage = CucCloudMessage;
    this.CucRegionService = CucRegionService;
    this.atInternet = atInternet;
  }

  $onInit() {
    this.loadMessages();
  }

  addRegistry() {
    this.atInternet.trackClick({
      name:
        'public-cloud::pci::projects::project::training::dashboard::attach-registry::confirm',
      type: 'action',
    });

    return this.goToRegistryAdd();
  }

  deleteRegistry(registryId) {
    this.atInternet.trackClick({
      name:
        'public-cloud::pci::projects::project::training::dashboard::attach-registry::confirm',
      type: 'action',
    });

    return this.goToRegistryDelete(registryId);
  }

  loadMessages() {
    this.messageHandler = this.CucCloudMessage.subscribe(
      'pci.projects.project.training.registries',
      {
        onMessage: () => this.refreshMessages(),
      },
    );
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}
