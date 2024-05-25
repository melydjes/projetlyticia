import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
import '../Navbar/Navbar.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import likeIcon from '../../assets/like.png';
import dislikeIcon from '../../assets/dislike.png';
import shareIcon from '../../assets/share.png';
import subscribeIcon from '../../assets/subscriprion.png';

const PlayVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRef = doc(db, "videos", videoId);
        const videoDoc = await getDoc(videoRef);
        if (videoDoc.exists()) {
          setVideo(videoDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching video: ", error);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className='play-video'>
      <div className='video-wrapper'>
        <video src={video.videoURL} controls autoPlay muted />
      </div>
      <h3>{video.title}</h3>
      <div className='play-video-info'>
        <span>Uploaded by: {video.username}</span>
      </div>
      <div className='video-actions'>
        <button className='like-button'>
          <img src={likeIcon} alt="Like" />
        </button>
        <button className='dislike-button'>
          <img src={dislikeIcon} alt="Dislike" />
        </button>
        <button className='share-button'>
          <img src={shareIcon} alt="Share" />
        </button>
        <button className='subscribe-button'>
          <img src={subscribeIcon} alt="Subscribe" />
        </button>
      </div>
      <hr />
      <div className='publisher'>
        <img src={video.thumbnailURL} alt={video.username} />
        <div>
          <p>{video.username}</p>
          
        </div>
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default PlayVideo;