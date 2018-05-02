<template>
  <div class="all_container">
    <div class='a'>
      <des-html-container :des="branch.details"></des-html-container>
    </div>
  </div>
</template>

<script>
import desHtmlContainer from '@/components/desHtmlContainer'
import { getPartyBranch } from '@/api/partyBranch'
//TODO: 观看历史数据
export default {
  data() {
    return {
      id: this.$route.params.id,
      branch: {},
    }
  },
  mounted() {
    console.log('mounted')
    this.initData() //TODO: 和 id 应该没有关系, 应该是直接把 details 值存储起来
  },
  components:{
    desHtmlContainer
},
  methods:{
    initData() {
      getPartyBranch(this.id).then(response => {
        console.log('get partyBranch success')
        console.log(response)
        this.branch = response.data
      })
    }
  } 
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>