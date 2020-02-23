<template>
<section class="b06">
  <div class="container">
    <p class="b01_in2_tx1">{{$t('landingCommon.prizes.main_header')}}</p>
    <div class="flex flex-justify">
      <div class="col6">
        <p class="b06_in1_tx1">
          {{$t('landingCommon.prizes.main_desc')}}
        </p>
      </div>
      <div class="col5">
        <p class="b06_in1_tx2">{{$t('landingCommon.prizes.main_header2')}}</p>
        <p class="b06_in1_tx1">
          {{$t('landingCommon.prizes.main_desc2')}}
        </p>
      </div>
    </div>
    <div class="b06_in2">
      <div class="prizes-grid">
        <div class="col0 place1_col0">
          <div class="b06_in2_b1">
            <div class="b06_in2_b1_abs">
              <img src="/img/ico_1place.png" alt="">
            </div>
            <img class="prize_pic" src="/img/prize_1.jpg" alt="">
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
            <img class="prize_pic" src="/img/b04_pic2.jpg" alt="">
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
            <img class="prize_pic" src="/img/klcc.jpeg" alt="">
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
</section>
</template>

<script>
export default {
  name: 'Prizes',
}
</script>