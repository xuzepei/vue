<template>
    <el-container>
        <el-header>
            <h1 :style="{ color: '#ffffff' }">{{ title }}</h1>
            <el-button class="logout-btn" type="text" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="220px">
                <el-menu class="aside-menu" :default-active="activeIndex" :background-color="$colors.background" :text-color="$colors.textColor"
                    :active-text-color="$colors.darkColor" @open="handleOpen" @close="handleClose">
                    <template v-for="item in asideMenuData">
                        <el-submenu :key="item.index" :index="item.index" v-if="item.children">
                            <template slot="title">
                                <div class="menu-item">
                                    <i :class="item.icon"></i>
                                    <span>{{ item.label }}</span>
                                </div>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
                                    <div class="submenu-item">
                                        <span>{{ child.label }}</span>
                                    </div>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item :key="item.index" :index="item.index" v-else>
                            <div class="menu-item">
                                <i :class="item.icon"></i>
                                <span>{{ item.label }}</span>
                            </div>
                        </el-menu-item>
                    </template>
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
    background-color: var(--background-color);
}

// .aside-menu {
// }

// .el-header h1 {
//     color: red;
// }

.el-menu {
    
}

.el-menu-item-group {
    margin-top: 0px;
    margin-bottom: 0px;
}

.el-menu-item {}

.menu-item {
    // display: flex;
    // margin-left: 20px;
    // margin-top: 30px;
    // margin-bottom: 30px;
    // /* 上下居中对齐 */
    // align-items: center;
    // /* 图标和文字间的间距 */
    // gap: 10px;
}

.menu-item i {
    /* 防止文字换行 */
    //white-space: nowrap;
    color: var(--dark-color);
    font-size: 25px;
}

.menu-item span {
    /* 防止文字换行 */
    //white-space: nowrap;
    // color: white;
    font-size: 18px;
    margin-left: 5px;
    white-space: normal; // 允许换行显示
    word-break: break-all; // 英文单词允许拆分显示
    line-height: normal; // 调整行高
}

.submenu-item {
    display: flex;
    margin-top: 0px;
    margin-left: 0px;
    /* 上下居中对齐 */
    // align-items: center;


}

.submenu-item span {
    // color: var(--dark-color);
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
        console.log(this.$colors);
    },
    created() {
        console.log('Home has been created!');
    },
    data() {
        return {
            title: "Panda Cloud Copy",
            asideMenuData: [
                {
                    label: "Dashboard",
                    index: "0",
                    icon: "el-icon-s-home",
                },
                {
                    label: "Cases",
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
                        },
                    ],
                },
            ],
            activeIndex: "0", // 默认激活的菜单项
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {

        handleOpen() { 
            console.log("####handleOpen");
        },

        handleClose() {
            console.log("####handleClose");
        },

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