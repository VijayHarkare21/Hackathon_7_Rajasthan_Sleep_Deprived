import React from 'react';
// import { Button } from 'react-bootstrap/'
// import { Card } from '@material-ui/core';
// import Col from 'react-bootstrap/Col';
// import axios from 'axios'

// var dict = []; // create an empty array

export const Cards = ({name,description}) => {
        return(

    <div className="max-w-sm rounded overflow-hidden shadow-lg mt-10">
    <img
      className="w-full"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
      alt="Sunset in the mountains"
    />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{name}</div>
    </div>
  </div>
    )
//   <Col xs={12} md={6} lg={4} key={data.id}>
//     <Card style={{ width: '18rem' }}>
//       <Card.Header></Card.Header>
//       <Card.Body>
//         <Card.Title>{dict.title}</Card.Title>
//         <Card.Text>
//           {dict.content}
//         </Card.Text>
//         <Button variant="primary">Add to cart</Button>
//         <Button>Add to favs</Button>
//       </Card.Body>
//     </Card>
//   </Col>
}