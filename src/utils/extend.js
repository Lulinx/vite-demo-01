/*
 * @Author: ws
 * @Date: 2022-01-14 08:52:47
 * @LastEditTime: 2022-01-17 18:00:10
 * @LastEditors: ws
 * @Description: 工具类API.js
 * @FilePath: \myDemo\vite-demo-01\src\utils\extend.js
 */
import { Toast } from "vant";
import { create, all } from 'mathjs'
const config = {
    epsilon: 1e-12,
    matrix: 'Matrix',
    number: 'BigNumber', // 可选值：number BigNumber
    precision: 64,
    predictable: false,
    randomSeed: null
}
const math = create(all, config);

export function showToast(message) {
  return Toast(message);
}
/**
 * @description: 
 * @param {Number} num1
 * @param {Number} num2
 * @param {String} symbol
 * @return {String}
 */
 export function mathJsCalc([num1 = "", num2 = ""], symbol = "+") {
  const MathCompMap = {
      "+": math.format(math.add(math.bignumber(num1), math.bignumber(num2))), // 3.3
      "-": math.format(math.subtract(math.bignumber(num1), math.bignumber(num2))),
      "*": math.format(math.multiply(math.bignumber(num1), math.bignumber(num2))),
      "/": math.format(math.divide(math.bignumber(num1), math.bignumber(num2))),
  }
  return MathCompMap[symbol];
}