const SC_API_KEY = '89746470-C1BB-4559-BB59-CBFCB761D9AE'

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sitecore',
      options: {
        token: SC_API_KEY,
        endpoint: 'http://symp.local/sitecore/api/graph/items/master',
        queries: `${__dirname}/src/queries/*.graphql`,
      },
    },
  ],
}
