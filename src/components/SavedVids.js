import React, { useState } from "react"
import ModalVideo from "react-modal-video"
import Button from "@material-ui/core/Button"
import "react-modal-video/scss/modal-video.scss"
import he from "he"

export default function SavedVids(props) {
  const [isOpen, setOpen] = useState(false)
  const [vidId, setVidId] = useState("")

  const modalHandle = (id) => {
    setOpen(true)
    setVidId(id)
  }

  return (
    <div className="videos-container">
      <ModalVideo
        channel="youtube"
        youtube={{
          autoplay: 1,
          mute: 1,
        }}
        isOpen={isOpen}
        videoId={vidId}
        onClose={() => setOpen(false)}
      />
      {props.saved.map((item) => (
        <div key={item.id.videoId} className="single-vid-item">
          <p style={{ width: "250px" }}>{he.decode(item.snippet.title)}</p>
          <img
            className="btn-primary"
            src={item.snippet.thumbnails.medium.url}
            alt="thumbnail"
            width="250px"
            onClick={() => modalHandle(item.id.videoId)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.delete(item.id.videoId)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  )
}
