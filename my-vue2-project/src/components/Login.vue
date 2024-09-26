<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单 -->
            <el-form ref="loginFormRef" class="login_form" label-width="0px" :model="loginForm" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghu"
                        placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" placeholder="请输入密码"
                        type="password"></el-input>
                </el-form-item>
                <!-- 按钮区 -->
                <el-form-item label="" class="buttons">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<!-- scoped 样式，只在当前组件中生效 -->
<style lang="less" scoped>
.login_container {
    width: 100%;
    height: 100%;
    background-color: #2b4b6b;

    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

.login_box {
    position: relative;
    width: 400px;
    height: 300px;
    box-shadow: 0 0 20px rgba(0, 0, 255, 255);
    border-radius: 8px;
    background-color: white;
}

.avatar_box {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.buttons {
    display: flex;
    justify-content: flex-end;
}
</style>

<!-- 非 scoped 的样式，全局生效 -->
<style lang="less">
.icon-yonghu {
    margin-left: 3px;
}

.icon-mima {
    margin-left: 3px;
}
</style>

<script>

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
function isDev() { 
    if (process.env.NODE_ENV === 'development') {
        return true;
    }

    return false;
}

export default {
    data() {
        var validateUsername = (rule, value, callback) => {
            console.log("validateUsername: value:" + value);

            //判断是否为开发环境
            if (isDev()) {
                callback();
            } else {
                if (!emailRegex.test(value)) {
                    callback(new Error('请输入有效的邮箱地址！'));
                } else {
                    callback();
                }
            }
        };

        return {
            //登录表单数据绑定对象
            loginForm: {
                username: this.$isDev() ? "TestLabCN":"",
                password: this.$isDev() ? "cntestfreqty" : "",
            },
            loginFormRules: {
                username: [
                    { required: true, message: '请输入登录用户名', trigger: 'submit' }, //trigger:blur(失去焦点), submit(点击submit) 
                    { min: 3, max: 255, message: "长度在3到255个字符", trigger: 'submit' },
                    { validator: validateUsername, trigger: 'submit' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'change' },
                    { min: 6, max: 15, message: "长度在6到15个字符", trigger: 'change' },
                ],
            }
        }
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        login() {

            if (this.$isClickable() === false) { 
                console.log("Not clickable!!!");
                return false;
            }

            this.$refs.loginFormRef.validate((valid) => {

                console.log("valid:" + valid);

                if (valid) {
                    this.request();
                    return true;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        async request() {
            //this.loading = true;
            try {
                // 使用 this.$http 调用
                const response = await this.$http.post('/token', this.loginForm);
                
                console.log("response.statue:" + response.status);
                
                if (response.status === 200) {
                    const contentType = response.headers['content-type'];
                    if (contentType && contentType.includes('application/json')) {

                        console.log(response.data);

                        if (response.data.success === true) {
                            if (response.data.data != null) { 
                                this.tokenInfo = response.data.data.content;
                                window.sessionStorage.setItem("AccessToken", this.tokenInfo.AccessToken);
                                window.sessionStorage.setItem("ExpiresIn", this.tokenInfo.ExpiresIn);
                                window.sessionStorage.setItem("RefreshToken", this.tokenInfo.RefreshToken);

                                const msg = "Login succeeded!";

                                console.log(msg);
                                this.$message.success(msg);
                                this.$router.push("/");
                                return;
                            }
                        } else {
                            console.log("errorCode: " + response.data.errorCode);
                            console.log("errorMessage: " + response.data.errorMessage);
                        }
                    }
                }

                const msg = 'Failed to login';
                console.error(msg);
                this.$message.error(msg);


            } catch (e) {
                console.error(e);
                this.$message.error(e);
            } finally {
                //this.loading = false;
            }
        },
    }
}
</script>