import { useEffect, useState } from "react";

interface InputBasketProps {
  update: (itemId: string, quantity: number) => void;
  id: string;
  quantity: number;
}

const delay = 1;

const InputBasket: React.FC<InputBasketProps> = ({ update, id, quantity }) => {
  const [value, setValue] = useState<string>("");

  useEffect(
    () => {
      if (!value) {
        return;
      }

      let timer1 = setTimeout(() => update(id, parseInt(value)), delay * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [value]
  );
  return (
    <input
      type="number"
      step="1"
      min="1"
      max="30"
      defaultValue={quantity}
      onChange={async (event) => {
        setValue(event.target.value);
      }}
    ></input>
  );
};
export default InputBasket;
