"use strict";

const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
  async transform({ asset, logger }) {
    // Retrieve the asset code
    const source = await asset.getCode();

    // Look for file="myfile.png"
    const result = source.replace(/file="(.*)"/, (match, imageDep) => {
      // Replace the filename iwith a dependency reference
      const dependencyId = asset.addURLDependency(imageDep);
      logger.verbose({
        message: "Added dependency for " + imageDep + " id " + dependencyId,
      });
      return `file="${dependencyId}"`;
    });

    // Update the asset
    asset.setCode(result);

    // Return the asset
    return [asset];
  },
});
