<template>
    <el-container>
        <el-header>
            <h1 :style="{ color: '#ffffff' }">{{ title }}</h1>
            <el-button class="logout-btn" type="text" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="250px">
                <el-menu class="aside-menu" :default-active="activeIndex" :background-color="$colors.background" :text-color="$colors.textColor"
                    :active-text-color="$colors.darkColor" @open="handleOpen" @close="handleClose" @select="handleSelect">
                    <template v-for="item in asideMenuData">
                        <el-submenu class="custom-submenu" :key="item.index" :index="item.index" v-if="item.children">
                            <template slot="title">
                                <div class="menu-item">
                                    <i :class="item.icon"></i>
                                    <span>{{ item.label }}</span>
                                </div>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item class="for-level2" v-for="child in item.children" :key="child.index" :index="child.index">
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
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
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
    margin-top: 20px;
}

.el-menu-item-group {
    margin-top: -10px;
    margin-bottom: 0px;
    line-height: 40px;
    height: 40px;
}


/deep/.el-menu-item {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius:30px;
    line-height: 40px;
    height: 40px;
}

//有submenu的情况,折叠行
/deep/.el-submenu__title {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius:30px;
    line-height: 40px;
    height: 40px;
}

//hover时
/deep/.el-submenu__title:hover,
/deep/.el-menu-item:hover { 
    background-color: var(--hover-color) !important; /* 背景颜色 */
    color: var(--dark-color); /* 文字颜色 */
}

//选中时
/deep/.el-menu-item.is-active {
color: var(--dark-color);
background-color: var(--selected-color) !important;
}

//子菜单展开后的二级菜单项
.el-menu-item.for-level2 {
    line-height: 40px;
    height: 40px;
}



.custom-submenu .el-menu-item {
    margin-bottom: 0px;
}

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
    //white-space: normal; // 允许换行显示
    word-break: break-all; // 英文单词允许拆分显示
    line-height: normal; // 调整行高
}

// .submenu-item {
//     display: flex;
//     margin-top: 0px;
//     margin-left: 0px;
//     /* 上下居中对齐 */
//     // align-items: center;


// }

.submenu-item span {
    // color: var(--dark-color);
    font-size: 18px;
    //white-space: normal; // 允许换行显示
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
                    index: "dashboard",
                    icon: "el-icon-s-home",
                },
                {
                    label: "Cases",
                    index: "cases",
                    icon: "el-icon-s-home",
                },
                {
                    label: "Settings",
                    index: "settings",
                    icon: "el-icon-s-tools",
                    children: [
                        {
                            label: "User Management",
                            index: "user-management",
                        },
                        {
                            label: "Role Management",
                            index: "role-management",
                        },
                    ],
                },
            ],
            activeIndex: "hello", // 默认激活的菜单项
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

        handleSelect(key, keyPath) {
            console.log("####handleSelect key: " + key);
            console.log("####handleSelect keyPath: " + keyPath);
            if(key == 'cases') {
                //this.$router.push('/login');这个不是页面内跳转
            }
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