import axios from 'axios';
import { urlConfigShared } from '@/plugins/UrlConfig.js';

class LoginTool {

  constructor(baseURL = '/') {
    this.http = axios.create({
      baseURL,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async login(username, password, captcha, mode, onSuccess, onError) {

    try {

      var dataBody = {}
      dataBody.username = username;
      if (password) {
        dataBody.password = password;
      } else if (captcha) {
        dataBody.code = captcha;
      }
      dataBody.loginModule = mode;
      console.log("dataBody: " + JSON.stringify(dataBody, null, 2));

      const urlString = urlConfigShared.userTokenUrl();
      console.log("urlString: " + urlString);

      const response = await this.http.post(urlString, dataBody);
      console.log("response.statue: " + response.status);

      if (
        response.status === 200 &&
        response.headers['content-type']?.includes('application/json') &&
        response.data.success &&
        response.data.data
      ) {
        const dict = response.data.data;
        console.log(JSON.stringify(dict, null, 2));

        if (dict.code === 0) {
          onSuccess?.(dict);
        } else {
          if (dict.code === -5) {
            this.login(username, password, captcha, 0, onSuccess, onError);
          } else if (dict.code === -7) {
            onError?.(-7); // 用户名密码错误
          } else {
            onError?.(dict.code);
          }
        }

        return;
      }

      console.error(response.data.errorMessage);

    } catch (err) {
      console.error(err);
    }

    onError?.(-100); // 通用错误码
  }

  saveLoginInfo(info) {

    // if (!info.accessToken || !info.expiresIn || !info.refreshToken) {
    //   console.error("Invalid login info");
    //   return;
    // }

    localStorage.setItem("AccessToken", info.accessToken);
    localStorage.setItem("ExpiresIn", info.expiresIn);
    localStorage.setItem("RefreshToken", info.refreshToken);
  }



}

// 导出单例（默认 baseURL 为 '/'）
export const loginToolShared = new LoginTool();