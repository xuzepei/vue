<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="@/assets/logo.png" alt="">
            </div>
            <!-- 登录表单 -->
            <el-form ref="loginFormRef" class="login_form" label-width="0px" :model="loginFormData" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginFormData.username" prefix-icon="iconfont icon-yonghu"
                        placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginFormData.password" prefix-icon="iconfont icon-mima" placeholder="请输入密码"
                        type="password"></el-input>
                </el-form-item>
                <!-- 按钮区 -->
                <el-form-item label="" class="buttons">
                    <el-button type="primary" @click="login" :loading="isRequesting">登录</el-button>
                    <el-button @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<!-- lang="less"，支持less语法, 需要先安装, 命令 npm install less less-loader --save-dev -->
<!-- scoped 样式，只在当前组件中生效 -->
<style lang="less" scoped>
.login_container {
    width: 100%;
    height: 100%;
    background-color: var(--login-bg-color);

    display: flex;
    flex-direction: row;
    /* 主轴方向上的对齐方式 */
    justify-content: center;
    /* 交叉轴方向上的对齐方式 */
    align-items: center;
    
}

.login_box {
    position: relative;
    width: 400px;
    height: 300px;
    box-shadow: 0 0 20px var(--shadow-color);
    border-radius: 8px;
    background-color: white;
}

.avatar_box {
    width: 120px;
    height: 120px;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px var(--shadow-color);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--border-color);
        //max-width: none; /* 取消默认 max-width */
    }
}

.login_form {
    // background: #ff0000;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
}

.buttons {
    display: flex;
    flex-direction: row;
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

export default {
    data() {
        return {
            //登录表单数据绑定对象
            loginFormData: {
                username: this.$isDev() ? "TestLabCN":"",
                password: this.$isDev() ? "cntestfreqty" : "",
            },
            loginFormRules: {
                username: [
                    { required: true, message: '请输入登录用户名', trigger: 'blur' }, //trigger:blur(失去焦点), submit(点击submit) 
                    { min: 3, max: 255, message: "长度在3到255个字符", trigger: 'blur' },
                    { validator: this.validateUsername, trigger: 'submit' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'change' },
                    { min: 6, max: 15, message: "长度在6到15个字符", trigger: 'change' },
                ],
            },
            isRequesting: false,
            tokenInfo: null,
        }
    },
    methods: {

        validateUsername(rule, value, callback) {
            console.log("validateUsername: value:" + value);

            //判断是否为开发环境
            if (this.$isDev()) {
                callback();
            } else {
                if (!this.$regex.email.test(value)) {
                    callback(new Error('请输入有效的邮箱地址！'));
                } else {
                    callback();
                }
            }
        },

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
            this.isRequesting = true;
            
            try {
                // 使用 this.$http 调用
                const response = await this.$http.post('/token', this.loginFormData);
                
                console.log("response.statue:" + response.status);
                this.isRequesting = false;
                
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
                this.isRequesting = false;
            }
        },
    }
}
</script>