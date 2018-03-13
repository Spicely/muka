import lang from '../lang'

const verify = {
    // 金额验证
    isAmount: function (value: string): boolean {
        return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
    },
    // 银行卡验证
    isBack: function (value: string): boolean {
        return /^\d{16,19}$/.test(value)
    },
    // 邮箱验证
    isEmail: function (value: string): boolean {
        return /([a-zA-Z0-9]+[_|\\_|\\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$/.test(value)
    },
    // 电话验证
    isMobile: function (value: string): boolean {
        return /(\\+86)?1[34578]\\d{9}$/.test(value)
    }
}
export default verify
