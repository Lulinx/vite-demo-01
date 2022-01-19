/*
 * @Author: ws
 * @Date: 2022-01-14 08:52:47
 * @LastEditTime: 2022-01-19 16:24:35
 * @LastEditors: ws
 * @Description: 
 * @FilePath: \vite-demo-01\src\api\api.js
 */
import request from "root/request/request";
import mockData from "root/mock/mock";
const Mock = false;
// 狗狗大全
export const dogFamily = (data = {}, callback = "") =>
  Mock
    ? mockData("dogFamily")
    : request.post(
      `/common/dogFamily/queryDogListByKeyword`,
      data,
      callback
    );

export const searchDreamDetail = (data = {}, callback = "") =>
  Mock
    ? mockData("searchDreamDetail")
    : request.post(
      `/common/dream/searchDreamDetail`,
      data,
      callback
    );

export const getTestSQL = (data = {}, callback = "") =>
  Mock
    ? mockData("getTestSQL")
    : request.post(
      `/testApi/getTestSQL`,
      data,
      callback
    );
export const deletePerson = (data = {}, callback = "") =>
  Mock
    ? mockData("deletePerson")
    : request.post(
      `/testApi/deletePerson`,
      data,
      callback
    );
export const addPersonInfo = (data = {}, callback = "") =>
  Mock
    ? mockData("addPersonInfo")
    : request.post(
      `/testApi/addPersonInfo`,
      data,
      callback
    );

