/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { kebab } = require('case');

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;
//
//   return new Promise((resolve, reject) => {
//     const landingPageTemplate = path.resolve(`src/templates/landing-page.js`);
//     // Query for markdown nodes to use in creating pages.
//     resolve(
//       graphql(
//         `
//           {
//             allLandingPage {
//               edges {
//                 node {
//                   shortTitle {
//                     value
//                   }
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           reject(result.errors);
//         }
//
//         console.log(result);
//         result.data.allLandingPage.edges.forEach(({ node }) => {
//           createPage({
//             path: kebab(node.shortTitle.value),
//             component: landingPageTemplate,
//             // In your blog post template's graphql query, you can use path
//             // as a GraphQL variable to query for data from the markdown file.
//             context: {
//               shortTitle: node.shortTitle.value,
//             },
//           });
//         });
//       })
//     );
//   });
// };
