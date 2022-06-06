import gql from 'graphql-tag';

const mutation = gql`
  mutation getQuote(
    $quoteId: String!,
  ) {
    getQuote(input: {
      quoteId: $quoteId,
    }) {
      quote {
        id
        available
        coverageCeiling
        deductible
        remoteQuoteId
        grossPremiums
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  quoteId,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      quoteId
    }
  });
}
