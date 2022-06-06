import gql from 'graphql-tag';

const mutation = gql`
  mutation createCompany(
    $annualRevenue: Int!,
    $enterpriseNumber: String!,
    $legalName: String!,
    $naturalPerson: Boolean!,
    $naceBelCodes: JSON!,
  ) {
    createCompany(input: {
      annualRevenue: $annualRevenue,
      enterpriseNumber: $enterpriseNumber,
      legalName: $legalName,
      naturalPerson: $naturalPerson,
      naceBelCodes: $naceBelCodes,
    }) {
      company {
        id
        annualRevenue
        enterpriseNumber
        legalName
        naturalPerson
        naceBelCodes
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  annualRevenue,
  enterpriseNumber,
  legalName,
  naturalPerson,
  naceBelCodes,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      annualRevenue,
      enterpriseNumber,
      legalName,
      naturalPerson,
      naceBelCodes
    }
  });
}
