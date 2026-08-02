type ScrambleTextProps = {
  text: string;
  delay?: number;
  letterDelay?: number;
  className?: string;
  reverse?: boolean;
};

export function ScrambleText({ text, delay = 300, letterDelay = 80, className = "", reverse = false }: ScrambleTextProps) {
  return (
    <span
      className={`intro-scramble ${className}`.trim()}
      data-delay={delay}
      data-letter-delay={letterDelay}
      data-reverse={reverse ? "true" : undefined}
      data-text={text}
      aria-label={text.replaceAll("\n", " ")}
    >
      {Array.from(text).map((character, index) => {
        if (character === "\n") return <br key={`br-${index}`} />;
        return (
          <span data-scramble-char={index} data-character={character} aria-hidden="true" key={`${character}-${index}`}>
            {character}
          </span>
        );
      })}
    </span>
  );
}
