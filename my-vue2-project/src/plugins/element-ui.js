import Vue from 'vue'
import { Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu, MenuItem} from 'element-ui'

//表单相关
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)


//布局相关
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)





//Vue.use(Message)，Message不需要注册
Vue.prototype.$message = Message;