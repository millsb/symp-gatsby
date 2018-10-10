const {introspectionQuery, buildClientSchema} = require("graphql");
const path = require("path");
const {request} = require("graphql-request");
const SC_HOST = "http://symp.local";
const SC_DB = "master";
const SC_GRAPHQL_URL = `${SC_HOST}/sitecore/api/graph/items/${SC_DB}`;
const SC_API_KEY = '89746470-C1BB-4559-BB59-CBFCB761D9AE';

module.exports = {
  siteMetadata: {
    title: 'GrokCamp',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-sitecore-media',
      options: {
        endpoint: SC_GRAPHQL_URL,
        apiKey: SC_API_KEY,
        mediaLibraryPath: '/sitecore/media library/grokcamp',
        destination: '../../static',
        host: SC_HOST
      }
    },
    {
      resolve: 'gatsby-source-sitecore-service',
      options: {
        services: {
          siteHeader: `${SC_HOST}/GlobalService.aspx?type=header`,
          siteFooter: `${SC_HOST}/GlobalService.aspx?type=footer`
        }
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "sc",
        // This is field under which it's accessible
        fieldName: "sc",
        // Url to query from
        url: SC_GRAPHQL_URL,
        headers: {
          "sc_apikey": SC_API_KEY
        },
        createSchema: async () => {
          const introspectionUrl =  `${SC_GRAPHQL_URL}?sc_apikey=${SC_API_KEY}`;
          const introspectionData = await request(introspectionUrl, introspectionQuery);
          return buildClientSchema(introspectionData);
        },
        refetchInterval: 10
      }
    },

  ],
};
