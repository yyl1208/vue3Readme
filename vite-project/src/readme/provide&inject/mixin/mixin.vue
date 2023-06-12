<script>
export default {
  setup() {},
  data() {
    return {
      msg: 'mixin msg',
    };
  },
  methods: {
    fun1() {
      this.msg = 'mixin  fun1';
      //   console.log('mixin');
    },

    fun2() {
      this.msg = 'mixin  fun2';
      //   console.log('mixin');
    },
  },
};
</script>
