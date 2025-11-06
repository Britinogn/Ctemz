import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import auth from "../api/auth";

/* Public Views */
import Home from "../views/public/Home.vue";
// import Projects from "../views/public/Projects.vue";
import ProjectDetails from "../views/public/ProjectDetails.vue";
import Blogs from "../views/public/Blogs.vue";
// import BlogDetail from "../views/public/BlogDetail.vue";
// import Contact from "../views/public/Contact.vue";
import Github from "../views/public/Github.vue";

/* Admin Views */
import Login from "../views/admin/Login.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import ManageProjects from "../views/admin/manageProjects.vue";
import ManageBlogs from "../views/admin/manageBlogs.vue";
import ManageContact from "../views/admin/manageContact.vue";

/* Layouts */
import AdminLayout from "../components/layout/adminLayout.vue";

/* Fallback */
//import NotFound from "../views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  // Public
  { path: "/", name: "Home", component: Home },
  // { path: "/projects", name: "Projects", component: Projects },
  { path: "/projects/:id", name: "ProjectDetails", component: ProjectDetails },
  { path: "/blogs", name: "Blogs", component: Blogs },
  // { path: "/blogs/:id", name: "BlogDetail", component: BlogDetail },
  // { path: "/contact", name: "Contact", component: Contact },
  { path: "/github", name: "Github", component: Github },

  // Admin
  { path: "/login", name: "Login", component: Login },
  {
    path: "/dashboard",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "Dashboard", component: Dashboard },
      { path: "projects", name: "ManageProjects", component: ManageProjects },
      { path: "blogs", name: "ManageBlogs", component: ManageBlogs },
      { path: "contact", name: "ManageContact", component: ManageContact },
    ],
  },

  // Not Found
  //{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* ✅ Route Guard */
router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.isAuthenticated()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});


export default router;
