import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import Main from "./Main";

function Convert() {
  const [imagePath, setImage] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => {
        console.log(m);
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
  };

  return (
    <div className="main">
      <Main
        setImage={setImage}
        handleSubmit={handleSubmit}
        imagePath={imagePath.name}
        progress={progress}
        isLoading={isLoading}
        text={text}
        setText={setText}
      />
    </div>
  );
}

export default Convert;
