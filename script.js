let textPage = document.getElementById('page');

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
    textPage.value = pasteText;
    page.innerHTML += pasteText
  })
})

document.querySelector("div[contenteditable]").addEventListener("paste", function(e) {
  e.preventDefault();
  var textTest = e.clipboardData.getData("text/plain");
  document.execCommand("insertHTML", false, textTest);
});

let fontFamily = document.getElementById('fontFamily');

window.onload = changeFontFamily();

function changeFontFamily() {
  [].forEach.call(fontFamily.children, function (opt, i) {
      textPage.classList.toggle(opt.value, i == fontFamily.selectedIndex);
  });
}

fontFamily.addEventListener('change', function () {
  [].forEach.call(fontFamily.children, function (opt, i) {
      textPage.classList.toggle(opt.value, i == fontFamily.selectedIndex);
  });
});

let fontSize = document.getElementById('fontSize');

fontSize.addEventListener('change', function() {
  [].forEach.call(fontSize.children, function(opt, i) {
    console.log(textPage)
      textPage.classList.toggle(opt.value, i == fontSize.selectedIndex);
  });
});

btnUppercase = document.getElementById('uppercase')

btnUppercase.addEventListener('click', () => {
  textPage.textContent = textPage.textContent.toUpperCase();
});

let fontColor = document.getElementById('fontColor');

fontColor.addEventListener('change', function() {
  [].forEach.call(fontColor.children, function(opt, i) {
      textPage.classList.toggle(opt.value, i == fontColor.selectedIndex);
  });
});

btnLowerCase = document.getElementById('lowercase')

btnLowerCase.addEventListener('click', () => {
  textPage.textContent = textPage.textContent.toLowerCase();
});

btnCapitalize = document.getElementById('capitalize')

btnCapitalize.addEventListener('click', () => {
  textPage.textContent = textPage.textContent.replace(/(\b\w)/gi, (c) => c[0].toUpperCase());
});
