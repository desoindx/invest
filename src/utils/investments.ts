import Investment from "@/components/Investment";
import { getTudigoInvestments } from "./tudigo";
import { getEnerfipInvestments } from "./enerfip";

export const getInvestments = async () => {
  const investments = await Promise.all([
    getTudigoInvestments(),
    getEnerfipInvestments(),
  ]);
  return investments
    .flatMap((investment) => investment)
    .sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime());
};
