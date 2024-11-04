<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png">
            </div>
            <!-- 登录表单区域 -->
            <el-form label-width="80px" class="login_form">
                <el-form-item label="活动名称">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login_container {
    height: 100%;
    background-color: #2b4b6b;

    display: flex;
    flex-direction: row;
    /* 主轴方向上的对齐方式 */
    justify-content: center;
    /* 交叉轴方向上的对齐方式 */
    align-items: center;
}

.login_box {
    display: flex;
    justify-content: center;
    position: relative;
    width: 400px;
    height: 300px;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 255, 255);
    border-radius: 8px;
}

.avatar_box {
    width: 100px;
    height: 100px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid #eee;
    background-color: #fff;
    transform: translate(0, -50%);
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

</style>

<script>
export default {

};
</script>