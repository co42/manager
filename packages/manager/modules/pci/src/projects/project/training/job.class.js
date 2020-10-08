export default class Job {
  constructor({ id, state, spec }) {
    Object.assign(this, {
      id,
      state,
      spec,
    });
  }

  jobCanBeKilled() {
    return this.status.state === 'RUNNING';
  }

  getClassForState() {
    switch (this.status.state) {
      case 'FAILED':
      case 'KILLING':
        return 'oui-status_error';
      case 'INTERRUPTED':
        return 'oui-status_warning';
      case 'DONE':
        return 'oui-status_success';
      case 'RUNNING':
      case 'SYNCING':
        return 'oui-status_info';
      default:
        return 'oui-status_info';
    }
  }

  isSuccess() {
    return this.status.state === 'DONE';
  }

  isRunning() {
    return this.status.state === 'RUNNING';
  }

  isFailed() {
    return this.status.state === 'FAILED';
  }
}
