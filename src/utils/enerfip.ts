import { parse } from "node-html-parser";
import { Investment } from "@/types/Investment";
import axios from "axios";

const getInvestment = async (link: string) => {
  const investment = await axios.get(`https://fr.enerfip.eu/${link}`);
  const html = parse(investment.data);

  return {
    minimum: Number(
      html
        .querySelectorAll(".list-group-item")
        .map((x) => x.innerText)
        .find((x) => x.startsWith("Investissement min"))
        ?.replace("Investissement min", "")
        .replace(" €&nbsp;", "")
    ),
  };
};

export const getEnerfipInvestments = async (): Promise<Investment[]> => {
  const investments = await axios.get(
    "https://fr.enerfip.eu/placer-son-argent/"
  );

  const html = parse(investments.data);
  const inProgress = parse(
    html.querySelectorAll(".arkefip-project-showcase-grid")[0].innerHTML
  );

  const names = inProgress.querySelectorAll(".owner").map((x) => x.innerText);
  const categories = inProgress
    .querySelectorAll(".energy-pill-label")
    .map((x) => x.innerText);
  const descriptions = inProgress
    .querySelectorAll(".title")
    .map((x) => x.innerText);
  const infos = inProgress
    .querySelectorAll(".info-item")
    .map((x) => x.innerText);
  const links = inProgress
    .querySelectorAll(".cover")
    .map((x) => x.attributes.href);

  const extraInfos = await Promise.all(links.map(getInvestment));
  return names.map((name, index) => ({
    type: "enerfip",
    name,
    category: categories[index],
    description: descriptions[index],
    remaining: Number(
      infos[index * 4 + 1].replace(" € restant", "").replaceAll(" ", "")
    ),
    end: `${infos[index * 4 + 3].replace(
      "Jusqu&#39;au",
      ""
    )} ${new Date().getFullYear()}`,
    link: `https://fr.enerfip.eu${links[index]}`,
    ...extraInfos[index],
  }));
};
