const SC_API_KEY = '89746470-C1BB-4559-BB59-CBFCB761D9AE';

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
    }

    // {
    //   resolve: 'gatsby-source-sitecore',
    //   options: {
    //     token: SC_API_KEY,
    //     endpoint: 'http://symp.local/sitecore/api/graph/items/master',
    //     queries: `${__dirname}/src/queries/*.graphql`,
    //   },
    // },
  ],
};
