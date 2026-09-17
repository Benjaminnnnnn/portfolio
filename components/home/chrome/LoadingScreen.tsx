type LoadingScreenProps = {
  progress: number;
  leaving: boolean;
};

export function LoadingScreen({ progress, leaving }: LoadingScreenProps) {
  return (
    <div
      className={`loading-overlay${leaving ? " is-leaving" : ""}`}
      aria-label={`Loading ${progress}%`}
    >
      <div className="loading-rail">
        <div className="loading-progress" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
