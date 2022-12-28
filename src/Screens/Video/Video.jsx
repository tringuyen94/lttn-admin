import React, { useEffect, useState } from "react"
import { Button, Container, TextField } from "@material-ui/core"
import { updateVideoURL } from "../../redux/async-actions/video.action"
import videoServices from "../../services/video.services"
const Video = () => {
   const [videoURL, setVideoURL] = useState('')
   const handleChange = e => {
      setVideoURL(e.target.value)
   }
   const handleSubmit = () => {
      if (videoURL === '') return
      updateVideoURL(videoURL)
   }
   const fetchUrl = async () => {
      const res = await videoServices.fetchVideoURL()
      setVideoURL(res.data[0].videoUrl)
   }

   useEffect(() => {
      fetchUrl()
   }, [])
   return (
      <Container maxWidth="md">
         <TextField fullWidth
            variant='filled'
            value={videoURL ? videoURL : null}
            onChange={handleChange} />
         <Button style={{ marginTop: "20px" }} fullWidth variant="contained" color='primary' onClick={handleSubmit}>Thay đổi URL</Button>
      </Container>

   )
}

export default Video