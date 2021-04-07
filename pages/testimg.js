import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

import { useState, useEffect } from 'react';

const Index = () => {
    useEffect(() => {
        Webcam()
    }, [])
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
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

        video.addEventListener('play', (e) => {
            e.preventDefault();
            var selection = document.querySelector('canvas') === null;
            var sel_z = selection.id === 'test';
            console.log(sel_z)
            if (selection) {
                const canvas = faceapi.createCanvasFromMedia(video)
                canvas.id = 'test'
                document.getElementById('main').appendChild(canvas)
                const displaySize = { width: video.width, height: video.height }
                faceapi.matchDimensions(canvas, displaySize)
                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                    const resizedDetections = faceapi.resizeResults(detections, displaySize)
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                    canvas.getContext('2d').drawImage(video,0,0)
                    faceapi.draw.drawDetections(canvas, resizedDetections)
                    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
                    if (resizedDetections[0] !== undefined){
                        // console.log(resizedDetections[0]['detection']['_box']['_x'])
                        setX(resizedDetections[0]['detection']['_box']['_x'])
                        setY(resizedDetections[0]['detection']['_box']['_y'])
                        setW(resizedDetections[0]['detection']['_box']['_width'])
                        setH(resizedDetections[0]['detection']['_box']['_height'])
                        // document.querySelector('button').setAttribute()
                    }
                }, 100)
            }
        })
    }

    return (
        <div id='main'>
                <video id="video" height="500" width="500" autoPlay muted />
                <br/>
                <button onClick={()=> takePhoto('test',x,y,w,h)}>take Photo</button>
                <br/>
        </div>
    )
}


function takePhoto(x_val,c_x,c_y,c_w,c_h){
    // var canvas = document.getElementById(x_val)
    // var data = canvas.toDataURL('image/png');

    // var img = document.createElement("img");
    // img.src = data;
    // var src = document.querySelector('body')
    // src.appendChild(img);
}

export default Index;