import React from "react";

interface BasketProps {
  total: number;
}

const Basket: React.FC<BasketProps> = ({ total }) => {
  return (
    <svg
      id="basket"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 31.04 20.95"
    >
      <g id="Calque_2" data-name="Calque 2">
        <g id="Calque_1-2" data-name="Calque 1">
          <path
            className="cls-1"
            d="M0,1,5.52,1l5.67,13.88A1.75,1.75,0,0,0,12.76,16H24.09a1.72,1.72,0,0,0,1.56-1.15l4.47-11"
          />
          <circle className="cls-2" cx="12.55" cy="19.2" r="1.25" />
          <text
            className="cls-3"
            transform="translate(10.97 11.06) scale(0.83 1)"
          >
            {total < 10 ? `\xa0${total}` : `${total}`}
          </text>
          <circle className="cls-2" cx="24.72" cy="19.2" r="1.25" />
        </g>
      </g>
    </svg>
  );
};
export default Basket;
