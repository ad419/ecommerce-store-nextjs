import BillboardComponent from "./ui/billboardComponent";
import { Billboard as BillboardType, Cupon } from "@/types";

interface BillboardProps {
  data: BillboardType;
  cupons: Cupon[];
}

const Billboard: React.FC<BillboardProps> = ({ data, cupons }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <BillboardComponent data={data} cupons={cupons} />
    </div>
  );
};

export default Billboard;
