import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Verticals } from "@/types/types";

function VerticalSelect({
  handleVerticalChange,
}: {
  handleVerticalChange: (value: keyof typeof Verticals) => void;
}) {
  return (
    <Select onValueChange={handleVerticalChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select vertical" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Verticals.general}>General</SelectItem>
        <SelectItem value={Verticals.fashion}>Fashion</SelectItem>
        <SelectItem value={Verticals.home}>Home</SelectItem>
      </SelectContent>
    </Select>
  );
}

export { VerticalSelect };
