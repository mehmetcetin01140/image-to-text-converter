import React, { useEffect, useState } from "react";
export default function Header(props) {

  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const inputRef = React.useRef(null);


  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleMouseMove = (event) => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };

  useEffect(() => {
    document.body.style.backgroundPositionX = coords.x + "px";
    document.body.style.backgroundPositionY = coords.y + "px";
  }, [coords]);
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.setImage(e.dataTransfer.files[0]);
      setFile(e.dataTransfer.files[0]);
    }
  };


  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      props.setImage(e.target.files[0]);
      setFile(e.dataTransfer.files[0]);
    }
  };


  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="drag-and-drop " onMouseMove={handleMouseMove}>
      {!props.text && (
        <form
          id="form-file-upload"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={false}
            onChange={handleChange}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
          >
            <div className="circle-text">
              <p>
                <i>Drag and drop your file here</i>
              </p>

              {/* <button className="upload-button text-white" onClick={onButtonClick}>Upload a file</button> */}
            </div>
          </label>
          <>
            <input
              type="button"
              onClick={props.imagePath ? props.handleSubmit : null}
              value="Convert"
              className="convert-button"
            />
            <br />
            <span>{props.imagePath}</span>
          </>
          <br />

          {props.isLoading && (
            <>
              <progress value={props.progress} max="100">
                {props.progress}%{" "}
              </progress>{" "}
              <p>Converting: {props.progress} %</p>
            </>
          )}

          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      )}
      {!props.isLoading && props.text && (
        <>
          <button
            onClick={() => {
              props.setImage("");
              props.setText("");
            }}
          >
            Retry
          </button>

          <textarea
            rows="30"
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
          ></textarea>
        </>
      )}
    </div>
  );
}
