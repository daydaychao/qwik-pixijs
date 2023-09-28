import { component$, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  useVisibleTask$(() => {});

  return <div class="text-white">players:</div>;
});
