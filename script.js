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

fontFamily.addEventListener('change', function () {
  [].forEach.call(fontFamily.children, function (opt, i) {
      textPage.classList.toggle(opt.value, i == fontFamily.selectedIndex);
  });
});

let fontSize = document.getElementById('fontSize');

fontSize.addEventListener('change', function() {
  [].forEach.call(fontSize.children, function(opt, i) {
    textPage.classList.toggle(opt.value, i == fontSize.selectedIndex);
  });
  
});

btnUppercase = document.getElementById('uppercase')

btnUppercase.addEventListener('click', () => {
  if (window.getSelection().toString().length > 0) {
    textPage.textContent  = textPage.textContent.replace(window.getSelection().toString(), window.getSelection().toString().toUpperCase());
  } else if (window.getSelection().toString().length == 0) {
    textPage.textContent = textPage.textContent.toUpperCase();
  }
});

let fontColor = document.getElementById('fontColor');

fontColor.addEventListener('change', function() {
  [].forEach.call(fontColor.children, function(opt, i) {
      textPage.classList.toggle(opt.value, i == fontColor.selectedIndex);
  });
});

btnLowerCase = document.getElementById('lowercase')

btnLowerCase.addEventListener('click', () => {
  if (window.getSelection().toString().length > 0) {
    textPage.textContent  = textPage.textContent.replace(window.getSelection().toString(), window.getSelection().toString().toLowerCase());
  } else if (window.getSelection().toString().length == 0) {
    textPage.textContent = textPage.textContent.toLowerCase();
  }
});

btnCapitalize = document.getElementById('capitalize')

btnCapitalize.addEventListener('click', () => {
  if (window.getSelection().toString().length > 0) {
    textPage.textContent  = textPage.textContent.replace(window.getSelection().toString(), window.getSelection().toString().replace(/(\b\w)/gi, (c) => c[0].toUpperCase()));
  } else if (window.getSelection().toString().length == 0) {
    textPage.textContent = textPage.textContent.replace(/(\b\w)/gi, (c) => c[0].toUpperCase());
  }
});

let btnAlignLeft = document.getElementById('alignLeft');

btnAlignLeft.addEventListener('click',() => {
  textPage.style.textAlign='left';
})

let btnAlignCenter = document.getElementById('alignCenter');

btnAlignCenter.addEventListener('click',() => {
  textPage.style.textAlign='center';
})

let btnAlignRight = document.getElementById('alignRight');

btnAlignRight.addEventListener('click',() => {
  textPage.style.textAlign='right';
})

let btnAlignJustify = document.getElementById('alignJustify');

btnAlignJustify.addEventListener('click',() => {
  textPage.style.textAlign='justify';
})

let boldItalic = document.getElementById('boldItalic')

function fileImage(files){
  let file = files[0];
  let img = document.createElement('img');
  img.file = file;
  page.appendChild(img)
  let reader = new FileReader();
  reader.onload = (function(aImg) {
    return function(e) {
      aImg.src = e.target.result;
    };
  })(img);
  reader.readAsDataURL(file);
}
