import { request } from '../../utils/call-api.util/call-api.util';
import * as interfaces  from '../../interfaces';

export const getMarks = async () => {
  return request<{ marks: interfaces.mark.IMark[] }>({
    path: `dev/get-entry-and-exit-marks`,
    method: 'get',
  });
};

export const createMark = async (mark: interfaces.mark.ICreateMark) => {
  return request<any>({
    path: `dev/`,
    method: 'post',
		body: { ...mark }
  });
};
