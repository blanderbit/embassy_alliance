<template>
  <ul class="side-nav-ca">
    <li><nuxt-link :to="localePath('clientarea')" @click.native="$emit('onClickSideLink',false)">{{$t('clientarea.my_bookings')}}</nuxt-link></li>
    <li><nuxt-link :to="localePath('clientarea') + '/upcoming-camps?a=camps'" @click.native="$emit('onClickSideLink',false)">{{$t('clientarea.upcoming_camps')}}</nuxt-link></li>
    <li><nuxt-link :to="localePath('clientarea') + '/past-camps'" @click.native="$emit('onClickSideLink',false)">{{$t('clientarea.past_camps')}}</nuxt-link></li>
    <li><nuxt-link :to="localePath('clientarea') + '/settings'" @click.native="$emit('onClickSideLink',false)">{{$t('clientarea.settings')}}</nuxt-link></li>
    <li v-if="$store.state.auth.user.referral">
      <nuxt-link :to="localePath('clientarea') + '/referrals'" @click.native="$emit('onClickSideLink',false)">{{$t('clientarea.referrals')}}</nuxt-link>
    </li>
  </ul>  
</template>

<script>
export default {
   
}
</script>

<style>
    
</style>

