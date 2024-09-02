const ShimmerSkeleton = ({ className }) => {
  return (
    <div
      className={`animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%] ${className}`}
    ></div>
  );
};

export default ShimmerSkeleton;
