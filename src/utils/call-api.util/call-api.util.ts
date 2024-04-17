import axios, { AxiosRequestConfig } from 'axios';

// Interface defining the structure of request options
interface RequestOptions {
  path: string; // Endpoint path
  method: 'get' | 'post' | 'put' | 'delete'; // HTTP method
  headers?: Record<string, string>; // Optional custom headers
  body?: any; // Request body
  host?: string; // Optional host URL
}

// Function to make HTTP requests
export const request = async <T>(options: RequestOptions): Promise<T> => {
  // Destructure request options
  const { path, method, headers: customHeaders, body, host } = options;

  // Prepare axios request configuration
  const axiosConfig: AxiosRequestConfig = {
    method, // HTTP method
    url: `${host || import.meta.env.VITE_CLOCK_IN_OUT_API || ''}/${path}`, // Full request URL
    headers: customHeaders ? { ...customHeaders } : {}, // Custom headers
    data: body, // Request body
  };

  try {
    // Send request using axios
    const response = await axios(axiosConfig);
    // Return response data
    return response.data as T;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // If response exists, but request failed
      throw new Error(`HTTP request failed with status: ${error.response.status}`);
    } else if (error.request) {
      // If no response received from server
      throw new Error('No response received from server');
    } else {
      // Other request setup errors
      throw new Error(`HTTP request setup error: ${error.message}`);
    }
  }
};
