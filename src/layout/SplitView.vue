<template>
  <div class="split-view">
    <div class="action">
      <slot name="action" />
    </div>

    <div class="main" @mousemove="onMouseMove" @mouseup="onMouseUp">
      <div class="pane-l" draggable="false" :style="{ width: percent + '%', padding: paddingL }">
        <slot name="left" />
      </div>
      <div
        id="resizer"
        class="resizer"
        :style="{ left: percent + '%', cursor: fixed ? 'default' : 'col-resize' }"
        draggable="false"
        @mousedown="onMouseDown"
      />
      <div
        class="pane-r"
        draggable="false"
        :style="{ width: 'calc(' + (100 - percent) + '% - 16px)', padding: paddingR }"
      >
        <slot name="right" />
      </div>
      <div v-if="active" class="splitter-mask" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplitView',
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    percent: {
      type: Number,
      default: 30
    },
    minPercent: {
      type: Number,
      default: 30
    },
    paddingL: {
      type: String,
      default: '16px'
    },
    paddingR: {
      type: String,
      default: '16px'
    }
  },
  methods: {
    onMouseDown() {
      if (this.fixed) {
        return
      }
      this.active = true
    },
    onMouseUp() {
      this.active = false
    },
    onMouseMove(e) {
      if (e.buttons === 0 || e.which === 0) {
        this.active = false
      }

      if (this.active) {
        let offset = 8
        let target = e.currentTarget
        while (target) {
          offset += target.offsetLeft
          target = target.offsetParent
        }

        const currentPage = e.pageX
        const targetOffset = e.currentTarget.offsetWidth
        const percent =
          Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100

        if (percent > this.minPercent && percent < 100 - this.minPercent) {
          this.percent = percent
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.split-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.action {
  margin-bottom: 16px;
}
.main {
  position: relative;
  width: 100%;
  height: 100%;
  .pane-l {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    padding: 16px;
    overflow-y: scroll;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  .resizer {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 16px;
    background-color: transparent;
    cursor: col-resize;
  }
  .pane-r {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    padding: 16px;
    overflow-y: scroll;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  .splitter-mask {
    z-index: 9999;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: col-resize;
  }
}
</style>
