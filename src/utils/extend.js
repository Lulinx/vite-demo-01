/*
 * @Author: ws
 * @Date: 2022-01-14 08:52:47
 * @LastEditTime: 2022-01-17 20:19:31
 * @LastEditors: ws
 * @Description: 工具类API.js
 * @FilePath: \vite-demo-pce:\code\vue\vite-demo-01\src\utils\extend.js
 */
import { Toast } from "vant";
import { create, all } from 'mathjs'
import moment from "moment";
const config = {
    epsilon: 1e-12,
    matrix: 'Matrix',
    number: 'BigNumber', // 可选值：number BigNumber
    precision: 64,
    predictable: false,
    randomSeed: null
}
const math = create(all, config);

/**
 * @description: 提示toast
 * @param {String} message --提示内容
 * @return {Vnode} Toast
 */
export function showToast(message) {
  return Toast(message);
}
/**
 * @description: 解决小数计算不精确的问题
 * @param {Number} num1
 * @param {Number} num2
 * @param {String} symbol
 * @return {String}
 */
 export function mathJsCalc([num1 = "", num2 = ""], symbol = "+") {
  const MathCompMap = {
      "+": math.format(math.add(math.bignumber(num1), math.bignumber(num2))),
      "-": math.format(math.subtract(math.bignumber(num1), math.bignumber(num2))),
      "*": math.format(math.multiply(math.bignumber(num1), math.bignumber(num2))),
      "/": math.format(math.divide(math.bignumber(num1), math.bignumber(num2))),
  }
  return MathCompMap[symbol];
}

/**
 * @description: 
 * @param {String} current --当前时间
 * @param {String} dateType --格式化日期格式("YYYY-MM-DD HH:mm:ss")
 * @return {String}
 */
export function dateFormat(current, dateType){
  return moment(current).format(dateType);
}