<script setup lang="ts">
import PageLayout from '../components/layout/PageLayout.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import ProductShowcase from '../components/sections/ProductShowcase.vue'
import FeaturesSection from '../components/sections/FeaturesSection.vue'
import SpectrumSection from '../components/sections/SpectrumSection.vue'
import StatsSection from '../components/sections/StatsSection.vue'
</script>

<template>
  <PageLayout>
    <HeroSection />
    <ProductShowcase />
    <FeaturesSection />
    <SpectrumSection />
    <StatsSection />
  </PageLayout>
</template>
