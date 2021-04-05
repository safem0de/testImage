import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

import { useState, useEffect } from 'react';
const Index = () => {
    useEffect(() => {
        Webcam()
    }, [])
    const [name, setName] = useState('');
    function Webcam() {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(startVideo)
        const video = document.getElementById('video')
        function startVideo() {
            navigator.getUserMedia(
                { video: {
                    width : 500,
                    height : 500
                } },
                stream => video.srcObject = stream,
                err => console.error(err)
            )
        }
        video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video)
            canvas.id = 'test'
            document.body.append(canvas)
            const displaySize = { width: video.width, height: video.height }
            faceapi.matchDimensions(canvas, displaySize)
            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                canvas.getContext('2d').drawImage(video,0,0)
                faceapi.draw.drawDetections(canvas, resizedDetections)
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
            }, 100)
        })
    }

    const takePhoto = () => {
        var canvas = document.getElementById("test");
        var img = canvas.toDataURL("image/png");

        document.write('<img src="'+img+'"/>');
    };

    return (
        <div>
            <body>
                <video id="video" height="500px" width="500px" autoPlay muted />
                <br/>
                <button onClick={() => takePhoto()}>Take a photo</button>
            </body>
        </div>
    )
}

export default Index;