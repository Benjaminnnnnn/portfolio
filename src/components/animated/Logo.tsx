const Logo = ({ className }: { className: string }) => {
  return (
    <svg viewBox="0 0 1000 300" className={className}>
      <text x="0%" y="0%" dy="50%" textAnchor="start">
        Benjamin
      </text>
    </svg>
  );
};

export default Logo;
