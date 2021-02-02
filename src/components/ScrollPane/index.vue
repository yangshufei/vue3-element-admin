<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
const padding = 15 // tag's padding
export default {
  name: 'scrollPane',
  setup() {
    const left = ref(0)
    const scrollContainer = ref(null)
    const scrollWrapper = ref(null)
    const handleScroll = (e) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = scrollContainer.value
      const $containerWidth = $container.offsetWidth
      const $wrapper = scrollWrapper.value
      const $wrapperWidth = $wrapper.offsetWidth

      if (eventDelta > 0) {
        left.value = Math.min(0, left.value + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (left.value < -($wrapperWidth - $containerWidth + padding)) {
            left.value = left.value + 0
          } else {
            left.value = Math.max(left.value + eventDelta, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          left.value = 0
        }
      }
    }
    const moveToTarget = ($target) => {
      const $container = scrollContainer.value
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      if ($targetLeft < -left.value) {
        // tag in the left
        left.value = -$targetLeft + padding
      } else if ($targetLeft + padding > -left.value && $targetLeft + $targetWidth < -left.value + $containerWidth - padding) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        left.value = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }

    const scrollToTarget = (currentTag) => {
      const containerWidth = scrollContainer.value.offsetWidth
      const tagLeftPos = currentTag.$el.offsetLeft // tag左侧距左边距离
      const tagRightPos = currentTag.$el.offsetLeft + currentTag.$el.offsetWidth // tag右侧距右边距离
      if (-left.value > tagLeftPos) {
        left.value = 0
      }
      if (tagRightPos >= containerWidth) {
        left.value = containerWidth - tagRightPos
      }
    }

    return {
      left,
      scrollContainer,
      scrollWrapper,
      handleScroll,
      moveToTarget,
      scrollToTarget
    }
  }
}
</script>
