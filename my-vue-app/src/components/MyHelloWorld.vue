<template>
    <div>
        <div class="title-div" v-pre>1. 插值用法 {{}}</div>
        <hr>
        <h1>{{ msg }}</h1>

        <div class="title-div" v-pre>2. v-if 和 v-show</div>
        <hr>
        <p v-if="isShow">这是通过 v-if 显示的内容</p>
        <p v-show="isShow">这是通过 v-show 显示的内容</p>

        <div class="title-div" v-pre>3. v-bind 和 :</div>
        <hr>
        <img :src="adsImagePath" width="100" height="100">
        <!-- <img src="../assets/test.png" width="100" height="100"> -->
        <button :disabled="isBtnDisabled">Button</button>
        <div v-bind="objectOfAttrs"></div>
        <p :class="isDynamicClass">这是个动态class</p>
        <p :style="{ color: dynaimcColor }">这是个动态style</p>

        <div class="title-div" v-pre>4. v-for</div>
        <hr>
        <ul>
            <li v-for="item in items" :key="item.id">{{ item.name }}</li>
        </ul>
        <div class="v-for-row">
            <span class="v-for-row-item" v-for="(value, index) in items2" :key="index">{{ value }}</span>
        </div>
        <div class="v-for-buttons">
            <button @click="clickedReverseBtn">Reverse</button>
            <button @click="clickedSliceBtn">Slice</button>
            <button @click="clickedChangeBtn">{{isChanged ? "a to i" : "i to a"}}</button>
        </div>

        <div class="title-div" v-pre>5. v-on 和 @</div>
        <hr>
        <button @click="changeMsg">改变消息</button>
        <button @click="handleClick">点击我</button>

        <p>事件对象</p>
        <a @click="clickedToGo" href="http://www.baidu.com">阻止百度</a>
        <br>
        <a @click="clickedToGo2(2, $event)" href="http://www.baidu.com">阻止去百度</a>

        <div class="title-div" v-pre>6. 计算属性computed</div>
        <hr>
        <div>
            <p>原始消息: {{ msg }}</p>
            <p>反转消息: {{ reversedMessage }}</p>
            <p>问候语: {{ greeting }}</p>
        </div>

        <div class="title-div" v-pre>7. 监听器watch</div>
        <hr>
        <div>
            <p>你的问题: {{ question }}</p>
            <p>答案: {{ answer }}</p>
        </div>

        <div class="title-div" v-pre>8. v-text和v-html</div>
        <hr>
        <div>
            <p>Using text interpolation: {{ rawHtml }}</p>
            <p v-text="rawHtml"></p>
            <p v-html="rawHtml"></p>
        </div>
        <div class="title-div" v-pre>9. 事件修饰符</div>
        <hr>
        <div>
            <div @click="fatherClick">父节点
                <button @click.stop="stopClick">.stop阻止事件冒泡</button>
                <a href="http://www.baidu.com" @click.prevent="stopClick">.prevent阻止默认行为</a>
                <button @click.once="onceClick" @click.stop="">.once程序运行期间, 只触发一次事件处理函数</button>
                <input type="text" @keydown.enter="enterFun" @keydown.esc="escFun"/>
                <input type="text" @keydown.esc="escFun" />
            </div>
        </div>
        <div class="title-div" v-pre>10. v-model数据的双向绑定</div>
        <hr>
        <div>
            <span>用户名: </span>
            <input type="text" v-model="username" />
        </div>
        <div>
            <span>密码: </span>
            <input type="password" v-model="password" />
        </div>
        <div>
            <span>爱好: </span>
            <input type="checkbox" v-model="hobbies" value="workout" />健身
            <input type="checkbox" v-model="hobbies" value="reading" />看书
            <input type="checkbox" v-model="hobbies" value="game" />游戏
        </div>
        <div>
            <span>性别: </span>
            <input type="radio" v-model="gender" value="male" />男
            <input type="radio" v-model="gender" value="female" />女
        </div>
        <div>
            <span>点赞数量: </span>
            <input type="text" v-model.number="praize"/>{{ praize }}
        </div>
        <div>
            <span>评论: </span>
            <input type="text" v-model.trim="comment"/>
        </div>

        <div class="title-div" v-pre>11. 计算属性用法</div>
        <hr>
        <div>
            <span>全选：</span>
            <input type="checkbox" v-model="selectAll"/>
            <ul>
                <li v-for="(val, index) in selectionArray" :key="index">
                    <input type="checkbox" v-model="val.selected"/>
                    <span>{{ val.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>

div {
    text-align: left;
}

.title-div {
    margin-top: 20px;
    font-family: Arial, sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    color:black;
}

/* ul {
    list-style-type: none;
    padding: 0px; 
} */

li {
    line-height: 2;
}

.green_class {
    color: green;
}

.v-for-row {
  display: flex;
  flex-direction: row;
}

.v-for-row-item {
  font-size: 32px;
  font-weight: bold;
  margin-right: 10px;
  background-color: pink;
}

.v-for-buttons button {
    margin-right: 10px;
    margin-top: 10px;
}

</style>

<script>
// import HelloWorld from './HelloWorld.vue';
import testImagePath from '../assets/ads.jpg';

export default {
    data() {
        return {
            msg: "Hello, Vue!",
            name: "Vue",
            isShow: true,
            adsImagePath: testImagePath,
            items: [
            {id: 1, name: "item1"},
            {id: 2, name: "item2"},
            {id: 3, name: "item3"}],
            items2: ["c", "o", "d", "e", "i", "s", "w", "o", "r", "l", "d"],
            question: '',
            answer: 'I cannot give you an answer until you ask a question!',
            rawHtml: '<span style="color:red">This will replace the existing content.</span>',
            isBtnDisabled: true,
            objectOfAttrs: {
                id: 'container',
                class: 'wrapper'
            },
            isDynamicClass: {
                green_class: true
            },
            dynaimcColor: "orange",
            username: "",
            password: "",
            hobbies: [],
            gender: "",
            praize: 0,
            comment: "",
            isSliced: false,
            isChanged: false,
            selectionArray: [ {name: "点赞", selected: false}, {name: "转发", selected: false}, {name: "收藏", selected: false}],
        };
    },
    computed: {
        reversedMessage() {
            return this.msg.split('').reverse().join('');
        },
        greeting() {
            return `Hello, ${this.name}!`;
        },

        selectAll: {
            set(value) {
                console.log("selectAll.set:" + value)
                this.selectionArray.forEach(obj => {obj.selected = value});
            },
            get() {
                
                var selected = true
                let outsideVar = 0
                this.selectionArray.forEach((obj, index) => {
                    console.log(index + ". obj.selected is: " + obj.selected)
                     selected = (obj.selected === true);

                    if (obj.selected) {
                        outsideVar++;
                    }
                });

                console.log("selected: " + selected);
                console.log("outsideVar: " + outsideVar);
                return selected
                //return this.selectionArray.every(obj => {obj.selected === true});
            }
        }
    },
    watch: {
        // 监听 question 属性
        question(newValue, oldValue) {
            print(newValue);
            print(oldValue);

            this.answer = '...';
            this.getAnswer();
        }
    },
    methods: {
        changeMsg() {
            this.msg = "Hello, World!";
            this.question = "Is this a question?"
        },

        handleClick() {
            //alert('按钮被点击了');
            console.log(this.hobbies);
            console.log(this.gender);
        },

        getAnswer() {
            this.answer = 'Yes, it is and this is my answer.';
        },

        clickedToGo(e) {
            e.preventDefault();
        },

        clickedToGo2(id, e) {
            //console.log(id);
            //console.log(e);
            e.preventDefault();
        },

        fatherClick() {
            console.log("fatherClick");
        },

        stopClick(e) {
            console.log("stopClick");

            e.preventDefault();
        },

        onceClick() {
            console.log("onceClick");
        },

        enterFun() {
            console.log("enterFun");
        },

        escFun() {
            console.log("escFun");
        },

        clickedReverseBtn() {
            this.items2.reverse();
        },

        clickedSliceBtn() {
            if (this.isSliced == false) {
                let array = this.items2.slice(0, 4);
                this.items2 = array;
                this.isSliced = true
            } else {
                this.items2 = ["c", "o", "d", "e", "i", "s", "w", "o", "r", "l", "d"];
                this.isSliced = false
            }
        },

        clickedChangeBtn() {
            if (this.isChanged) {
                this.isChanged = !this.isChanged;
                this.items2[4] = "i"
            } else {
                this.isChanged = !this.isChanged;
                this.items2[4] = "a"
            }
        }
    }
};
</script>