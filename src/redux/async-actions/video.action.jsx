import { toast } from "react-toastify"
import VideoServices from "../../services/video.services"

export const updateVideoURL = (url) => {
   VideoServices.updateVideoURL(url)
      .then(res => toast.success(res.data.message))
      .catch(err => toast.error(err.response.data.message))
}
