const {introspectionQuery, buildClientSchema} = require("graphql");
const {request} = require("graphql-request");
const SC_GRAPHQL_URL = 'https://sitecore-622750-single.azurewebsites.net/sitecore/api/graph/items/master';
const SC_API_KEY = '75975ED5-7D7A-4E2D-995A-BB526D511A01';

module.exports = {
  siteMetadata: {
    title: 'GrokCamp',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: 'gatsby-source-sitecore-service',
      options: {
        services: {
          siteHeader: "https://sitecore-622750-single.azurewebsites.net/GlobalService.aspx?type=header",
          siteFooter: "https://sitecore-622750-single.azurewebsites.net/GlobalService.aspx?type=footer"
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
        refetchInterval: 30
      }
    },

  ],
};
