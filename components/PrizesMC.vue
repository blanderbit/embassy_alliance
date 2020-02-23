<template>
    <!-- prizes -->
                <div>
                  <h2>{{header}}</h2>
                   <div class="b06_in2">
                    <div class="prizes-grid">
                      <div class="col0 place1_col0">
                        <div class="b06_in2_b1">
                          <div class="b06_in2_b1_abs">
                            <img src="/img/ico_1place.png" alt="" />
                          </div>
                          <div class="img-holder" style="background-image: url('/img/prize_1.jpg')" />
                          <div class="b06_in2_sb1">
                            <p class="b06_in2_tx1">
                              {{$t('landingCommon.prizes.first.header')}}
                            </p>
                            <p class="b06_in2_tx2">
                              {{$t('landingCommon.prizes.first.body')}}
                            </p>
                          </div>
                        </div>
                      </div>
                        <div class="col0 place2_col0">
                        <div class="b06_in2_b1">
                          <div class="b06_in2_b1_abs">
                            <img src="/img/ico_2place.png" alt="">
                          </div>
                          <div class="img-holder" style="background-image: url('/img/b04_pic2.jpg')" />
                          <div class="b06_in2_sb1">
                            <p class="b06_in2_tx1">
                              {{$t('landingCommon.prizes.second.header')}}
                            </p>
                            <p class="b06_in2_tx2">
                              {{$t('landingCommon.prizes.second.body')}}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col0 place3_col0">
                        <div class="b06_in2_b1">
                          <div class="b06_in2_b1_abs">
                            <img src="/img/ico_3place.png" alt="">
                          </div>
                          <div class="img-holder" style="background-image: url('/img/klcc.jpeg')" />
                          <div class="b06_in2_sb1">
                            <p class="b06_in2_tx1">
                              {{$t('landingCommon.prizes.third.header')}}
                              </p>
                            <p class="b06_in2_tx2">
                              {{$t('landingCommon.prizes.third.body')}}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /prizes -->
</template>

<script>
export default {
    name: 'PrizesMC',
  props: { 
      header: String,
      //isOpen: Boolean,
      },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.b06_in2{
  margin-top: 10px;
}

</style>
