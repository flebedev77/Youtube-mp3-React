import { useState } from 'react'
import youtubeLogo from "./assets/youtube.svg"

function App() {
  const [ isDownloading, setDownloading ] = useState(false);
  const [ urlInput, setUrlInput ] = useState("");

  function handleDownload() {
    if (isDownloading == true) return;
    setDownloading(true);

    fetch(window.location.origin + "/download-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: urlInput })
    }).then((res) => {
      if (res.ok) return res.json();
    }).then(data => {
      setUrlInput("");

      const a = document.createElement("a");
      a.href = data.url;
      a.download = "Music";
      a.click();

      setDownloading(false);
    })

  }

  return (
    <>
      <div className="main-container">
        <img src={youtubeLogo} className="logo"></img>
        <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)}/>
        <button className={ (isDownloading == true) ? "disabled" : "enabled" } onClick={() => handleDownload()}>{ (isDownloading == true) ? "Downloading..." : "Download" }</button>
      </div>
    </>
  )
}

export default App
