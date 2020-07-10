/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const express = require('express');

const manifestBuilder = require('./builder/manifest');
const devStorage = require('./storage/dev-storage');
const {
  REGISTRY_FILE,
  FRAGMENT_DEFINITION_FILE,
} = require('./storage/constants');

module.exports = (rootPath, port = 8888) => {
  return devStorage.readInfos(rootPath).then((infos) => {
    const app = express();

    app.get(`/${REGISTRY_FILE}`, (request, response) => {
      response.status(200).json(manifestBuilder.buildRegistryManifest(infos));
    });

    app.get(`/:fragment/${FRAGMENT_DEFINITION_FILE}`, (request, response) => {
      const { fragment } = request.params;
      const manifest = manifestBuilder.buildFragmentManifest(infos, fragment);
      if (manifest) {
        response.status(200).json(manifest);
      } else {
        response.status(404).send(`Fragment "${fragment}" not found`);
      }
    });

    app.get('/:fragment/:version/*', (request, response) => {
      const { fragment, version } = request.params;
      const fragmentVersion = infos.find(
        (fragmentInfos) =>
          fragmentInfos.name === fragment &&
          fragmentInfos.versions.includes(version),
      );
      if (fragmentVersion) {
        const fragmentDistPath = path.resolve(rootPath, fragment, 'dist');
        const filepath = request.params[0] ? request.params[0] : '';
        fs.exists(path.resolve(fragmentDistPath, filepath), (exists) => {
          if (exists) {
            response.sendFile(filepath, {
              root: fragmentDistPath,
            });
          } else {
            response
              .status(404)
              .send(`File "${filepath}" not found in fragment "${fragment}"`);
          }
        });
      } else {
        response.status(404).send(`Fragment "${fragment}" not found`);
      }
    });

    app.listen(port);
    console.log(`Serve: ${rootPath} - localhost:${port}`);

    return app;
  });
};
/* eslint-enable no-console */
