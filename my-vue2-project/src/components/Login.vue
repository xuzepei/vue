<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单 -->
            <el-form label-width="80px">
                <el-form-item label="活动名称">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

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
</style>

<script>
export default {}
</script>