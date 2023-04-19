<template>
  <div>
  <span id="typedwrapper">&nbsp;</span>
  </div>
</template>

<script setup>
import Typed from "typed.js";

const props = defineProps({
  typedStrings: { type: Array, default: [
    "Who is Miles Guo?", "谁是郭文贵?", "マイル・グオとは？", "Quem é Miles Guo?", "郭文貴是誰？", "¿Quién es Miles Guo?", "من هو مايلز جو؟",
    "Miles Guo คือใคร", "Vem är Miles Guo?", "Hvem er Miles Guo?", "궈원구이 누구야?", "Siapa Miles Guo?", "Miles Guo là ai?",
    "Pwy yw Miles Guo?", "Kdo je Miles Guo?", "माइल्स गुओ कौन है?", "Quis est Milo Guo?", "郭文貴喺邊個？", "Hvem er Miles Guo?", "Miles Guo kimdir?",
    "مایلز گوئو کیست؟", "Kim jest Miles Guo?", "Sino si Miles Guo?", "Cé hé Miles Guo?", "Miles Guo က ဘယ်သူလဲ။?", "Qilōni iksos Miles Guo?",
    "Qui est Miles Guo?", "Ubani uMiles Guo?", "ਮਾਈਲਸ ਗੁਓ ਕੌਣ ਹੈ?", "Wie is Miles Guo?", "Ποιος είναι ο Miles Guo?", "Wer ist Miles Guo?",
    "Kas yra Milesas Guo?", "Кто такой Майлз Го?", "Хто такий Майлз Го?", "Chi è Miles Guo?"
  ] },
  typeSpeed: { type: Number, default: 35 },
  backSpeed: { type: Number, default: 10 },
  fadeOut: { type: Boolean, default: false },
  loop: { type: Boolean, default: true },
  shuffle: { type: Boolean, default: true },
  showCursor: { type: Boolean, default: false },
  startDelay: { type: Number, default: 700 },
});

onMounted(()=>{
  let typedOptions = {
    strings: props.typedStrings,
    typeSpeed: props.typeSpeed,
    backSpeed: props.backSpeed,
    startDelay: props.startDelay,
    fadeOut: props.fadeOut,
    showCursor: props.showCursor,
    shuffle: props.shuffle,
    loop: props.loop,
  };
  let typedd = new Typed("#typedwrapper", typedOptions);
});
</script>

<style scoped>
#typedwrapper {
  font-size: 2.75rem;
  height: 2.75rem;
  display: flex;
  position: relative;
  margin-left: 1vw;
  margin-top: 1vw;
  text-shadow: 3px 3px rgb(7, 7, 7);
}
@media (max-width: 640px) {
  #typedwrapper {
    font-size: 1.75rem;
    margin-left: 1rem;
  }
}
</style>
