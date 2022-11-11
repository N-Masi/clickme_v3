import React, {useState, useEffect} from 'react';
import { ReactPainter } from 'react-painter';
import imagepath from '../images/9_001.JPEG';

const ml5 = window.ml5;
let classifier;

const Canvas = (blob) => {

    useEffect(() => {

        const options = {
            task: 'classification'
        }

        const nn = ml5.neuralNetwork(options);
        const modelDetails = {
            model: 'models/model.json',
            weights: 'https://clickmev2-70600.web.app/models/group1-shard1of1.bin'
        }

        nn.load(modelDetails, modelLoaded)

        function modelLoaded() {
            nn.classify(document.getElementById('maskedImageToPredict'), (err, results) => {
                console.log("error:", err);
                document.getElementById('predictionText0').textContent = results[0].label
                document.getElementById('predictionText1').textContent = results[1].label
                document.getElementById('predictionText2').textContent = results[2].label
        });
}

    })

    // const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // function modelLoaded() {
    //     console.log('Model Loaded!');
    //   }

    const [maskedImgPath, setMaskedImgPath] = useState("");

    const saveFunc = (blob) => {
        console.log(blob)
        setMaskedImgPath(URL.createObjectURL(blob))
        classifier.classify(document.getElementById('maskedImageToPredict'), (err, results) => {
            document.getElementById('predictionText0').textContent = results[0].label
            document.getElementById('predictionText1').textContent = results[1].label
            document.getElementById('predictionText2').textContent = results[2].label
        });
    }

    return (
        <React.Fragment>
            <ReactPainter
                width={1000}
                image={imagepath}
                initialColor={"#fff2"}
                initialLineWidth={30}
                onSave={blob => saveFunc(blob)}
                render={({ triggerSave, canvas }) => (
                <div>
                    <button onClick={triggerSave}>Mask + Predict</button>
                    <div>{canvas}</div>
                </div>
                )}
            />
            <img src={maskedImgPath} id='maskedImageToPredict'/>
        </React.Fragment>
    )

}

export default Canvas;