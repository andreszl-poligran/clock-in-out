import { request } from '../../utils/call-api.util/call-api.util'; // Import request function from call-api.util
import * as interfaces  from '../../interfaces'; // Import interfaces

// Function to fetch marks from the API
export const getMarks = async () => {
  return request<{ marks: interfaces.mark.IMark[] }>({ // Make a GET request to retrieve marks
    path: `dev/get-entry-and-exit-marks`, // API endpoint for fetching marks
    method: 'get', // HTTP method: GET
  });
};

// Function to create a new mark
export const createMark = async (mark: interfaces.mark.ICreateMark) => {
  return request<any>({ // Make a POST request to create a mark
    path: `dev/`, // API endpoint for creating a mark
    method: 'post', // HTTP method: POST
    body: { ...mark } // Request body containing mark data
  });
};
