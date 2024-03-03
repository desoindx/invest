import { Investment as InvestmentType } from "@/types/Investment";
import React from "react";
import Investment from "./Investment";
import styles from "./Investments.module.css";

const Investments = ({ investments }: { investments: InvestmentType[] }) => {
  return (
    <div className={styles.investments}>
      {investments.map((investment) => (
        <Investment investment={investment} key={investment.name} />
      ))}
    </div>
  );
};

export default Investments;
