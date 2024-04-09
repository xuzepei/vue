<template>
    <div>
        <div class="title-div" v-pre>1. 插值{{}}</div>
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

        <div class="title-div" v-pre>8. v-html</div>
        <hr>
        <div>
            <p>Using text interpolation: {{ rawHtml }}</p>
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
    color:red;
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
            dynaimcColor: "orange"
        };
    },
    computed: {
        reversedMessage() {
            return this.msg.split('').reverse().join('');
        },
        greeting() {
            return `Hello, ${this.name}!`;
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
            alert('按钮被点击了');
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
        }
    }
};
</script>