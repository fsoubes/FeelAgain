import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";
import { NextPage } from "next";
import {
  useGetOrderQuery,
  useRefundOrderMutation,
} from "../../../generated/graphql";
import styles from "../../../styles/CancelOrder.module.scss";
import { Button, Checkbox } from "@material-ui/core";
import Link from "next/link";

interface Props {
  id?: string;
}

const CancelOrder: NextPage<Props> = ({ id }) => {
  const [reason, setReason] = useState<string>("");

  const { data, loading, refetch } = useGetOrderQuery({
    variables: { orderId: id as string },
  });

  const [refund] = useRefundOrderMutation();

  const [selected, setSelected] = useState<string[] | []>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (data) {
      const total = data?.getOrder.products.reduce((acc, item) => {
        return acc + item.variant.price * (item.quantity as number);
      }, 0);

      setTotal(total);
    }
  }, [data]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await refund({
        variables: {
          orderId: data?.getOrder._id,
          updated: selected as string[],
          total: total,
        },
      });

      if (res.data) {
        refetch();
      }
    } catch (err) {
      throw err;
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    let current = selected?.slice();

    const price = data?.getOrder.products
      .filter((item) => item.variant._id === event.target.value)
      .map((item) => item.variant.price)[0];

    if (isChecked) {
      current?.splice(
        current?.findIndex((a) => a === event.target.value),
        1
      );
      setTotal(total + (price as number));
    } else {
      current?.push(event.target.value);
      setTotal(total - (price as number));
    }

    setSelected(current as string[]);
  };

  return (
    <Layout>
      <div className="container__shop">
        <h4>
          Si vous avez été facturé, un remboursement sera effetué et sera à
          votre disposition dans les 5 à 7 prochains jours ouvrables.
        </h4>
        <div className={styles.warning}>
          <h3>Attention vous allez annuler cette commande</h3>
        </div>
        {data && (
          <div>
            {data.getOrder.products.map((item, index) => {
              const products = Array(item.quantity)
                .fill(null)
                .map((__, i) => {
                  return (
                    <div
                      className={styles.content}
                      key={`${item.variant._id}-${index}-${i}`}
                    >
                      <div>
                        <Checkbox
                          value={item.variant._id}
                          defaultChecked
                          onChange={handleChange}
                        />
                        <div>
                          <div>
                            1 ex. de :
                            <a
                              href={`/products/${item.variant.shoes._id}`}
                              target="_blank"
                            >
                              {item.variant.shoes?.title}
                            </a>
                          </div>
                          <div>Vendeur: {item.variant.shoes.vendor}</div>
                          <div>
                            Pointure: {item.variant.title.split("/")[0]}
                          </div>
                        </div>
                      </div>
                      <div>
                        Eur&nbsp;
                        <strong>{item.variant.price as number},00</strong>
                      </div>
                    </div>
                  );
                });

              return (
                <div key={index}>
                  {index === 0 && (
                    <div className={styles.header}>
                      <div>Articles commandés</div>
                      <div>Prix</div>
                    </div>
                  )}
                  {products}
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.reason}>
          Raison de l'annulation (facultatif) :
          <select onChange={(e) => setReason(e.target.value)}>
            <option>Choisissez le motif de l'annulation</option>
            <option>Commande créée par erreur</option>
            <option>Frais de livraison trop élévé</option>
            <option>Besoin de changer l'adresse de livraison</option>
            <option>Besoin de changer de moyen de paiement</option>
            <option>Autre</option>
          </select>
        </div>
        <div className={styles.action}>
          <Button className={styles.confirm} onClick={handleClick}>
            Annuler les articles selectionnées dans cette commande
          </Button>
          <Link href={`/order/detail/${id}`}>
            <Button className={styles.return}>
              Revenir au détail de la commande
            </Button>
          </Link>
        </div>
        <div className={styles.warning}>
          <h3>&nbsp;</h3>
        </div>
      </div>
    </Layout>
  );
};

CancelOrder.getInitialProps = ({ query: { id } }) => {
  if (id?.length === 24) {
    return { id: id as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: false })(CancelOrder);
