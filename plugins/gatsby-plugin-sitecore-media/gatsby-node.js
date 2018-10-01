const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { GraphQLClient } = require('graphql-request');

const query = `
  query MediaLibraryQuery($path: String!) {
    mediaFolder: item(path: $path) {
      children {
        ...on Jpeg {
          id
          displayName
          url
          extension {
            rendered
          }
        }
      }
    }
  }
`;

exports.onPreInit = async (
  { actions, reporter },
  { endpoint, apiKey, mediaLibraryPath, host, destination }
) => {
  if (!endpoint) {
    reporter.panic("\ngatsby-plugin-sitecore-media: no graphql endpoint supplied");
    return
  }

  if (!mediaLibraryPath || mediaLibraryPath === "") {
    reporter.panic("\ngatsby-plugin-sitecore-media: No media library path defined");
    return;
  }

  if (!destination || destination === "") {
    reporter.panic("\ngatsby-plugin-sitecore-media: No media library destination folder specified");
    return;
  }

  const destPath = path.resolve(__dirname, destination);

  const client  = new GraphQLClient(endpoint, { headers: { "sc_apikey": apiKey} });
  const mediaResults = await client.request(query, {path: mediaLibraryPath});

  if (!mediaResults || !mediaResults.mediaFolder.children.length) {
    console.log("\ngatsby-plugin-sitecore-media: No media library results found")
    return
  }

  const mediaItems = mediaResults.mediaFolder.children.map( async media => {
    let response;
    const url = `${host}/-/media/${media.id}.ashx`;
    try {
      response = await axios({
        method: 'GET',
        url: url,
        responseType: "stream"
      });
    } catch(err) {
      reporter.panic(err);
    }

    if (response) {
      const imagePath = `${destPath}/${media.url.replace('/en/sitecore/media-library', "-/media")}.${media.extension.rendered}`;
      response.data.pipe(fs.createWriteStream(imagePath));
    }

  });

  console.log(`\ngatsby-plugin-sitecore-media: downloaded ${mediaItems.length} media items`);


};
