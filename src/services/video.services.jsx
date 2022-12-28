import { restConnector } from "./baseURL.services";
class VideoServices {
   updateVideoURL(videoUrl) {
      return restConnector({
         url: '/api/video/updateURL',
         method: "POST",
         data: { videoUrl }
      })
   }
   fetchVideoURL() {
      return restConnector({
         url: '/api/video/getURL',
         method: "GET"
      })
   }

}
export default new VideoServices()