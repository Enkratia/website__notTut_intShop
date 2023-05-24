import * as v from "../vars.js";

const downloadBtn = v.$leaveReview.querySelector(".download__area-btn");
const fileInput = v.$leaveReview.querySelector(".download__area-btn-native");
const downloadingFiles = v.$leaveReview.querySelector(".download__files");
let elementIdx = 0;

// F(s)
// **
function checkError(elem) {
  const size = elem.querySelector(".download__file-size");
  size.innerText = "Something gone wrong.";

  elem.classList.add("download__file--error");
}

// **
function checkUpdate(elem, {loaded, total}) {
  const percent = elem.querySelector(".download__file-percent");
  const progress = elem.querySelector(".download__file-progress");

  const downloaded = ~~(loaded/total * 100) + "%";

  percent.innerText = downloaded;
  progress.style.width = downloaded;

  if (loaded === total) {
    setTimeout(() => {
      elem.classList.add("download__file--load");

      if (total < 1048576) {
        total = parseInt(total / 1024) + " KB";
      } else {
        total = parseInt(total / 1048576) + " MB";
      }

      const size = elem.querySelector(".download__file-size");
      size.innerText = total;
    }, 500);
  }
}

// **
function createLiTag({ name }) {
  const wrapper = downloadingFiles.closest(".download__files-wrapper");
  wrapper.classList.add("download__files-wrapper--show");

  const regExp = /(.+)(\.\S+)$/i;
  const regExpResult = name.match(regExp);

  const fileName = (regExpResult[1].length < 14) ? regExpResult[1] : regExpResult[1].substring(0, 14);
  const ext = regExpResult[2];

  const liTag = `
              <li class="download__file" data-progress="${elementIdx}">
                <svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                  <use href='./img/sprite.svg#file' aria-hidden='true'></use>
                </svg>

                <div class="download__file-details">

                  <!-- Dwonload file top -->
                  <div class="download__file-top">
                    <span class="download__file-name">
                      ${fileName}... ${ext}
                    </span>

                    <span class="download__file-percent"></span>
                  </div>

                  <!-- Download file bottom -->
                  <div class="download__file-bottom">
                    <div class="download__file-progressbar">
                      <div class="download__file-progress"></div>
                    </div>
                    
                    <span class="download__file-size"></span>
                  </div>
                </div>
              </li>`;

  return liTag;
}

// **
function observeFileLoading() {
  const files = this.files;

  
  for (let i = 0; i < files.length; i++) {
    downloadingFiles.insertAdjacentHTML("afterbegin", createLiTag(files[i]));
    const li = downloadingFiles.firstElementChild;

    const reader = new FileReader();
    reader.readAsDataURL(files[i]);

    reader.onprogress = (e) => checkUpdate(li, e);
    reader.onerror = () => checkError(li);

    setTimeout(() => {
      reader.abort();
    }, 100);
  }
}

// **
function observeFiles() {
  this.nextElementSibling.click();
}

// L(s)
// **
downloadBtn.addEventListener("click", observeFiles);

// **
fileInput.addEventListener("change", observeFileLoading);