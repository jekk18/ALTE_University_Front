import axios from "axios";


async function Submission(data) { 
      const response = await axios.postForm(`${process.env.NEXT_PUBLIC_SERVER_URL}/submission`, data );
      return response.data; 
  }


  export {Submission}
