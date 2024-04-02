<template>
    <div>
        <h1>{{ msg }}</h1>
        <button @click="changeMsg">改变消息</button>
    </div>
</template>

<style>

</style>

<script>
export default {
    data() {
        return {
            msg: "Hello, Vue!"
        };
    },
    methods: {
        changeMsg() {
            this.msg = "Hello, World!";
        }
    }
};
</script>