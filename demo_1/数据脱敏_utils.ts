/**
 * 数据脱敏工具类
 */
export class Desensitization {
  /**
   * 数据脱敏通用函数
   * @param str 脱敏数据 
   * @param beginLen 起始保留长度 默认0
   * @param endLen 结尾保留长度 默认0
   * @returns {string}
   */
  static dataCommon(str: string, beginLen=0, endLen=0): string {
    let len = str.length
    let firstStr = str.slice(0,beginLen)
    let lastStr = str.slice(len-endLen)
    let middleStr = str.substring(beginLen, len-Math.abs(endLen)).replace(/[\s\S]/ig, '*')
    let tempStr = firstStr + middleStr + lastStr
    return tempStr
  }

  /**
   * 名字脱敏 保留首位
   * @param fullName
   * @returns {string}
   */
  static userName(name: string) {
    if(!name) return ''
    return Desensitization.dataCommon(name, 1)
  }

  /**
   * 手机号脱敏
   * @param phone
   * @returns {string}
   */
  static phoneNumber(phone: string) {
    if(!phone) return ''
    return Desensitization.dataCommon(phone, 3, 4)
  }

  /**
   * 身份证号脱敏
   * @param idNo
   * @returns {string}
   */
  static idNumber(idNo: string) {
    if(!idNo) return ''
    return Desensitization.dataCommon(idNo, 6, 3)
  }

  /**
   * 地址脱敏
   * @param addr
   * @returns {string}
   */
  static address(addr: string) {
    if(!addr) return ''
    return Desensitization.dataCommon(addr, 9)
  }

  /**
   * 邮箱脱敏
   * @param str
   * @returns {string}
   */
  static email(str: string) {
    if(!str) return ''
    return Desensitization.dataCommon(str, 6, 4)
  }

}