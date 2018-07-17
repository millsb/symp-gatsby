/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const path = require('path')
// const { kebab } = require('case')

// // You can delete this file if you're not using it
// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   return new Promise((resolve, reject) => {
//     const blogPostTemplate = path.resolve(`src/templates/landing-page.js`)
//     // Query for markdown nodes to use in creating pages.
//     resolve(
//       graphql(
//         `
//           {
//             allHome {
//               edges {
//                 node {
//                   landingPages {
//                     title
//                     shortTitle
//                   }
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           reject(result.errors)
//         }

//         // Create pages for each markdown file.
//         console.log(result)
//         result.data.landingPages.forEach(({ node }) => {
//           node.createPage({
//             path: kebab(node.shortTitle),
//             component: blogPostTemplate,
//             // In your blog post template's graphql query, you can use path
//             // as a GraphQL variable to query for data from the markdown file.
//             context: {
//               path,
//             },
//           })
//         })
//       })
//     )
//   })
// }
