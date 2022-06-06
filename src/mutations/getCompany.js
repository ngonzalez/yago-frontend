import gql from 'graphql-tag';

const mutation = gql`
  mutation getCompany(
    $companyId: Int!,
  ) {
    getCompany(input: {
      companyId: $companyId,
    }) {
      company {
        id
        itemId
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
  companyId,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      companyId
    }
  });
}
