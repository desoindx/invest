import { Investment as InvestmentType } from "@/types/Investment";
import React from "react";
import styles from "./Investment.module.css";
import Link from "next/link";

const Investment = ({ investment }: { investment: InvestmentType }) => {
  return (
    <Link
      href={investment.link}
      target="_blank"
      rel="noopener noreferer"
      className={styles.investment}
    >
      <p>{new Date(investment.end).toLocaleDateString("fr-FR")}</p>
      <p>{investment.name}</p>
      <p>{investment.category}</p>
      <p>{investment.description}</p>
      <p>{investment.minimum.toLocaleString("fr-FR")}</p>
      {investment.type === "tudigo" && (
        <>
          <p>
            {investment.collected.toLocaleString("fr-FR")} /{" "}
            {investment.goal.toLocaleString("fr-FR")} (
            {investment.maxGoal.toLocaleString("fr-FR")})
          </p>
        </>
      )}
      {investment.type === "enerfip" && (
        <>
          <p>{investment.remaining.toLocaleString("fr-FR")}</p>
        </>
      )}
    </Link>
  );
};

export default Investment;
