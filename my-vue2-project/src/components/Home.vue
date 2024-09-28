<template>
    <el-container>
        <el-header>Header
            <el-button type="primary" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>


<style lang="less" scoped>
.el-container {
    text-align: left;
    height: 100%;
}
.el-header {
    background-color: #373d41;
}
.el-aside {
    background-color: #333744;
}
.el-main {
    background-color: lightgray;
}
</style>

<script>

export default {
    mounted() {
        console.log('Home has been mounted!');
    },
    created() { 
        console.log('Home has been created!');
    },
    data() {
        return {
            
        };
    },
    computed: {
        
    },
    watch: {

    },
    methods: {

        logout() {
            console.log("logout");
            //清空token相关记录
            window.sessionStorage.clear();
            //跳转到登录页
            this.$router.push('/login');
        },

        scrollToBottom() {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth' // 平滑滚动
            });
        },
    }
};
</script>