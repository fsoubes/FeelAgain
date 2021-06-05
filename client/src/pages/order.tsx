import { Layout } from "../components/Layout";
import OrderList from "../components/Order/OrderList";
import { Orders, useGetOrdersQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  const { data } = useGetOrdersQuery();

  return (
    <Layout>
      <div className="container__order">
        <h1 style={{ marginBottom: "1rem" }}>Vos Commandes</h1>
        {data?.getOrders.map((item, index) => {
          return <OrderList key={index} data={item as Orders} />;
        })}
      </div>
    </Layout>
  );
};
export default withApollo({ srr: true })(Order);
