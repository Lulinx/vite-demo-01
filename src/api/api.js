import request from "root/request/request";
import mockData from "root/mock/mock";
const Mock = true;
const baseUrl =
  process.env.NODE_ENV === "production" ? "https://api.apishop.net" : "";
// 天气预报
export const getShopList = (data = {}, callback = "") =>
  Mock
    ? mockData("shop.getShopList")
    : request.post(
      `${baseUrl}/common/weather/get15DaysWeatherByArea`,
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
