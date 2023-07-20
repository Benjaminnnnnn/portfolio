import React, { useEffect, useState } from "react";

const alphabet = [...Array(26).keys()].map((v, i) =>
  String.fromCharCode(i + 65)
);

// generates random text from the English alphabet
// starting from index
const generateRandomText = (text, index) => {
  const characters = text.split("").map((char, idx) => {
    const randomChar = alphabet[Math.floor(Math.random() * 26)];
    return idx >= index ? randomChar.toUpperCase() : char;
  });
  return characters.join("");
};

const TypingEffect = ({ text, Tag, className, children }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [id, setId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1 / 3);
    }, 50);
    setId(id);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (currentIndex < text.length) {
      setCurrentText(generateRandomText(text, currentIndex));
    } else {
      clearInterval(id);
      setId(null);
    }
  }, [currentIndex, text]);

  return (
    <Tag className={className}>
      {currentText} {children}
    </Tag>
  );
};

export default TypingEffect;
