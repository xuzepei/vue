class User {
  constructor() {
    this.region = 'cn';
    this.accessToken = '';
  }

  authorization() {
    return `Bearer ${this.accessToken}`;
  }
}

export const userShared = new User();