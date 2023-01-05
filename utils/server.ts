const server = async (request: Request): Promise<Response> => {
  let { pathname } = new URL(request.url);

  if (pathname.endsWith("/")) pathname += "index.html";

  try {
    const file = await Deno.open("./static" + decodeURIComponent(pathname), {
      read: true,
    });
    const readableStream = file.readable;

    return new Response(readableStream, { status: 200 });
  } catch {
    return new Response("404 Not Found", { status: 404 });
  }
};

export default server;
