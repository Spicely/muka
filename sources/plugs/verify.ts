const verify = {
    // 金额验证
    isAmount: (value: string): boolean => {
        return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
    },
    // 银行卡验证
    isBack: (value: string): boolean => {
        return /^\d{16,19}$/.test(value)
    },
    // 邮箱验证
    isEmail: (value: string): boolean => {
        return /([a-zA-Z0-9]+[_|\\_|\\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$/.test(value)
    },
    // 电话验证
    isMobile: (value: string): boolean => {
        return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)
    },
    // 判断是否为base64
    isBase64: (value: any) => {
        return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(value)
    },
    // 判断是否为身份证
    isIDCard: (value: string) => {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
    }
}
export default verify
