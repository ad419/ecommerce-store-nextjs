import BillboardComponent from "./ui/billboardComponent";
import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <BillboardComponent data={data} />
    </div>
  );
};

export default Billboard;
