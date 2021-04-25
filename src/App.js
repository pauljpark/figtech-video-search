import React, { useState } from "react"
import "./App.css"

export default function App() {
  const [endpoint, setEndpoint] = useState("")
  const [response, setResponse] = useState([])
  const [saved, setSaved] = useState([])
  const [toggle, setToggle] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setToggle(false)
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => setResponse(json.items))
  }

  const onChange = (e) => {
    setEndpoint(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${e.target.value}&type=video&key=${process.env.REACT_APP_API_KEY}`
    )
  }

  const saveClick = (vid) => {
    if (saved.some((item) => item.id.videoId === vid.id.videoId)) {
      return null
    } else {
      setSaved([...saved, vid])
      console.log(saved)
    }
  }

  const onDelete = (key) => {
    const newSavedVids = saved.filter((video) => video.id.videoId !== key)
    setSaved(newSavedVids)
  }

  return (
    <div className="App">
      <div className="top-bar" style={{ border: "2px solid green" }}>
        <form onSubmit={handleSubmit} style={{ border: "1px dashed blue" }}>
          <input onChange={onChange} />
          <button>Search</button>
        </form>
        <button
          className="saved-vids-btn"
          style={{ border: "3px solid orange" }}
          onClick={() => setToggle(true)}
        >
          Saved Videos
        </button>
      </div>
      {toggle ? (
        saved[0] !== undefined ? (
          <div className="videos-container">
            {saved.map((item) => (
              <div key={item.id.videoId} className="single-vid-item">
                <p>{item.snippet.title}</p>
                <a href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt="thumbnail"
                  />
                </a>
                <button>Play</button>
                <button onClick={() => onDelete(item.id.videoId)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h2>No Videos Saved!</h2>
        )
      ) : (
        <div className="videos-container">
          {response.map((item) => (
            <div key={item.id.videoId} className="single-vid-item">
              <p>{item.snippet.title}</p>
              <a href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt="thumbnail"
                  width="400px"
                />
              </a>
              <button onClick={() => saveClick(item)}>Save</button>
            </div>
          ))}
        </div>
      )}
      {/* <h3>{JSON.stringify(response[1])}</h3> */}
    </div>
  )
}
