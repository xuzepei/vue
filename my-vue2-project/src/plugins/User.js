class User {
  constructor() {
    this.region = '';
    this.accessToken = '';
  }

  authorization() {
    return `Bearer ${this.accessToken}`;
  }

  saveRegion(value) {
    localStorage.setItem("key_selected_region", value);
  }

  getRegion() {
    return localStorage.getItem("key_selected_region") || "";
  }

}

export const userShared = new User();