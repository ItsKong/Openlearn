import type { NextConfig } from "next";

const API_URL = process.env.PUBLIC_API_URL || 'http://127.0.0.1:8000' 

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_GET_COURSES: `${API_URL}/api/course/all/`
  }
};

export default nextConfig;
