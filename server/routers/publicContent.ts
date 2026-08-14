import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getPublicPageBySlug, listActiveAwards, listActiveReviews, listPublicArticles, listPublicPages, listPublicSettings } from "../cmsDb";

const pageType = z.enum(["solution", "loan_type", "location", "article", "broker", "standard"]);

export const publicContentRouter = router({
  pageBySlug: publicProcedure.input(z.object({ slug: z.string().min(1).max(220) })).query(({ input }) => getPublicPageBySlug(input.slug)),
  pages: publicProcedure.input(z.object({ pageType: pageType.optional() }).optional()).query(({ input }) => listPublicPages(input?.pageType)),
  articles: publicProcedure.query(() => listPublicArticles()),
  awards: publicProcedure.query(() => listActiveAwards()),
  reviews: publicProcedure.input(z.object({ placement: z.string().max(160).optional() }).optional()).query(({ input }) => listActiveReviews(input?.placement)),
  settings: publicProcedure.query(() => listPublicSettings()),
  tracking: publicProcedure.query(() => listPublicSettings("analytics")),
});
