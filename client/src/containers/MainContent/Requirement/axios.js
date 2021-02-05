
import axios from 'axios';




export const getClaimPeriod = () => {
    // const { company_registration_number } = params;
    axios
      .get(
        `http://localhost:4000/Employee`,
      )
      .then((response) => {
          console.log("test", response)
        // callback(true, response.data.data);
      })
      .catch((e) => {
       console.log("catch",e)
      });
  };
  

  