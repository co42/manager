export default class Job {
  constructor({ id, state, spec }) {
    Object.assign(this, {
      id,
      state,
      spec,
    });
  }

  jobCanBeKilled() {
    return this.state.status === 'RUNNING';
  }

  getClassForState() {
    switch (this.state.status) {
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
    return this.state.status === 'DONE';
  }

  isRunning() {
    return this.state.status === 'RUNNING';
  }

  isFailed() {
    return this.state.status === 'FAILED';
  }
}
