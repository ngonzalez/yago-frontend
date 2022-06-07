import gql from 'graphql-tag';

const mutation = gql`
  mutation createQuote(
    $companyId: Int!,
    $available: Boolean!,
    $coverageCeiling: Int!,
    $deductible: Int!,
    $quoteId: String!,
    $grossPremiums: JSON!,
  ) {
    createQuote(input: {
      companyId: $companyId
      available: $available
      coverageCeiling: $coverageCeiling
      deductible: $deductible
      quoteId: $quoteId
      grossPremiums: $grossPremiums
    }) {
      quote {
        id
        available
        coverageCeiling
        deductible
        quoteId
        grossPremiums
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  companyId,
  available,
  coverageCeiling,
  deductible,
  quoteId,
  grossPremiums,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      companyId,
      available,
      coverageCeiling,
      deductible,
      quoteId,
      grossPremiums
    }
  });
}
