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
          sc {
            events: item(path: "sitecore/content/home/events") {
              children {
                ...on sc_EventPage {
                  id
                  title {
                    rendered
                  }
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

        result.data.sc.events.children.forEach(( node ) => {
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
