<template>
    <a-layout class="app-layout">
        <a-layout-content>
            <section class="hero-section">
                <a-carousel autoplay class="hero-carousel">
                    <div><img :src="t('carousel.bg1')" class="carousel-image"></div>
                    <div><img :src="t('carousel.bg2')" class="carousel-image"></div>
                    <div><img :src="t('carousel.bg3')" class="carousel-image"></div>
                </a-carousel>

                <div class="hero-content">
                    <a-typography-title class="hero-title">
                        {{ t('hero.title') }}
                    </a-typography-title>
                    <a-typography-paragraph class="hero-subtitle">
                        {{ t('hero.subtitle') }}
                    </a-typography-paragraph>
                    <a href="https://apps.microsoft.com/detail/9NFW1RPPT999?referrer=appbadge&amp;mode=direct"
                        rel="nofollow">
                        <img src="https://camo.githubusercontent.com/16f54569169711557fd6d3833dfaea3239506d7f8d673b07573c52855f1f2ee4/68747470733a2f2f6765742e6d6963726f736f66742e636f6d2f696d616765732f656e2d75732532306461726b2e737667"
                            width="200" data-canonical-src="https://get.microsoft.com/images/en-us%20dark.svg"
                            style="max-width: 100%;">
                    </a>
                </div>
            </section>
            <section class="hero-section">
                <video class="hero-video" autoplay muted loop playsinline controls>
                    <source src="../assets/pv.mp4" type="video/mp4">
                </video>
            </section>

            <section class="features-section">
                <a-row :gutter="[32, 32]" justify="center">
                    <a-col :xs="24" :md="12" :lg="6">
                        <a-card class="feature-card">
                            <a-typography-title class="feature-card-title" :level="3"> {{ t('features.feature1.title')
                            }}</a-typography-title>
                            <a-typography-paragraph class="feature-card-content">
                                {{ t('features.feature1.content') }}
                            </a-typography-paragraph>
                            <div class="feature-image-wrapper">
                                <a-image :src="playing" :alt="t('features.feature1.title')" class="feature-image" />
                            </div>
                        </a-card>
                    </a-col>

                    <a-col :xs="24" :md="12" :lg="6">
                        <a-card class="feature-card">
                            <a-typography-title class="feature-card-title" :level="3">{{ t('features.feature2.title')
                            }}</a-typography-title>
                            <a-typography-paragraph class="feature-card-content">
                                {{ t('features.feature2.content') }}
                            </a-typography-paragraph>
                            <div class="feature-image-wrapper">
                                <a-image :src="album" :alt="t('features.feature2.title')" class="feature-image" />
                            </div>
                        </a-card>
                    </a-col>

                    <a-col :xs="24" :md="12" :lg="6">
                        <a-card class="feature-card">
                            <a-typography-title class="feature-card-title" :level="3"> {{ t('features.feature3.title')
                            }}</a-typography-title>
                            <a-typography-paragraph class="feature-card-content">
                                {{ t('features.feature3.content') }}
                            </a-typography-paragraph>
                            <div class="feature-image-wrapper">
                                <a-image :src="wasapiImage" :alt="t('features.feature3.title')" class="feature-image" />
                            </div>
                        </a-card>
                    </a-col>
                    <a-col :xs="24" :md="12" :lg="6">
                        <a-card class="feature-card">
                            <a-typography-title class="feature-card-title" :level="3"> {{ t('features.feature4.title')
                                }}</a-typography-title>
                            <a-typography-paragraph class="feature-card-content">
                                {{ t('features.feature4.content') }}
                            </a-typography-paragraph>
                            <div class="feature-image-wrapper">
                                <a-image :src="walkman" :alt="t('features.feature4.title')" class="feature-image" />
                            </div>
                        </a-card>
                    </a-col>
                </a-row>
            </section>

            <section class="download-section">
                <a-row :gutter="[48, 48]" align="middle">
                    <a-col :xs="24" :md="12">
                        <div class="visualization-content">
                            <a-typography-title class="feature-card-title" :level="2">
                                {{ t('download.title') }}
                            </a-typography-title>
                            <a-typography-paragraph class="feature-card-content"
                                style="font-size: 1.1vw; line-height: 1.6; margin: 24px 0;">
                                {{ t('download.content') }}
                            </a-typography-paragraph>
                            <a href="https://apps.microsoft.com/store/detail/9PL2DSHJ79W7?referrer=appbadge&amp;mode=direct"
                                rel="nofollow">
                                <img src="https://camo.githubusercontent.com/16f54569169711557fd6d3833dfaea3239506d7f8d673b07573c52855f1f2ee4/68747470733a2f2f6765742e6d6963726f736f66742e636f6d2f696d616765732f656e2d75732532306461726b2e737667"
                                    width="200" data-canonical-src="https://get.microsoft.com/images/en-us%20dark.svg"
                                    style="max-width: 100%;">
                            </a>
                        </div>
                    </a-col>
                    <a-col :xs="24" :md="12">
                        <div class="visualization-image-wrapper">
                            <a-image :src="visualizationImage" :alt="t('download.title')" class="visualization-image" />
                        </div>
                    </a-col>
                </a-row>
            </section>
        </a-layout-content>

        <a-layout-footer class="footer">
            © 2025 Sennpei Studio All Rights Reserved.
        </a-layout-footer>
    </a-layout>
</template>

<script setup lang="ts">
import {
    Layout as ALayout,
    LayoutHeader as ALayoutHeader,
    LayoutContent as ALayoutContent,
    LayoutFooter as ALayoutFooter,
    Row as ARow,
    Col as ACol,
    Button as AButton,
    Card as ACard,
    TypographyTitle as ATypographyTitle,
    TypographyParagraph as ATypographyParagraph,
} from 'ant-design-vue';
import wasapiImage from '../assets/wasapi.jpg';
import playing from '../assets/playing.jpg';
import album from '../assets/album.jpg';
import walkman from '../assets/album.jpg';
import visualizationImage from '../assets/visualization.png';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
console.log(t('hero.title'))
</script>

<style scoped>
/* 全局样式和变量 */
.app-layout {
    background-color: #0d1117;
    /* 深色背景，类似 VS 2026 风格 */
    color: #eee;
    overflow-x: hidden;
}

/* 头部样式 */
.header {
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    height: 64px;
}

.header-logo {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
}

/* 英雄区域样式 */
.hero-section {
    position: relative;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: radial-gradient(circle at 50% 120%, rgba(50, 150, 255, 0.1), transparent 50%);
    /* 你可以在这里添加背景动效 */
}

.hero-video {
    border-radius: 10px;
    height: 85%;
}

/* 走马灯样式 */
.hero-carousel {
    width: 100%;
    height: 100%;
    /* 走马灯撑满 hero-section */
}

.carousel-image {
    width: 100%;
    height: 80vh;
    /* 图片撑满走马灯容器高度 */
    object-fit: cover;
    /* 保持图片比例并填充容器 */
    display: block;
    /* 移除图片底部空白 */
}

/* 半透明蒙版，用于提高文字可读性 */
.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    /* 黑色半透明 */
    z-index: 10;
    /* 比文字内容低，比走马灯高 */
}

/* 英雄区域文字内容样式 - 绝对定位并居中 */
.hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 精确居中 */
    max-width: 40vw;
    /* 保持文字内容的宽度限制 */
    padding: 2vw;
    text-align: center;
    z-index: 20;
    /* 确保文字内容在蒙版和走马灯之上 */
    width: 100%;
    /* 确保在 max-width 限制下，内容宽度也能响应 */
    box-sizing: border-box;
    /* 确保 padding 不会撑开宽度 */
    /* 添加一个半透明的背景色 */
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    /* 模糊背景，数值越大越模糊 */
    -webkit-backdrop-filter: blur(10px);
    /* 兼容 Safari 浏览器 */
    border-radius: 20px;
    /* 可选：添加圆角让效果更佳 */
}

.hero-title {
    color: #fff !important;
    font-size: 3vw !important;
    font-weight: 700 !important;
    line-height: 1.2 !important;
}

.hero-subtitle {
    font-size: 1.25vw;
    margin-top: 16px;
    color: #c9d1d9;
}

/* 功能展示区样式 */
.features-section {
    padding: 4vh 4vw;
    background-color: #161b22;
}

.features-section .ant-row {
    display: flex;
    flex-wrap: wrap;
    /* 确保换行 */
}

.feature-card {
    background-color: #0d1117;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #c9d1d9;
    transition: transform 0.3s ease-in-out;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.feature-card .ant-card-body {
    height: 100%;
    /* 确保body继承高度 */
    display: flex;
    flex-direction: column;
}

.feature-card-title {
    color: #c9d1d9;
    font-size: 1.5vw;
}

.feature-card-content {
    color: #a8a8a8;
    font-size: 1vw;
}

.feature-card:hover {
    transform: translateY(-8px);
}

.feature-image-wrapper {
    margin-top: auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 下载区域样式 */
.download-section {
    padding: 0vh 6vw;
    text-align: center;
}

/* 页脚样式 */
.footer {
    text-align: center;
    background-color: #0d1117;
    padding: 24px;
    color: #c9d1d9;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.visualization-image-wrapper {
    margin: 4vw;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem !important;
    }
}
</style>