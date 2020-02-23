<template>
      <div class="stepper">
        <ul class="euyt46 htr6d6" role="tablist">
          <li :class="[stepper>=1?'active':'disabled',stepper>=2?'completed':'']">
            <a class="persistant-disabled" 
                href="#stepper-step-1" 
                data-toggle="tab" 
                aria-controls="stepper-step-1" role="tab" title="Step 1">
              <span class="round-tab">1</span>
            </a>
          </li>
          <li :class="[stepper>=2?'active':'disabled',stepper>=3?'completed':'']">
            <a class="persistant-disabled" href="#stepper-step-2" data-toggle="tab" aria-controls="stepper-step-2" role="tab" title="Step 2">
              <span class="round-tab">2</span>
            </a>
          </li>
          <li :class="[stepper>=3?'active':'disabled',stepper>=4?'completed':'']">
            <a class="persistant-disabled" href="#stepper-step-3" data-toggle="tab" aria-controls="stepper-step-3" role="tab" title="Step 3">
              <span class="round-tab">3</span>
            </a>
          </li>
          <li :class="[stepper>=4?'active':'disabled',stepper>=5?'completed':'']">
            <a class="persistant-disabled" href="#stepper-step-4" data-toggle="tab" aria-controls="stepper-step-4" role="tab" title="Complete">
              <span class="round-tab">4</span>
            </a>
          </li>
        </ul>
      </div>
</template>


<script>
export default {
    name: 'OrderStepper',
    props: { 
        stepper: Number,
    },
}
</script>

<style lang="scss" scoped>


</style>