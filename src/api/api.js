/*
 * @Author: ws
 * @Date: 2022-01-14 08:52:47
 * @LastEditTime: 2022-01-18 16:22:36
 * @LastEditors: ws
 * @Description: 
 * @FilePath: \vite-demo-01\src\api\api.js
 */
import request from "root/request/request";
import mockData from "root/mock/mock";
const Mock = false;
const baseUrl =
  process.env.NODE_ENV === "production" ? "https://api.apishop.net" : "";
// 狗狗大全
export const dogFamily = (data = {}, callback = "") =>
  Mock
    ? mockData("dogFamily")
    : request.post(
      `${baseUrl}/common/dogFamily/queryDogListByKeyword`,
      data,
      callback
    );

export const searchDreamDetail = (data = {}, callback = "") =>
  Mock
    ? mockData("searchDreamDetail")
    : request.post(
      `${baseUrl}/common/dream/searchDreamDetail`,
      data,
      callback
    );

export const getTestSQL = (data = {}, callback = "") =>
  Mock
    ? mockData("getTestSQL")
    : request.post(
      `${baseUrl}/testApi/getTestSQL`,
      data,
      callback
    );
export const deletePerson = (data = {}, callback = "") =>
  Mock
    ? mockData("deletePerson")
    : request.post(
      `${baseUrl}/testApi/deletePerson`,
      data,
      callback
    );

