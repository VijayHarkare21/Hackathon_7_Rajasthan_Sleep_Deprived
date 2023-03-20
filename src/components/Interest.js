import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Link } from "react-router-dom";
import background from "../assets/bg3.jpg"

const questions = ["1. What do you find most interesting about your work or field?",
    "2. How do you stay up to date with new developments in your industry?",
    "3. Are there any particular skills or areas of knowledge that you feel like you would benefit from learning more about?",
    "4. What are some of the biggest challenges you face in your work, and how do you approach solving them?",
    "5. Are there any hobbies or interests that you have that you would like to learn more about?",
    "6. What do you see as your long-term career goals, and how do you plan to achieve them?",
    "7. Are there any new technologies or tools that you have been interested in learning more about",
    "8. What are some of the things you wish you had more time to learn or explore?",
    "9. Are there any particular topics or areas of study that you are passionate about?",
    "10. How have you pursued learning or professional development in the past, and what did you enjoy most about those experiences?",
]

const Interest = () => {
    const [responses, setResponses] = useState(() => new Array(questions.length));
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    let questionsList = [];

    questions.forEach((question, index) => {
        questionsList.push(<li key={index}>{question}</li>);
      });
    
      const myStyle={
        backgroundImage: `url(${background})`,
        // height:'100vh',
        // marginTop:'-70px',
        // fontSize:'50px',
        width: '100vw',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    return (
    <div style={myStyle}>
    <form onSubmit={async (e) => {
        e.preventDefault();
        // const axios = require('axios');
        const FormData = require('form-data');
        let data = new FormData();
        data.append('num_questions', '10');
        // for (let i = 0; i < 10; i++)
        // {
        //     data.append('q1', responses[i]);
        // }
        data.append('q1', responses[0]);
        data.append('q2', responses[1]);
        data.append('q3', responses[2]);
        data.append('q4', responses[3]);
        data.append('q5', responses[4]);
        data.append('q6', responses[5]);
        data.append('q7', responses[6]);
        data.append('q8', responses[7]);
        data.append('q9', responses[8]);
        data.append('q10', responses[9]);
        // data.append('q1', 'I am very good in computer science and artificial intelligence');
        // data.append('q2', 'I like computer science, robotics, public speaking and am very good at computing');

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/utility/register_form/',
        headers: {},
        data : data
        };

        axios(config)
        .then((response) => {
            if (response.status === 200) {
                setSuccess(true);
                console.log("success");
              }
        console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
        console.log(error);
        });

        // responses array has all the responses
        // const data =  await axios.post();
        navigate(
            "/courses",
            {
                // state: data
            }
        )
    }}>
    <div className="text-center p-10 font-bold text-5xl">
        <label className="max-w-[200px] text-center border p-12 w-full my-5 py-2 text-white justify-center rounded-lg">
            Interest Form
        </label>
    </div>
    <div>   
    {/* <ul>{questionsList}</ul> */}
    {questions.map((question, i) => (
            <h1 className="flex flex-col p-8">
                <ul key={i} className="font-semibold text-2xl">{question}</ul>
            <textarea rows="12" cols="50" className="max-w-[1400px] border p-2 hover:border-blue-400 rounded-lg" value={responses[i]} onChange={(e) => {
                setResponses(res => {
                    const newRes = [...res];
                    newRes[i] = e.target.value;
                    return newRes;
                })
            }}></textarea>
            </h1>
            ))}
    </div>
    <div className="text-center">
            {success ?(
            <Link to="/courses">
            <button type="submit"
            className="max-w-[200px] text-center border w-full my-5 py-2 bg-blue-600 text-white justify-center">Submit
            </button></Link>) : (
            <button type="submit"
            className="max-w-[200px] text-center border w-full my-5 py-2 bg-blue-600 text-white justify-center">Submit
            </button>
            )}
    </div>
    </form>
    </div>
    );
}

export default Interest;