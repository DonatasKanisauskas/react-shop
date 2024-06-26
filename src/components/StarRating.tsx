import Star from "../assets/Star";

interface StarRatingProps {
  rating: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function StarRating({
  rating,
  primaryColor,
  secondaryColor,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 ${
            i < Math.round(rating)
              ? primaryColor || "text-yellow-300"
              : secondaryColor || "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
