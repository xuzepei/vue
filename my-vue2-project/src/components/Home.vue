<template>
    <div>
        <h1>Home Page</h1>
        <el-button type="primary" @click="logout">退出</el-button>
    </div>
</template>


<style lang="less" scoped>
</style>

<script>

export default {
    mounted() {
        console.log('Home has been mounted!');
        this.fetchData()

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