import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

export async function parseMDX(source: string) {
  const compiled = String(
    await compile(source, {
      outputFormat: "function-body",
    })
  );

  const { default: Content } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return Content;
}
