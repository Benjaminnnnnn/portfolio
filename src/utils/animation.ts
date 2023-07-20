// import { useEffect } from "react";

// const alphabet = [...Array(26).keys()].map((v, i) =>
//   String.fromCharCode(i + 65)
// );
// const INTERVAL_DURATION = 100;

// // generates random text from the English alphabet
// // starting from index
// const generateRandomText = (text, index) => {
//   const characters = text.split("").map((char, idx) => {
//     const randomChar = alphabet[Math.floor(Math.random() * 26)];
//     return idx >= index ? randomChar : char.toUpperCase();
//   });
//   return characters.join("");
// };

// export const hoverTextEffect = (
//   setCurrentText,
//   setCurrentIndex,
//   setCurrentID
// ) => {
//   const numberOfIntervals = 1;
//   useEffect(() => {
//     if (currentID < numberOfIntervals) {
//       const id = setInterval(() => {
//         if (currentIndex < text.length) {
//           setCurrentText((prevText) =>
//             generateRandomText(prevText, currentIndex)
//           );
//           setCurrentIndex((prevIndex) => prevIndex + 1 / 2);
//           setCurrentID(numberOfIntervals);
//         } else {
//           clearInterval(id);
//         }
//         return () => clearInterval(id);
//       }, INTERVAL_DURATION);
//     }
//   }, []);
// };
