<template>
  <div class="container">
    <h2 class="header">人像抠图（调用独立 JS）</h2>

    <div class="row-container">
      <div class="img-btn-container">
        <img v-if="originalUrl" :src="originalUrl" alt="原图" class="mb-4 max-w-md border" />
        <el-button type="primary" :loading="loading" @click="handleProcess" class="my-button">
          {{ loading ? '处理中…' : '执行抠图' }}
        </el-button>
      </div>


      <div class="img-btn-container">
        <img v-if="maskUrl" :src="maskUrl" alt="抠图结果" class="mb-4 max-w-md border" />
        <button @click="clickedDownloadBtn" :hidden="hideDownloadBtn" class="my-button">
          下载图片
        </button>
      </div>
    </div>


  </div>
</template>

<!-- 如果这里不加，scoped 样式，就会影响Login.vue中.avatar_box img -->
<style lang="less" scoped>

.container {
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // 这句确保子元素靠左对齐
  padding: 20px;
}

.row-container {
  background-color: green;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start; // 这句确保子元素靠左对齐
  gap: 40px; // 设置子元素之间的间距
}

.img-btn-container {
  background-color: #ff0000;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中所有子元素 */
  align-self: flex-start;
  width: calc((100vw - 40px) / 2);
}

img {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
}

.my-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>

<script>
// ✅ 导入 processPortrait
import { processPortrait } from '@/plugins/ModnetProcessor1.js'
import originalUrl from '@/assets/photo.jpg';

export default {
  data() {
    return {
      originalUrl: originalUrl,
      maskUrl: '',
      loading: false,
      hideDownloadBtn: true
    };
  },
  methods: {
    async handleProcess() {

      console.log('开始抠图');

      this.loading = true;
      this.hideDownloadBtn = true;
      try {
        // 从 assets 加载图片并转为 Blob
        const imageUrl = new URL('@/assets/photo.jpg', import.meta.url).href
        const response = await fetch(imageUrl)
        const blob = await response.blob()

        // 传入 processPortrait 函数
        const maskBlob = await processPortrait(blob)
        this.maskUrl = URL.createObjectURL(maskBlob)
        if (this.maskUrl) {
          this.hideDownloadBtn = false;
        }
      } catch (e) {
        console.error('抠图出错:', e);
      }
      this.loading = false;
    },

    clickedDownloadBtn() {
      if (this.maskUrl) {
        const link = document.createElement('a');
        link.href = this.maskUrl;
        link.download = 'portrait_mask.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  },
  mounted() {
    console.log('PortraitMatting mounted');
  }
};
</script>