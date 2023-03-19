import React, { useState } from "react";

const Courses = () => {
  const [readMore, setReadMore] = useState(false);
  const [readMore1, setReadMore1] = useState(false);
  const linkName = readMore ? "Show Less << " : "Show More >> ";
  const linkName1 = readMore1 ? "Show Less << " : "Show More >> ";
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
