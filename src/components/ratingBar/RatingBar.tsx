import { ReactComponent as Star } from "../../icons/star-fill.svg";

interface RatingBarProps {
  value: number;
}

const RatingBar = ({ value }: RatingBarProps) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((v) => {
      if (value >= v) {
        return <Star key={v} className="w-7 fill-yellow-400" />;
      }
      return <Star className="w-7 fill-slate-400" />;
    })}
  </div>
);

export default RatingBar;
