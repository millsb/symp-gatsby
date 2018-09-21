export const iconDashboardFields = graphql`
  fragment IconDashboardFields on sc_IconDashboard {
    id
    ...on sc_IconDashboard {
      blockOne {
        values {
          name
          value
        }
      }
      blockTwo {
        values {
          name
          value
        }
      }
      blockThree {
        values {
          name
          value
        }
      }
      blockFour {
        values {
          name
          value
        }
      }
    }
  }
`;