import isFunc from '../type/isFunc'

export interface IPublicConfig {
    appId: string
    timeStamp: string
    nonceStr: string
    package: string
    signType: string
    paySign: string
}

export interface IConfig {
    config: IPublicConfig
    cbConfig: {
        ok?: () => void
        cancel?: () => void
        fail?: () => void
        other?: () => void
    }
}

interface IWindow extends Window {
    WeixinJSBridge?: {
        invoke: (uri: string, config: IPublicConfig, callback: (res: IWXRes) => void) => void
    }
}

interface IWXRes {
    err_msg: 'get_brand_wcpay_request:ok' | 'get_brand_wcpay_request:cancel' | 'get_brand_wcpay_request:fail'
}

const wxPay = (config: IConfig) => {
    const global: IWindow = window
    if (typeof global.WeixinJSBridge === 'undefined') {
        document.addEventListener('WeixinJSBridgeReady', () => { apiCall(config) }, false)
    } else {
        apiCall(config)
    }
}

function apiCall(config: IConfig) {
    const global: IWindow = window
    if (global.WeixinJSBridge) {
        global.WeixinJSBridge.invoke('getBrandWCPayRequest', config.config, (res: IWXRes) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
                // 支付成功
                if (isFunc(config.cbConfig.ok)) {
                    config.cbConfig.ok()
                }
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                // 用户取消
                if (isFunc(config.cbConfig.cancel)) {
                    config.cbConfig.cancel()
                }
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                // 支付失败
                if (isFunc(config.cbConfig.fail)) {
                    config.cbConfig.fail()
                }
            } else {
                // 其他
                if (isFunc(config.cbConfig.other)) {
                    config.cbConfig.other()
                }
            }
        })
    }
}

export default wxPay