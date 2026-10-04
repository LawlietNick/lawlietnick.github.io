import type { APIContext } from "astro";
import { feedResponse } from "../utils/feed.ts";

// The previous site published its feed here; serve the same Atom feed so subscribers keep it.
export const prerender = true;

export const GET = (context: APIContext) => feedResponse(context, "en");
