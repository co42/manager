export default class OvhManagerPciServingNamespaceModelsAddServiceCapabilities {
  /* @ngInject */
  constructor(OvhApiCloudProjectAi, CucPriceHelper) {
    this.OvhApiCloudProjectAi = OvhApiCloudProjectAi;
    this.CucPriceHelper = CucPriceHelper;
  }

  getFlavors(serviceName) {
    return this.OvhApiCloudProjectAi.Capabilities()
      .Serving()
      .Flavor()
      .v6()
      .query({
        serviceName,
      }).$promise;
  }

  getPresetImages(serviceName) {
    return this.OvhApiCloudProjectAi.Capabilities()
      .Serving()
      .PresetImage()
      .v6()
      .query({
        serviceName,
      }).$promise;
  }

  getPricesFromCatalog(projectId) {
    return this.CucPriceHelper.getPrices(projectId);
  }

  getFrameworks() {
    return this.OvhApiCloudProjectAi.Capabilities()
      .Serving()
      .Framework()
      .v6()
      .query().$promise;
  }

  getBackends() {
    return this.OvhApiCloudProjectAi.Capabilities()
      .Serving()
      .Backend()
      .v6()
      .query().$promise;
  }
}
