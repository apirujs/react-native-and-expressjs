import { View, Text } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './StyleSheet.js';

const Home = () => {
  const [count, setCount] = useState(0);

  // controls if media input is on or off
  const [playing, setPlaying] = useState(false);

  // controls the current stream value
  const [stream, setStream] = useState(null);

  // controls if audio/video is on or off (seperately from each other)
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  // controls the video DOM element
  const webcamVideo = useRef();

  const canvas = useRef();

  // get the user's media stream
  const startStream = async () => {
    let newStream = await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((newStream) => {
        webcamVideo.current.srcObject = newStream;
        setStream(newStream);
      });

    setPlaying(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    if (stream == null) return;
    //console.log("Prosessing...");
    const track = stream.getVideoTracks()[0];
    const context = canvas.current.getContext("2d");
    let width = track.getSettings().width, height = track.getSettings().height;
    if (height && width) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(webcamVideo.current, 0, 0, 0, 0);

      //const data = canvas.toDataURL("image/png");
      //photo.setAttribute("src", data);
    }


    console.log("h:" + track.getSettings().height);
    console.log("w:" + track.getSettings().width);
  }, [count]);

  // stops the user's media stream
  const stopStream = () => {
    stream.getTracks().forEach((track) => track.stop());

    setPlaying(false);
  };

  // enable/disable audio tracks in the media stream
  const toggleAudio = () => {
    setAudio(!audio);
    stream.getAudioTracks()[0].enabled = audio;
  };

  // enable/disable video tracks in the media stream
  const toggleVideo = () => {
    setVideo(!video);
    stream.getVideoTracks()[0].enabled = !video;
  };

  return (
    <div className="container">
      <video style={{ width: 640, height: 480 }} ref={webcamVideo} autoPlay playsInline></video>
      <canvas style={{ width: 640, height: 480 }} ref={canvas}></canvas>
      <button
        onClick={playing ? stopStream : startStream}>
        Start webcam
      </button>

      <button onClick={toggleAudio}>Toggle Sound</button>
      <button onClick={toggleVideo}>Toggle Video</button>
    </div>
  );






  /*return (
    <View style={styles.container}>
      <video id="video" ref={videoTag}></video>
      <Text style={styles.heading}>hello world!</Text>
      <Text style={styles.description}>This is a simple webpage built with React Native Web.</Text>
      <Link to="/contact" style={styles.link}>Go to Contact Page</Link>
    </View>
  );*/
}

export default Home;