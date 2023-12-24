import React, { useState, useEffect } from 'react';
import AllUser from "./AllUser";
import AllPost from "./AllPost";
import { Container } from "@material-ui/core";
import Chart from './Chart';


const Admin = () => (
  
  
  <Container>
    <Chart/>
    <AllUser/>
    <AllPost/>

  </Container>
  
);

export default Admin;
