import { publicProcedure, router } from "../_core/trpc";
import { leadInput, submitLead } from "../leadService";

export const leadsRouter = router({
  submit: publicProcedure.input(leadInput).mutation(({ input, ctx }) => submitLead(input, ctx.req)),
});

