import React, { useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai'

import * as ml5 from 'ml5';

const ImageIQ = () => {
    const [predictionsArr, setPredictionsArr] = useState([]);
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState('');


    const handleReload = () => {

        const reloadClass = {
            button: 'animate-bounce',
            icon: 'animate-spin',
        }
        setReload(reloadClass);
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    const classifyImg = () => {
        // ML5 1
        // Initialize the Image Classifier method with MobileNet
        const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
        // When the model is loaded
        function modelLoaded() {
            console.log('Model Loaded!');
        }

        // Put the image to classify inside a variable
        const image = document.getElementById('image');

        // ML5 2
        // Make a prediction with a selected image
        classifier
            // .predict(image, 3, function(err, results) {
            .classify(image, 3, function (err, results) {
                // Return the results
                return results;
            })
            .then(results => {
                // Set the predictions in the state
                setPredictionsArr(results);
                setIsLoading(false);
            });
    };


    // useEffect(() => {
    //     inputRef.current.focus();
    // }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.target;
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?expiration=6000&key=1269e2b651697f814fce85ad1dd33f7f`;
        fetch(url, {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
            .then(data => {
                const img = data.data.url
                setImageURL(img);
                if (img) {
                    classifyImg();
                }
            })
    };



    let predictions = predictionsArr.map((pred, i) => {
        return (
            <div className='px-10 hover:scale-105 duration-75 border rounded-xl py-5' key={i}>
                <p className='text-xl font-semibold'>
                    Prediction {i + 1}: {pred.label}
                </p>
                <p>Confidence: {Math.floor(pred.confidence * 10000) / 100}%</p>
                <progress className='w-full progress progress-primary ' value={Math.floor(pred.confidence * 10000) / 100} max='100'></progress>
            </div>
        );
    });

    return (
        <div className="">
            <div className=" rounded-xl  w-full shadow-xl bg-base-100">
                <div className="">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label htmlFor="image-to-identify" className="label">
                                <span className="label-text font-semibold">Insert image</span>
                            </label>
                            <input
                                // ref={inputRef}
                                accept='image/*'
                                type="file"
                                name="image"
                                // onChange={handleInputChange}
                                required placeholder="paste your image url here" className="file-input file-input-bordered file-input-secondary" />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                // disabled={isSubmitDisabled}
                                type='submit'
                                className="btn bg-gradient-to-tl from-primary to-secondary border-[0] text-white">Enter</button>
                        </div>
                        <div>
                            <div className="card bg-base-100 shadow-xl">
                                <figure>
                                    <img
                                        crossOrigin="anonymous"
                                        // src={'https://cors-anywhere.herokuapp.com/' + imageURL}
                                        src={imageURL}
                                        id="image"
                                        width='60%'
                                        alt=""
                                    />
                                </figure>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='flex items-center justify-center py-10'>
                    {
                        isLoading ?
                            <progress className="progress w-56"></progress>
                            :

                            null

                    }
                    {
                        predictionsArr.length > 0
                            ?
                            <div className='grid grid-cols-1 gap-3 justify-items-center'>
                                {predictions}
                                <div>
                                    <button onClick={handleReload} className={`btn   btn-circle bg-gradient-to-tl from-primary to-secondary text-white border-0 shadow-xl hover:scale-110 duration-75`}><AiOutlineReload className={`${reload?.icon}`} size={30} /></button>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    );
};

export default ImageIQ;