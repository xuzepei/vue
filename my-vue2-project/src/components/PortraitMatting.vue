<template>
  <div class="p-4">
    <h2 class="text-lg font-bold mb-4">人像抠图（调用独立 JS）</h2>

    <img v-if="originalUrl" :src="originalUrl" alt="原图" class="mb-4 max-w-md border" />
    <img v-if="maskUrl" :src="maskUrl" alt="抠图结果" class="mb-4 max-w-md border" />

    <button @click="handleProcess" :disabled="loading" class="px-4 py-2 bg-blue-600 text-white rounded">
      {{ loading ? '处理中…' : '执行抠图' }}
    </button>
  </div>
</template>

<!-- 如果这里不加，scoped 样式，就会影响Login.vue中.avatar_box img -->
<style lang="less" scoped>
img {
  max-width: 30%;
  height: auto;
}
</style>

<script>
// ✅ 导入 processPortrait
import { processPortrait } from '@/plugins/modnetProcessor.js'
import originalUrl from '@/assets/photo.jpg';

export default {
  data() {
    return {
      originalUrl: originalUrl,
      maskUrl: '',
      loading: false,
    };
  },
  methods: {
    async handleProcess() {
      this.loading = true;
      try {
        // 从 assets 加载图片并转为 Blob
        const imageUrl = new URL('@/assets/photo.jpg', import.meta.url).href
        const response = await fetch(imageUrl)
        const blob = await response.blob()

        // 传入 processPortrait 函数
        const maskBlob = await processPortrait(blob)
        this.maskUrl = URL.createObjectURL(maskBlob)
      } catch (e) {
        console.error('抠图出错:', e);
      }
      this.loading = false;
    }
  },
  mounted() {
    console.log('PortraitMatting mounted');
  }
};
</script>