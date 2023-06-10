const blogSidebarWrapper = document.querySelector(".blog__sidebar-wrapper");

if (blogSidebarWrapper) {

  const blogSidebarBtn = document.querySelector(".blog__sidebar-btn");
  const blogSidebarclose = blogSidebarWrapper.querySelector(".blog__sidebar-wrapper-close");

  // F(s)
  // **
  function hideBlogSidebar() {
    blogSidebarWrapper.classList.remove("blog__sidebar-wrapper--show");
    document.body.classList.remove("overflow-hidden");
  }

  // **
  function showBlogSidebar() {
    blogSidebarWrapper.classList.add("blog__sidebar-wrapper--show");
    document.body.classList.add("overflow-hidden");
  }

  // L(s)
  // **
  blogSidebarBtn.addEventListener("click", showBlogSidebar);

  // **
  blogSidebarclose.addEventListener("click", hideBlogSidebar);
}


