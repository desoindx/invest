import { Investment } from "@/types/Investment";
import axios from "axios";

const getInvestment = async (slug: string) => {
  const investment = await axios.get(
    `https://api.tudigo.co/v1/projects/${slug}`
  );
  return {
    minimum: investment.data.minimum_investment,
  };
};

export const getTudigoInvestments = async (): Promise<Investment[]> => {
  const tudigo = await axios.get("https://api.tudigo.co/v1/projects/sections");
  const investments = await Promise.all(
    tudigo.data.on_going.list.map(async (investment: any) => {
      const extraInfo = await getInvestment(investment.slug);
      return {
        ...investment,
        ...extraInfo,
      };
    })
  );

  return investments.map((investment: any) => ({
    type: "tudigo",
    name: investment.name,
    category: investment.category.name,
    description: investment.description,
    collected: investment.amount_collected,
    minimum: investment.minimum,
    goal: investment.goal_amount,
    maxGoal: investment.max_goal_amount,
    end: investment.end_date,
    link: `https://app.tudigo.co/equity/${investment.slug}`,
  }));
};
