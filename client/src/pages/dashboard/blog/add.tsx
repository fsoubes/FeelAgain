import { withApollo } from "../../../utils/withApollo";

import Add from "../../../components/Dashboard/Blog/BlogForm";

const Dashboard: React.FC<{}> = ({}) => {
  return <Add title={"Ajouter un article"} />;
};
export default withApollo({ ssr: false })(Dashboard);
