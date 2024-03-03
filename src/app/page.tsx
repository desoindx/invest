import Investments from "@/components/Investments";
import { getInvestments } from "@/utils/investments";

export const revalidate = 3600 * 24

export default async function Home() {
  const investments = await getInvestments();
  return (
    <div>
      <Investments investments={investments} />
    </div>
  );
}
