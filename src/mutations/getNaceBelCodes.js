import gql from 'graphql-tag';

const mutation = gql`
  mutation getNaceBelCodes(
    $level: Int!,
    $parentCode: String!,
  ) {
    getNaceBelCodes(input: {
      level: $level,
      parentCode: $parentCode,
    }) {
      naceBelCodes {
        id
        level
        code
        parentCode
        labelEn
        labelFr
        labelNl
        labelDe
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  level,
  parentCode,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      level,
      parentCode
    }
  });
}
