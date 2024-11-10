<template>
    <el-container>
        <el-header>
            <h1 :style="{ color: '#ffffff' }">Panda Cloud</h1>
            <el-button class="logout-btn" type="text" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="220px">
                <el-menu class="aside-menu" :default-active="activeIndex" background-color="#333744" text-color="#fff"
                    active-text-color="ffd04b">
                    <!-- <el-sub-menu index="1">
                        <template #title>
                            <span>Main Menu</span>
                        </template>
<el-menu-item index="1-1">Sub Item 1</el-menu-item>
<el-menu-item index="1-2">Sub Item 2</el-menu-item>
</el-sub-menu> -->
                    <el-submenu v-for="item in asideMenuData" :key="item.index" :index="item.index">
                        <div class="menu-item">
                            <i :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                        </div>
                        <el-menu-item-group>
                            <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
                                <div class="submenu-item">
                                    <span>{{ child.label }}</span>
                                </div>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
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
    display: flex;
    display: -webkit-flex; //safari
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.logout-btn {}

.el-aside {
    background-color: #333744;
}

.aside-menu {}

// .el-header h1 {
//     color: red;
// }

.el-menu-item-group {
    margin-top: 0px;
    margin-bottom: 0px;
}

.el-menu-item {
}

.menu-item {
    display: flex;
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    /* 上下居中对齐 */
    align-items: center;
    /* 图标和文字间的间距 */
    gap: 10px;
}

.menu-item i {
    /* 防止文字换行 */
    //white-space: nowrap;
    color: white;
    font-size: 25px;
}

.menu-item span {
    /* 防止文字换行 */
    //white-space: nowrap;
    color: white;
    font-size: 18px;

    white-space: normal; // 允许换行显示
    word-break: break-all; // 英文单词允许拆分显示
    line-height: normal; // 调整行高
}

.submenu-item {
    display: flex;
    margin-top: 0px;
    margin-left: 40px;
    /* 上下居中对齐 */
    // align-items: center;


}

.submenu-item span {
    color: white;
    font-size: 15px;
    white-space: normal; // 允许换行显示
    word-break: break-all; // 英文单词允许拆分显示
    line-height: normal; // 调整行高
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
            asideMenuData: [
                {
                    label: "Dashboard",
                    index: "1",
                    icon: "el-icon-s-home",
                },
                {
                    label: "Settings",
                    index: "2",
                    icon: "el-icon-s-tools",
                    children: [
                        {
                            label: "User Management",
                            index: "2-1",
                        },
                        {
                            label: "Role Management",
                            index: "2-2",
                            children: [
                                {
                                    label: "Add Role",
                                    index: "2-2-1",
                                },
                                {
                                    label: "Edit Role",
                                    index: "2-2-2",
                                },
                            ],
                        },
                    ],
                },
            ],
            activeIndex: "1", // 默认激活的菜单项
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