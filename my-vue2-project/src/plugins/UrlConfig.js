import { user_shared } from './User.js';

class UrlConfig {

    baseUrlList = [
        { region: "cn", url: "https://cn.freqtek.com" },
        { region: "eu", url: "https://eu.freqtek.com" },
        { region: "in", url: "https://in.freqtek.com" },
        { region: "en", url: "https://en.freqtek.com" },
    ];

    getBaseUrl() {
        const region = user_shared.region;

        if (!region) {
            return this.baseUrlList[0].url;
        }

        const match = this.baseUrlList.find(item => item.region === region);
        return match ? match.url : this.baseUrlList[0].url;
    }

    apiHostUrl() {
        return `${this.getBaseUrl()}/common/services`;
    }

    userTokenUrl() {
        return `${this.getBaseUrl()}/user/token`;
    }

}

export const url_config_shared = new UrlConfig();