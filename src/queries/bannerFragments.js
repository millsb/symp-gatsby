export const bannerFieldsFragment = graphql`
  fragment BannerFields on sc_Banner {
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