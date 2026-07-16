import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/pages/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Orbit X — Web, Social, Design & Video for Growing Businesses" },
      {
        name: "description",
        content:
          "Digital agency helping small and medium businesses grow through web development, social media, graphic design and video editing.",
      },
    ],
  }),
  component: Home,
});
