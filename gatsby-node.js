/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const slugify = require('slugify');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const eventPageTemplate = path.resolve(`src/templates/event-page.js`);
    resolve(
      graphql(
        `
          {
            allEvent {
              edges {
                node {
                  id
                  title {
                    rendered
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        console.log(result);
        result.data.allEvent.edges.forEach(({ node }) => {
          createPage({
            path: `/events/${slugify(node.title.rendered)}`,
            component: eventPageTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              id: node.id
            },
          });
        });
      })
    );
  });
};
