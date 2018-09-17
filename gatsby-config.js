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
      resolve: 'gatsby-source-sitecore',
      options: {
        token: SC_API_KEY,
        endpoint: 'https://sitecore-622750-single.azurewebsites.net/sitecore/api/graph/items/master',
        queries: `${__dirname}/src/queries/*.graphql`,
      },
    },
  ],
};
