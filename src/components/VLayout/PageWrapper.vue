<template functional>
  <div :class="['page-wrapper', data.staticClass, data.class]" :style="[data.staticStyle, data.style]">
    <slot />
  </div>
</template>
