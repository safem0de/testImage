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
<<<<<<< HEAD
                { video: {width:500,height:500} },
=======
                { video: {
                    width : 500,
                    height : 500
                } },
>>>>>>> 492c2c382facf1eef837df1d7327a23841b051bd
                stream => video.srcObject = stream,
                err => console.error(err)
            )
        }
<<<<<<< HEAD
        video.addEventListener('play', (e) => {
            e.preventDefault();
            var selection = document.querySelector('canvas') === null;
            if (selection) {
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
=======
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
>>>>>>> 492c2c382facf1eef837df1d7327a23841b051bd
        })
    }

    const takePhoto = () => {
        var canvas = document.getElementById("test");
        var img = canvas.toDataURL("image/png");

        document.write('<img src="'+img+'"/>');
    };

    return (
        <div>
<<<<<<< HEAD
            <body id="body">
                <video id="video" height="500" width="500" autoPlay muted />
                <br/>
                <button onClick={()=> takePhoto('test',x,y,w,h)}>take Photo</button>
=======
            <body>
                <video id="video" height="500px" width="500px" autoPlay muted />
                <br/>
                <button onClick={() => takePhoto()}>Take a photo</button>
>>>>>>> 492c2c382facf1eef837df1d7327a23841b051bd
            </body>
        </div>
    )
}


function takePhoto(x_val,c_x,c_y,c_w,c_h){
    var canvas = document.getElementById(x_val)
    var data = canvas.toDataURL('image/png');

    var img = document.createElement("img");
    img.src = data;
    var src = document.querySelector('body')
    src.appendChild(img);
}

export default Index;