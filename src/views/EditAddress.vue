<template>
  <div>
    <header>
      <div class="">
        <van-nav-bar class="sportshoes"
            title="编辑地址"
            left-arrow
            @click-left="goMyAddress"
            />
      </div>
    </header>
    <section>
      <van-address-edit
        :address-info="AddressInfo"
        :area-list="areaList"
        :show-postal='flase'
        show-delete
        show-set-default
        show-search-result
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </section>
  </div>
</template>

<script>
import addressList from "../data/addressList";
import api from "../api/api_zhang";
export default {
  name: "EditAddress",
  data() {
    return {
      AddressInfo:{
          name:'',
          tel:'',
          addressDetail: "",
          isDefault: "",
          areaCode: ""
      },
      flase: false,
      areaList:addressList
    };
  },
  methods: {
    goMyAddress() {
      this.$router.go(-1);
    },
    onSave(res) {
        // console.log(res)
        let id = localStorage.getItem('address-id')
        let params = {
            receiver:res.name,    
            mobile:res.tel,      
            regions:res.province + res.city + res.county,    
            address:res.addressDetail,     
            idDefault:res.isDefault
        }
        // console.log(params)
        api.reSetAddress(id,params).then(res=>{
            // console.log(res)
            this.$toast("修改成功");
            this.$router.go(-1);
        })
    },
    onDelete() {
        let id = localStorage.getItem('address-id')
        // console.log(id)
        api.DelAddress(id).then(res=>{
            this.$toast('删除成功')
            this.$router.go(-1);
        })
    },
    onChangeDetail(val) {
        
    }
  },
  mounted() {
    let id = localStorage.getItem("address-id");
    //  console.log(id)
    api.getOneAddress(id).then(res => {
    //   console.log(res.data)
      this.AddressInfo.name = res.data.receiver
      this.AddressInfo.tel = res.data.mobile
      this.AddressInfo.addressDetail = res.data.address
      this.AddressInfo.isDefault = res.data.isDefault
    });
  }
};
</script>

<style scoped>
.van-nav-bar{
    background: black;
}
.van-icon-arrow-left{
    color:whitesmoke;
}
.van-nav-bar__text{
    color: black;
}
.van-nav-bar__title{
    color: whitesmoke;
}
.arrow {
  color: whitesmoke;
  margin-left: 12px;
  margin-top: 12px;
}
</style>