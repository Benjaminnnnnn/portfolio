type SourceRingsProps = {
  progress: number;
};

export function SourceRings({ progress }: SourceRingsProps) {
  const totalDistance = 945;
  let distance = Math.min(1, Math.max(0, progress)) * totalDistance;
  let phase = 0;

  if (distance > 300) {
    if (distance <= 600) {
      phase = 1;
      distance -= 300;
    } else {
      phase = 2;
      distance -= 600;
    }
  }

  const firstIndex = phase === 0 ? Math.floor(distance / 50) : 0;
  const used = new Set<number>();
  const ellipses = Array.from({ length: 7 }, (_, index) => {
    let local = 0;
    let visible = false;

    if (phase === 0) {
      if (distance >= 50 * index) {
        local = distance - (Math.min(firstIndex, 6) - index) * 50;
        visible = local > 0 && local < 300;
      }
    } else if (phase === 1) {
      local = ((distance + 50 * index) % 300 + 300) % 300;
      visible = local > 0 && local < 300;
    } else {
      local = distance + 50 * index;
      visible = local > 0 && local < 300;
    }

    const radius = visible ? Math.sqrt(Math.max(0, 22500 - (local - 150) ** 2)) : 0;
    const key = Math.round(local * 2);
    if (!radius || used.has(key)) visible = false;
    used.add(key);

    return { visible, cx: 172, cy: 22 + local, rx: radius, ry: radius * 0.1 };
  });

  return (
    <div className="orbit-rings" aria-hidden="true">
      <svg width="344" height="344" viewBox="0 0 344 344" fill="none">
        <defs>
          <clipPath id="source-ring-clip">
            <polygon points="20,22 324,22 324,322 20,322" />
          </clipPath>
        </defs>
        <g clipPath="url(#source-ring-clip)">
          {ellipses.map(({ visible, ...ellipse }, index) => (
            <ellipse
              key={index}
              {...ellipse}
              visibility={visible ? "visible" : "hidden"}
              stroke="#C0FE04"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
