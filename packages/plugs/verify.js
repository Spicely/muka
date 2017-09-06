const verify = {
    // 金额验证
    amount: function (value) {
        return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
    }
}
export default verify
