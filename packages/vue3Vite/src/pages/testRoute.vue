<template>
  <div>
    <h3>1、获取 window.location.host 的值</h3>
    <div>
      <blockquote>
        {{ windowHost }}
      </blockquote>
    </div>

    <h3>2、获取 $wujie.location.host 的值</h3>
    <blockquote>
      <div>{{ wujieHost }}</div>
    </blockquote>

    <h3>3、修改 $wujie.location.href</h3>
    <a-button type="warning" @click="handleClick">跳转无极</a-button>
    <p>子应用修改 $wujie.location.href，会将当前的子应用的shadow删除并且替换成一个iframe</p>
    <blockquote>
      <div>如果子应用配置路由同步，浏览器可通过回退回到子应用</div>
    </blockquote>
  </div>
</template>

<script setup>
const windowHost = window.location.href;

const wujieHost = window?.$wujie?.location.href || `$wujie不存在`;

const handleClick = () => {
  // 应用修改 $wujie.location.href
  console.log('window.$wujie', window);
  //   window.$wujie.location.href = 'https://wujicode.cn/xy/app/prod/official/index';
};
</script>
