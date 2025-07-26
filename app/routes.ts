import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("bios", "routes/biographies.tsx"),
  route("bio/:id", "routes/biography.tsx"),
  route("bio/:biographyId/chapter/:chapterId", "routes/chapter.tsx"),
] satisfies RouteConfig;
