let text = document.getElementById('text');

let btnCopy = document.getElementById('copy');
let btnCut = document.getElementById('cut');
let btnPaste = document.getElementById('paste');

function copyText() {
  let text = "";
  let activeEl = document.activeElement;
  let activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if ((activeElTagName == "textarea") && (typeof activeEl.selectionStart == "number")) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}

btnCopy.addEventListener('click', async() => {
  const val = copyText();
  if (!val) {
    return;
  }
  await navigator.clipboard.writeText(val);
});

btnCut.addEventListener('click', async() => {
  const val = copyText();
  document.execCommand('cut');
  if (!val) {
    return;
  }
  await navigator.clipboard.writeText(val);
});

btnPaste.addEventListener('click', ()=>{
  navigator.clipboard.readText()
  .then((pasteText) => {
    text.value = pasteText;
  })
})

let fontFamily = document.getElementById('fontFamily');

fontFamily.addEventListener('change', function() {
  [].forEach.call(fontFamily.children, function(opt, i) {
      text.classList.toggle(opt.value, i == fontFamily.selectedIndex);
  });
});

let fontSize = document.getElementById('fontSize');

fontSize.addEventListener('change', function() {
  [].forEach.call(fontSize.children, function(opt, i) {
      text.classList.toggle(opt.value, i == fontSize.selectedIndex);
  });
});

btnUppercase = document.getElementById('uppercase')

btnUppercase.addEventListener('click', () => {
  text.value = text.value.toUpperCase();
});

let fontColor = document.getElementById('fontColor');

fontColor.addEventListener('change', function() {
  [].forEach.call(fontColor.children, function(opt, i) {
      text.classList.toggle(opt.value, i == fontColor.selectedIndex);
  });
});

btnLowerCase = document.getElementById('lowercase')

btnLowerCase.addEventListener('click', () => {
  text.value = text.value.toLowerCase();
});

btnCapitalize = document.getElementById('capitalize')

btnCapitalize.addEventListener('click', () => {
  text.value = text.value.replace(/^\w/, (c) => c.toUpperCase());
});