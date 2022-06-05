import gql from 'graphql-tag';

const mutation = gql`
  mutation getNaceBelCodes(
    $level: Int!,
  ) {
    getNaceBelCodes(input: {
      level: $level,
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
}) {
  return apollo.mutate({
    mutation,
    variables: {
      level
    }
  });
}
