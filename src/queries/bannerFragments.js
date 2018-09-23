import {graphql} from "gatsby";

export const bannerFieldsFragment = graphql`
  fragment BannerFields on sc_Banner {
    id
    topText {
      rendered
    }
    bottomText {
      rendered
    }
    phrases {
      values {
        name
      }
    }
  }
`;