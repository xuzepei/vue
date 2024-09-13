<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单 -->
            <el-form class="login_form" label-width="0px">
                <!-- 用户名 -->
                <el-form-item label="">
                    <el-input prefix-icon="iconfont icon-yonghu" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="">
                    <el-input prefix-icon="iconfont icon-mima" placeholder="请输入密码"></el-input>
                </el-form-item>
                <!-- 按钮区 -->
                <el-form-item label="" class="buttons">
                    <el-button type="primary">登录</el-button>
                    <el-button>重置</el-button>
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
export default {}
</script>