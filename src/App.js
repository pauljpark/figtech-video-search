import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import SearchIcon from "@material-ui/icons/Search"
import InputAdornment from "@material-ui/core/InputAdornment"
import "./App.css"

export default function App() {
  const [endpoint, setEndpoint] = useState("")
  const [response, setResponse] = useState([])
  const [saved, setSaved] = useState([])
  const [toggle, setToggle] = useState(false)
  const [showHome, setShowHome] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    setToggle(false)
    setShowHome(false)
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
      <div className="top-bar">
        <form onSubmit={handleSubmit}>
          <TextField
            className="textfield"
            label="Search..."
            color="primary"
            variant="filled"
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    style={{ backgroundColor: "transparent" }}
                    onClick={handleSubmit}
                    endIcon={<SearchIcon />}
                  ></Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Button
          className="saved-vids-btn"
          variant="contained"
          onClick={() => setToggle(true)}
          color="primary"
        >
          Saved Videos
        </Button>
      </div>
      {toggle ? (
        saved[0] !== undefined ? (
          <div className="videos-container">
            {saved.map((item) => (
              <div key={item.id.videoId} className="single-vid-item">
                <p style={{ width: "250px" }}>{item.snippet.title}</p>
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt="thumbnail"
                  width="250px"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${item.id.videoId}`
                    )
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onDelete(item.id.videoId)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <h1>No Videos Saved!</h1>
        )
      ) : showHome ? (
        <h1>Search for a video, any video...</h1>
      ) : (
        <div className="videos-container">
          {response.map((item) => (
            <div key={item.id.videoId} className="single-vid-item">
              <p>{item.snippet.title}</p>
              <img
                src={item.snippet.thumbnails.medium.url}
                alt="thumbnail"
                width="400px"
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/watch?v=${item.id.videoId}`
                  )
                }
              />
              <Button
                className="save-btn"
                variant="contained"
                color="primary"
                onClick={() => saveClick(item)}
              >
                Save
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* <h3>{JSON.stringify(response[1])}</h3> */}
    </div>
  )
}
