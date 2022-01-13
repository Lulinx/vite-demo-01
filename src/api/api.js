import request from "root/request/request";
import mockData from "root/mock/mock";
const Mock = false;
export const getShopList = (data = {}, callback = "") =>
  Mock
    ? mockData("shop.getShopList")
    : request.post(
        "/api/common/weather/get15DaysWeatherByArea",
        data,
        callback
      );
