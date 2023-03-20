import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import axios from 'axios'
// import React from 'react';

import Row from 'react-bootstrap/Row';
// import {data} from '../../../data'

import { Cards }  from './Cards';

// import styles from './Shop.module.scss';

var dict = []; // create an empty array

const Courses = () => {
  const [readMore, setReadMore] = useState(false);
  const [readMore1, setReadMore1] = useState(false);
  // const [card, setCard] = useState([]);
  // const { state } = useLocation();
  const linkName = readMore ? "Show Less << " : "Show More >> ";
  const linkName1 = readMore1 ? "Show Less << " : "Show More >> ";
  // const axios = require('axios');
  const FormData = require('form-data');
  let data = new FormData();
  data.append('send', '1');

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:8000/utility/course_rec/',
    headers: {},
    data : data
  };

  axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    // console.log(JSON.stringify(JSON.stringify(response.data)));
    const values = Object.values(response.data)
    for(let i=0;i<10;i++){
      dict.push({
        name: values[i][1],
        description: values[i][2]
      });
    } 
    console.log(dict)

    
  })
  .catch((error) => {
    console.log(error);
  });

  const extraContent = (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10 ml-10">
      <img
        className="w-full"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
      </div>
    </div>
  );
  const extraContent1 = (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10 ml-10">
      <img
        className="w-full"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
      </div>
    </div>
  );
  return (
    <>
      <div className="m-10">
        <h1 className="text-4xl">Recommended Courses</h1>
        <div className="grid grid-cols-3 gap-4">
{/* {dict.map((post, i)=>{  */}
  {/* return( */}
    <div className='row-wrapper'>
        <Row>
           {
           dict.map((product, index) => {
            return(
            <Cards key={index} {...product} />
            )
            })
          }  
        </Row>
      </div>
  {/* ) */}
  {/* // console.log('post');
  // console.log(post); */}
  
{/* // })} */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10">
            <img
              className="w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10">
            <img
              className="w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10">
            <img
              className="w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            </div>
          </div>
        </div>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right mr-10" onClick={()=>{setReadMore(!readMore)}}><h2>{linkName}</h2></button>
      {readMore && extraContent}

      <div className="m-10">
        <h1 className="text-4xl">Ongoing Courses</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10">
            <img
              className="w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10">
            <img
              className="w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10">
            <img
              className="w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            </div>
          </div>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right mr-10" onClick={()=>{setReadMore1(!readMore1)}}><h2>{linkName1}</h2></button>
      {readMore1 && extraContent1}
    </>
  );
};

export default Courses;
