import type { APIContext } from "astro";
import { feedResponse } from "../utils/feed.ts";

export const prerender = true;

export const GET = (context: APIContext) => feedResponse(context, "en");
