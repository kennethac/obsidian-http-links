/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const pathRegex = /^\/v\/([^/]+)\/r\/(.+)$/;

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method !== 'GET') {
			return new Response('Method Not Allowed', { status: 405 });
		}
		const url = new URL(request.url);
		const pathName = url.pathname;
		console.log(`Received request for path: ${pathName}`);
		const match = pathName.match(pathRegex);

		if (match) {
			const vaultName = match[1];
			const file = match[2];
			const obsidianUrl = `obsidian://open?vault=${vaultName}&file=${file}`;
			console.log(`Redirecting to Obsidian URL: ${obsidianUrl}`);
			return Response.redirect(obsidianUrl, 302);
		} else {
			return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
