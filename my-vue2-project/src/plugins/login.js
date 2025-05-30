import axios from 'axios';

class LoginTool {
  constructor(baseURL = '/') {
    this.http = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async login(username, password, captcha, mode, onSuccess, onError) {
    try {
      const response = await this.http.post('/token', data);

      if (response.status === 200 && response.headers['content-type']?.includes('application/json')) {
        if (response.data.success && response.data.data) {
          onSuccess?.(response.data.data.content);
        } else {
          onError?.(response.data.errorMessage || '登录失败');
        }
      } else {
        onError?.('请求失败：非200响应');
      }
    } catch (err) {
      console.error(err);
      onError?.('网络请求错误');
    }
  }

}

// 导出单例（默认 baseURL 为 '/'）
export const loginToolShared = new LoginTool();