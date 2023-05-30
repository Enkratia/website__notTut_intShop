import * as v from "../vars.js";

if (v.$leaveReview) {

  // F(s)
  // **
  function checkError(elem) {
    const size = elem.querySelector(".download__file-size");
    size.innerText = "Something gone wrong ...";

    elem.classList.add("download__file--error");
  }

  // **
  function checkUpdate(elem, { loaded, total }) {
    const percent = elem.querySelector(".download__file-percent");
    const progress = elem.querySelector(".download__file-progress");

    const downloaded = ~~(loaded / total * 100) + "%";

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
      }, 300);
    }
  }

  // **
  function createLiTag({ name }) {
    const wrapper = v.$downloadingFiles.closest(".download__files-wrapper");
    wrapper.classList.add("download__files-wrapper--show");

    const regExp = /(.+)(\.\S+)$/i;
    const regExpResult = name.match(regExp);

    const fileName = (regExpResult[1].length < 14) ? regExpResult[1] : regExpResult[1].substring(0, 14);
    const ext = regExpResult[2];

    const liTag = `
                <li class="download__file">
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

  // ***
  function observeFileLoading(dropFiles) {
    const files = this ? this.files : dropFiles;

    if (!files.length) return;

    for (let i = 0; i < files.length; i++) {
      v.$downloadingFiles.insertAdjacentHTML("afterbegin", createLiTag(files[i]));
      const li = v.$downloadingFiles.firstElementChild;

      const reader = new FileReader();
      reader.readAsDataURL(files[i]);

      reader.onprogress = (e) => checkUpdate(li, e);
      reader.onerror = () => checkError(li);
    }
  }

  // ***
  function observeFiles() {
    this.nextElementSibling.click();
  }

  // L(s)
  // **
  v.$downloadBtn.addEventListener("click", observeFiles);

  // **
  v.$fileInput.addEventListener("change", observeFileLoading);


  // ==== DRAG & DROP === //
  // F(s)
  // **
  function processFiles(e) {
    e.preventDefault();
    observeFileLoading(e.dataTransfer.files)

    v.$downloadArea.classList.remove("download__area--highlight");
    v.$downloadAreaDescr.innerText = "Drag and drop here to upload";
  }

  // **
  function unHighlightArea() {
    v.$downloadArea.classList.remove("download__area--highlight");
    v.$downloadAreaDescr.innerText = "Drag and drop here to upload";
  }

  // **
  function highlightArea(e) {
    e.preventDefault();
    v.$downloadArea.classList.add("download__area--highlight");
    v.$downloadAreaDescr.innerText = "Release to upload";
  }

  // L(s)
  // **
  v.$downloadArea.addEventListener("dragover", highlightArea);
  v.$downloadArea.addEventListener("dragleave", unHighlightArea);
  v.$downloadArea.addEventListener("drop", processFiles);
}
