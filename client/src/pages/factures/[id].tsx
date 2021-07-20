import { NextPage } from "next";
import { withApollo } from "../../utils/withApollo";

interface FactureProps {
  id: string;
}

const Facture: NextPage<FactureProps> = ({ id }) => {
  return <div>Hey {id}</div>;
};

Facture.getInitialProps = ({ query: { id } }) => {
  if (id?.length === 24) {
    return { id: id as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: false })(Facture);
