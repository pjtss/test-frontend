import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer() {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    const hls = new Hls();
    hls.loadSource("http://localhost:8080/videos/1/101/2025-03-30/live.m3u8");
    hls.attachMedia(video);
    return () => {
      hls.destroy();
    };
  }, []);

  return <video ref={videoRef} controls style={{ width: "30%" }} />;
}
