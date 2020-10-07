export default class FeatureAvailabilityResult {
  constructor(apiResult) {
    this.features = apiResult;
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  isFeatureAvailable(featureName) {
    return true;
  }
}
