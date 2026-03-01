<template>
    <a-layout class="app-layout">
        <ParticlesBackground />
        <a-layout-content>
            <section class="hero-section" ref="heroSection">
                <a-carousel autoplay class="hero-carousel">
                    <div><img :src="t('carousel.bg1')" class="carousel-image"></div>
                    <div><img :src="t('carousel.bg2')" class="carousel-image"></div>
                    <div><img :src="t('carousel.bg3')" class="carousel-image"></div>
                </a-carousel>
                
                <div class="hero-bg-gradient"></div>
                <div class="hero-bg-orbs">
                    <div class="orb orb-1" ref="orb1"></div>
                    <div class="orb orb-2" ref="orb2"></div>
                    <div class="orb orb-3" ref="orb3"></div>
                </div>
                
                <div class="floating-elements">
                    <div class="floating-note note-1" ref="note1">♪</div>
                    <div class="floating-note note-2" ref="note2">♫</div>
                    <div class="floating-note note-3" ref="note3">♬</div>
                    <div class="floating-note note-4" ref="note4">♩</div>
                </div>

                <div class="hero-content" ref="heroContent">
                    <h1 class="hero-title" ref="heroTitle">
                        <span class="title-char" v-for="(char, index) in titleChars" :key="index">{{ char }}</span>
                    </h1>
                    <p class="hero-subtitle" ref="heroSubtitle">
                        {{ t('hero.subtitle') }}
                    </p>
                    <div class="hero-buttons" ref="heroButtons">
                        <a href="https://apps.microsoft.com/detail/9nfw1rppt999?referrer=appbadge&mode=direct" rel="nofollow" class="glow-button">
                            <img src="https://get.microsoft.com/images/en-us%20dark.svg" alt="Microsoft Store">
                        </a>
                        <a :href="t('faq.link')" rel="nofollow" class="glow-button">
                            <img src="../assets/faq.png" alt="FAQ">
                        </a>
                        <a href="https://www.bilibili.com/video/BV1f5pgzAEcs" rel="nofollow" class="glow-button">
                            <img src="../assets/bilibili-color.png" alt="Bilibili">
                        </a>
                        <a href="https://github.com/Johnwikix/original-sound-hq-player" rel="nofollow" class="glow-button">
                            <img src="../assets/github-mark-white.png" alt="GitHub">
                        </a>
                    </div>
                </div>
                
                <div class="scroll-indicator" ref="scrollIndicator">
                    <div class="mouse">
                        <div class="wheel"></div>
                    </div>
                </div>
            </section>
            
            <section class="video-section" ref="videoSection">
                <div class="video-wrapper">
                    <video class="hero-video" autoplay muted loop playsinline ref="heroVideo">
                        <source src="../assets/pv.mp4" type="video/mp4">
                    </video>
                    <div class="video-glow"></div>
                </div>
            </section>

            <section class="features-section" ref="featuresSection">
                <div class="section-header" ref="sectionHeader">
                    <h2 class="section-title">{{ t('hero.title') }}</h2>
                    <p class="section-subtitle">{{ t('hero.sectionSubtitle') }}</p>
                </div>
                <a-row :gutter="[32, 32]" justify="center">
                    <a-col :xs="24" :md="12" :lg="6" v-for="(feature, index) in features" :key="index">
                        <a-card class="feature-card" :class="`feature-card-${index}`" @mouseenter="handleCardHover($event, true)" @mouseleave="handleCardHover($event, false)">
                            <div class="card-glow"></div>
                            <div class="card-content">
                                <a-typography-title class="feature-card-title" :level="3"> {{ feature.title }}
                                </a-typography-title>
                                <a-typography-paragraph class="feature-card-content">
                                    {{ feature.content }}
                                </a-typography-paragraph>
                                <div class="feature-image-wrapper">
                                    <a-image :src="feature.image" :alt="feature.title" class="feature-image" />
                                </div>
                            </div>
                        </a-card>
                    </a-col>
                </a-row>
            </section>

            <section class="download-section" ref="downloadSection">
                <div class="download-bg">
                    <div class="wave wave-1"></div>
                    <div class="wave wave-2"></div>
                    <div class="wave wave-3"></div>
                </div>
                <a-row :gutter="[48, 48]" align="middle">
                    <a-col :xs="24" :md="12">
                        <div class="visualization-content" ref="vizContent">
                            <a-typography-title class="feature-card-title" :level="2">
                                {{ t('download.title') }}
                            </a-typography-title>
                            <a-typography-paragraph class="feature-card-content"
                                style="font-size: 1.1vw; line-height: 1.6; margin: 24px 0;">
                                {{ t('download.content') }}
                            </a-typography-paragraph>
                            <div class="download-buttons">
                                <a href="https://apps.microsoft.com/detail/9pl2dshj79w7?referrer=appbadge&mode=direct" rel="nofollow" class="glow-button">
                                    <img src="https://get.microsoft.com/images/en-us%20dark.svg" alt="Microsoft Store">
                                </a>
                                <a href="https://github.com/Johnwikix/SpectrumVisualization" rel="nofollow" class="glow-button">
                                    <img src="../assets/github-mark-white.png" alt="GitHub">
                                </a>
                            </div>
                        </div>
                    </a-col>
                    <a-col :xs="24" :md="12">
                        <div class="visualization-image-wrapper" ref="vizImage">
                            <div class="viz-glow"></div>
                            <a-image :src="visualizationImage" :alt="t('download.title')" class="visualization-image" />
                        </div>
                    </a-col>
                </a-row>
            </section>
        </a-layout-content>

        <a-layout-footer class="footer">
            <div class="footer-content">
                <span>© 2025 Sennpei Studio</span>
                <span class="footer-divider">|</span>
                <span>All Rights Reserved</span>
            </div>
        </a-layout-footer>
    </a-layout>
</template>

<script setup lang="ts">
import {
    Layout as ALayout,
    LayoutContent as ALayoutContent,
    LayoutFooter as ALayoutFooter,
    Row as ARow,
    Col as ACol,
    Card as ACard,
    TypographyTitle as ATypographyTitle,
    TypographyParagraph as ATypographyParagraph,
    Carousel as ACarousel,
} from 'ant-design-vue';
import visualizationImage from '../assets/visualization.png';
import { useI18n } from 'vue-i18n';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesBackground from '../components/ParticlesBackground.vue';

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

const heroSection = ref<HTMLElement | null>(null);
const heroContent = ref<HTMLElement | null>(null);
const heroTitle = ref<HTMLElement | null>(null);
const heroSubtitle = ref<HTMLElement | null>(null);
const heroButtons = ref<HTMLElement | null>(null);
const heroVideo = ref<HTMLVideoElement | null>(null);
const videoSection = ref<HTMLElement | null>(null);
const featuresSection = ref<HTMLElement | null>(null);
const sectionHeader = ref<HTMLElement | null>(null);
const downloadSection = ref<HTMLElement | null>(null);
const scrollIndicator = ref<HTMLElement | null>(null);
const orb1 = ref<HTMLElement | null>(null);
const orb2 = ref<HTMLElement | null>(null);
const orb3 = ref<HTMLElement | null>(null);
const note1 = ref<HTMLElement | null>(null);
const note2 = ref<HTMLElement | null>(null);
const note3 = ref<HTMLElement | null>(null);
const note4 = ref<HTMLElement | null>(null);
const vizContent = ref<HTMLElement | null>(null);
const vizImage = ref<HTMLElement | null>(null);

const titleChars = computed(() => t('hero.title').split(''));

const features = computed(() => [
    {
        title: t('features.feature1.title'),
        content: t('features.feature1.content'),
        image: t('img.pic1')
    },
    {
        title: t('features.feature2.title'),
        content: t('features.feature2.content'),
        image: t('img.pic2')
    },
    {
        title: t('features.feature3.title'),
        content: t('features.feature3.content'),
        image: t('img.pic3')
    },
    {
        title: t('features.feature4.title'),
        content: t('features.feature4.content'),
        image: t('img.pic4')
    }
]);

const handleCardHover = (event: MouseEvent, isEnter: boolean) => {
    const card = event.currentTarget as HTMLElement;
    if (isEnter) {
        gsap.to(card, {
            scale: 1.02,
            rotationY: 5,
            rotationX: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    } else {
        gsap.to(card, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
};

onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from(['.title-char',heroSubtitle.value, heroButtons.value,scrollIndicator.value,], {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.08,
        duration: 0.8
    })


    .from([orb1.value, orb2.value, orb3.value], {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    }, '-=0.8')
    .from([note1.value, note2.value, note3.value, note4.value], {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1
    }, '-=0.5');

    gsap.to([orb1.value, orb2.value, orb3.value], {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to([note1.value, note2.value, note3.value, note4.value], {
        y: 'random(-40, 40)',
        x: 'random(-30, 30)',
        rotation: 'random(-15, 15)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
            each: 0.5,
            from: 'random'
        }
    });

    if (videoSection.value) {
        gsap.from(videoSection.value, {
            scrollTrigger: {
                trigger: videoSection.value,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 0.8
        });
    }

    if (sectionHeader.value) {
        gsap.from(sectionHeader.value, {
            scrollTrigger: {
                trigger: featuresSection.value,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.8
        });
    }

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            rotateY: -15,
            duration: 0.6,
            delay: index * 0.1
        });
    });

    if (vizContent.value) {
        gsap.from(vizContent.value, {
            scrollTrigger: {
                trigger: downloadSection.value,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -60,
            duration: 0.8
        });
    }

    if (vizImage.value) {
        gsap.from(vizImage.value, {
            scrollTrigger: {
                trigger: downloadSection.value,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: 60,
            duration: 0.8
        });
    }

    gsap.to('.scroll-indicator', {
        scrollTrigger: {
            trigger: heroSection.value,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        opacity: 0,
        y: -30
    });

    if (heroSection.value && videoSection.value) {
        gsap.fromTo(heroSection.value, 
            {
                opacity: 1,
                y: 0
            },
            {
                scrollTrigger: {
                    trigger: heroSection.value,
                    start: 'center top',
                    end: 'bottom top',
                    scrub: 1
                },
                opacity: 0,
                y: 100
            }
        );
    }

    if (heroContent.value && videoSection.value) {
        gsap.fromTo(heroContent.value,
            {
                opacity: 1,
                y: 0,
                scale: 1
            },
            {
                scrollTrigger: {
                    trigger: heroSection.value,
                    start: 'center top',
                    end: 'bottom top',
                    scrub: 1
                },
                opacity: 0,
                y: 80,
                scale: 0.95
            }
        );
    }

    const heroElements = [heroSubtitle.value, heroButtons.value, scrollIndicator.value].filter(Boolean);
    if (heroElements.length > 0 && videoSection.value) {
        gsap.fromTo(heroElements,
            {
                opacity: 1,
                y: 0
            },
            {
                scrollTrigger: {
                    trigger: heroSection.value,
                    start: 'center top',
                    end: 'bottom top',
                    scrub: 1
                },
                opacity: 0,
                y: 50,
                stagger: 0.1
            }
        );
    }

    if (videoSection.value && featuresSection.value) {
        gsap.fromTo(videoSection.value,
            {
                opacity: 1,
                y: 0
            },
            {
                scrollTrigger: {
                    trigger: videoSection.value,
                    start: 'center top',
                    end: 'bottom top',
                    scrub: 1
                },
                opacity: 0,
                y: 80
            }
        );
    }

    if (featuresSection.value && downloadSection.value) {
        gsap.fromTo(featuresSection.value,
            {
                opacity: 1,
                y: 0
            },
            {
                scrollTrigger: {
                    trigger: featuresSection.value,
                    start: 'center top',
                    end: 'bottom top',
                    scrub: 1
                },
                opacity: 0,
                y: 80
            }
        );
    }
});

onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style scoped>
.app-layout {
    background-color: #0a0a0f;
    color: #eee;
    overflow-x: hidden;
}

.hero-section {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
}

.hero-carousel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.hero-carousel .carousel-arrow {
    z-index: 10;
}

.carousel-image {
    width: 100%;
    height: 100vh;
    object-fit: cover;
}

.hero-bg-orbs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.5;
}

.orb-1 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    top: 10%;
    left: 10%;
}

.orb-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #06b6d4, #3b82f6);
    top: 50%;
    right: 15%;
}

.orb-3 {
    width: 250px;
    height: 250px;
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    bottom: 10%;
    left: 30%;
}

.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    pointer-events: none;
}

.floating-note {
    position: absolute;
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.3);
    font-weight: bold;
}

.note-1 { top: 20%; left: 10%; }
.note-2 { top: 30%; right: 15%; }
.note-3 { bottom: 30%; left: 15%; }
.note-4 { bottom: 20%; right: 20%; }

.hero-content {
    position: relative;
    z-index: 20;
    max-width: 50vw;
    padding: 3vw;
    text-align: center;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    box-shadow: 
        0 0 60px rgba(99, 102, 241, 0.15),
        inset 0 0 60px rgba(99, 102, 241, 0.05);
}

.hero-title {
    color: #fff !important;
    font-size: 3.2vw !important;
    font-weight: 800 !important;
    margin-bottom: 1.5rem !important;
    perspective: 1000px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.1em;
}

.title-char {
    display: inline-block;
    color: #fff;
}

.hero-subtitle {
    font-size: 1.3vw;
    margin-top: 16px;
    color: #c9d1d9;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.glow-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.glow-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

.glow-button:hover::before {
    left: 100%;
}

.glow-button:hover {
    transform: translateY(-3px);
    box-shadow: 
        0 10px 30px rgba(99, 102, 241, 0.3),
        0 0 20px rgba(139, 92, 246, 0.2);
}

.glow-button img {
    max-width: 100%;
    height: 5vh;
    min-height: 40px;
    border-radius: 8px;
}

.scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

.mouse {
    width: 26px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    position: relative;
}

.wheel {
    width: 4px;
    height: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll 1.5s infinite;
}

@keyframes scroll {
    0% { opacity: 1; top: 8px; }
    100% { opacity: 0; top: 24px; }
}

.video-section {
    padding: 4rem 6vw;
    position: relative;
}

.video-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 
        0 0 60px rgba(99, 102, 241, 0.2),
        0 20px 60px rgba(0, 0, 0, 0.5);
}

.video-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}

.hero-video {
    width: 100%;
    border-radius: 20px;
    display: block;
}

.features-section {
    padding: 6vh 4vw;
    background: linear-gradient(180deg, #0d1117 0%, #0a0a0f 100%);
    position: relative;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-size: 2.5rem !important;
    color: #fff !important;
    margin-bottom: 1rem !important;
}

.section-subtitle {
    font-size: 1.2rem;
    color: #8b949e;
}

.feature-card {
    background: rgba(22, 27, 34, 0.8) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    color: #c9d1d9;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 100%;
    min-height: 480px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    border-radius: 16px !important;
    transform-style: preserve-3d;
    perspective: 1000px;
}

.card-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.feature-card:hover .card-glow {
    opacity: 1;
}

.feature-card :deep(.ant-card-body) {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    box-sizing: border-box;
}

.card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

.feature-card-title {
    color: #fff !important;
    font-size: 1.5rem !important;
    margin-bottom: 0.8rem !important;
    font-weight: 600 !important;
    flex-shrink: 0;
    line-height: 1.4 !important;
}

.feature-card-content {
    color: #8b949e;
    font-size: 1.1rem !important;
    line-height: 1.6;
    flex-shrink: 0;
    margin-bottom: auto;
}

.feature-image-wrapper {
    margin-top: 1.5rem;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
    flex-shrink: 0;
    width: 100%;
}

.feature-card:hover .feature-image-wrapper {
    transform: scale(1.05);
}

.feature-image {
    width: 100%;
    display: block;
}

.download-section {
    padding: 8vh 6vw;
    position: relative;
    overflow: hidden;
}

.download-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

.wave {
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
    animation: wave 15s linear infinite;
}

.wave-1 {
    top: -50%;
    left: -50%;
    animation-delay: 0s;
}

.wave-2 {
    top: -60%;
    left: -60%;
    animation-delay: -5s;
    opacity: 0.5;
}

.wave-3 {
    top: -40%;
    left: -40%;
    animation-delay: -10s;
    opacity: 0.3;
}

@keyframes wave {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.visualization-content {
    position: relative;
    z-index: 2;
}

.visualization-image-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 
        0 0 50px rgba(99, 102, 241, 0.2),
        0 20px 40px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease;
}

.visualization-image-wrapper:hover {
    transform: scale(1.02);
}

.viz-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%);
    pointer-events: none;
}

.visualization-image {
    width: 100%;
    display: block;
    border-radius: 20px;
}

.download-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
}

.footer {
    text-align: center;
    background: linear-gradient(180deg, #0a0a0f 0%, #050508 100%);
    padding: 2rem;
    color: #8b949e;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.footer-divider {
    opacity: 0.3;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem !important;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .hero-content {
        max-width: 90vw;
        padding: 1.5rem;
    }
    
    .hero-buttons {
        gap: 1rem;
    }
    
    .section-title {
        font-size: 1.8rem !important;
    }
    
    .section-subtitle {
        font-size: 1rem;
        padding: 0 1rem;
    }
    
    .orb {
        opacity: 0.3;
    }
    
    .floating-note {
        display: none;
    }
}
</style>
