<template>
  <div class="components-container">
    <a-row type="flex">
      <a-col span="12">
        <a-button type="primary">{{ $t('New') }}</a-button>
        <a-button style="margin-left: 8px;">Primary</a-button>
      </a-col>
      <a-col span="12">
        <a-input-search placeholder="input search text" enter-button />
      </a-col>
    </a-row>
    <split-pane split="vertical" style="margin-top: 16px; height: 100vh" @resize="resize">
      <template slot="paneL">
        <div class="left-container" />
      </template>
      <template slot="paneR">
        <div class="right-container" />
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
export default {
  name: '',
  components: { splitPane },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style lang="less" scoped>
.components-container {
  position: relative;
  margin: 0;
  /deep/ .splitter-pane-resizer.vertical {
    margin: 0;
    width: 8px;
    background-color: rgb(240, 242, 245);
    border: none;
    opacity: 1;
  }

  /deep/ .splitter-pane.vertical.splitter-paneL {
    padding: 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-radius: 4px;
  }

  /deep/ .splitter-pane.vertical.splitter-paneR {
    padding: 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-radius: 4px;
  }
}

.left-container {
  background-color: #fff;
  height: 100%;
}

.right-container {
  background-color: #fff;
  height: 100%;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
</style>
