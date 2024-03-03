export type Investment = {
  name: string;
  category: string;
  description: string;
  end: string;
  link: string;
  minimum: number;
} & (TudigoInvestment | EnerfipInvestment);

export type EnerfipInvestment = {
  type: "enerfip";
  remaining: number;
};

export type TudigoInvestment = {
  type: "tudigo";
  collected: number;
  goal: number;
  maxGoal: number;
};
