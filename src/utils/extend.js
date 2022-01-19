/*
 * @Author: ws
 * @Date: 2022-01-14 08:52:47
 * @LastEditTime: 2022-01-19 15:01:26
 * @LastEditors: ws
 * @Description: 工具类API.js
 * @FilePath: \vite-demo-01\src\utils\extend.js
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
export function showToast() {
  if (arguments[1] === undefined) {
    return Toast(arguments[0]);
  } else {
    return Toast[arguments[0]](arguments[1]);
  }
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
export function dateFormat(current, dateType) {
  return moment(current).format(dateType);
}