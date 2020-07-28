window.addEventListener("load", () => {
  registerSW();
});
async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("../js/sw.js");
      console.log("done");
    } catch (e) {
      console.log(`SW registration failed`);
      console.log(e);
    }
  }
}
