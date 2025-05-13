import type { NextConfig } from "next";

const API_URL = process.env.PUBLIC_API_URL || 'https://openlearn-service.onrender.com' 

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_GET_COURSES: `${API_URL}/api/course/all/`,
    NEXT_PUBLIC_REGISTER: `${API_URL}/api/register/`,
    NEXT_PUBLIC_TOKEN: `${API_URL}/api/token/`,
    NEXT_PUBLIC_REFRESH_TOKEN: `${API_URL}/api/token/refresh/`,
    NEXT_PUBLIC_GET_PROFILE: `${API_URL}/api/profile/`,
    NEXT_PUBLIC_LOG_OUT: `${API_URL}/api/logout/`,
    NEXT_PUBLIC_GET_COURSE: `${API_URL}/api/course/`,
    NEXT_PUBLIC_GET_VIDEOS: `${API_URL}/api/video/all/`,
    NEXT_PUBLIC_GET_VIDEO: `${API_URL}/api/video/`,
    NEXT_PUBLIC_GET_VIDEO_BY_ID: `${API_URL}/api/video/byid/`,
    NEXT_PUBLIC_GET_SEARCH: `${API_URL}/api/search/`,
    NEXT_PUBLIC_POST_SD_COURSE: `${API_URL}/api/saveCouse/`,
    NEXT_PUBLIC_GET_SAVE_COURSE: `${API_URL}/api/save_course_view/`,
    NEXT_PUBLIC_POST_UPDATE_PROFILE: `${API_URL}/api/updateProfile/`,
      },

  // output: 'export',
  // trailingSlash: true, // optional: better for static hosting
  // images: {
  //   unoptimized: true // required for static export if using next/image
  // }
};

export default nextConfig;
