export const eventFieldsFragment = graphql`
  fragment EventFields on sc_EventPage {
    id
    date {
      rendered
    }
    title {
      rendered
    }
    summary {
      rendered
    }
    description {
      rendered
    }
    venue {
      rendered
    }
    mentors {
      targetItems {
        ...on sc_Person {
          firstName {
            rendered
          }
          lastName {
            rendered
          }
        }
      }
    }
    tags {
      targetItems {
        ...on sc_Tag_f297009bb3e949ce8ef574858de241e6 {
          title {
            rendered
          }
        }
      }
    }
  }
`;