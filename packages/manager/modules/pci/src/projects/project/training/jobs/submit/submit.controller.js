import get from 'lodash/get';

export default class PciTrainingJobsSubmitController {
  /* @ngInject */
  constructor(
    $translate,
    PciProjectTrainingService,
    PciProjectTrainingJobService,
    atInternet,
  ) {
    this.$translate = $translate;
    this.PciProjectTrainingService = PciProjectTrainingService;
    this.PciProjectTrainingJobService = PciProjectTrainingJobService;
    this.atInternet = atInternet;
  }

  $onInit() {
    // Form payload
    this.job = {
      region: null,
      image: {
        id: null,
      },
      command: null,
      volumes: [],
      resources: {
        gpu: 1,
      },
    };

    this.gpus = [];
    this.selectedGpu = null;
    this.showAdvancedImage = false;
  }

  setData() {
    this.dataSource = [];
    this.job.volumes = [];
    this.emptyData = this.dataSource.length === 0;
  }

  cliCommand() {
    const baseCmdArray = [
      'job submit',
      `--image ${this.job.image.id}`,
      `--gpu ${this.job.resources.gpu}`,
    ];

    if (this.job.data && this.job.data.length > 0) {
      this.job.data
        .map(({ name }) => `--data ${name}`)
        .forEach((x) => baseCmdArray.push(x));
    }

    if (this.job.command) {
      baseCmdArray.push('--');
      this.splitStringCommandIntoArray().forEach((x) => baseCmdArray.push(x));
    }

    return baseCmdArray.join(' \\\n\t');
  }

  splitStringCommandIntoArray() {
    if (this.job.command) {
      return this.job.command.match(/([^\s"])+|"[^"]+"/g).map((elt) => {
        if (elt.startsWith('"') && elt.endsWith('"')) {
          return elt.substring(1, elt.length - 1);
        }
        return elt;
      });
    }
    return [];
  }

  computeJobSpec() {
    const payload = {
      image: this.job.image.id,
      region: this.job.region.name,
      volumes: this.job.volumes,
      resources: {
        cpu: this.job.resources.cpu,
        gpu: this.job.resources.gpu,
        mem: this.job.resources.mem,
      },
    };
    if (this.job.command) {
      payload.command = this.splitStringCommandIntoArray();
    }
    return payload;
  }

  onChangeRegion(region) {
    // Update GPU
    this.PciProjectTrainingService.getGpus(this.projectId, region.id).then(
      (gpus) => {
        this.gpus = gpus;
        [this.selectedGpu] = this.gpus;
      },
    );
  }

  onStepperFinish() {
    this.submitJob();
  }

  onClickAdvancedImage() {
    this.showAdvancedImage = !this.showAdvancedImage;
  }

  submitJob() {
    this.atInternet.trackClick({
      name:
        'public-cloud::pci::projects::project::training::jobs::submit::confirm',
      type: 'action',
    });

    this.isSubmit = true;
    this.PciProjectTrainingJobService.submit(
      this.projectId,
      this.computeJobSpec(),
    )
      .then(() =>
        this.goBack(
          this.$translate.instant(
            'pci_projects_project_training_jobs_list_submit_success',
          ),
        ),
      )
      .catch((error) => {
        this.error = get(error, 'data.message');
      })
      .finally(() => {
        this.isSubmit = false;
      });
  }
}
