# Obsidian HTTP Links Cloudflare Implementation

Obsidian offers a command `Copy Obsidian URL`, which will generate a link with the `obsidian://` scheme. It could look something like this: `obsidian://open?vault=MyVault&file=DailyNotes/2025-12-25.md`.

On some platforms, this link will "just work." On others, (e.g. Android), it will not. In some cases, even if the link _should_ work, the app it is rendered in will not show it as a link so that you can actually click it, which is almost just as useless.

Enter the Obsidian HTTP Links project, which makes it possible to create an HTTPS scheme URL Enter the Obsidian HTTP Link Plugin. It creates a link that uses the `https://` scheme which will be recognized and functional on almost any device!

## How does it work?

The HTTP link must point _somewhere_ and by default it points to a publically accessible version of the [Obsidian HTTP Links](https://github.com/kennethac/obsidian-http-links) project at https://obsidian-links.kennethchristensen.me.

That site is hosted on Cloudflare and has no external analytics, tracking, or dependencies. The link itself conveys no information about your file (except the title, of course) and the file itself can only be opened if one is in possession of your Obsidian vault. Your information is safe and private.

In case you still don't want to share that though, you can easily deploy your own (free) version of the site by following these instructions:

### Setting up your own deployment

> [!NOTE]
> I have a separate, less-maintained project that allows you to host the website in Docker on a platform of your choosing called [Obsidian Link Maker](https://github.com/kennethac/obsidian-link-maker). If you do not want to use Cloudflare, you may consider trying your hand with that.

1. Create your [Cloudflare account](https://developers.cloudflare.com/). The free tier is awesome!
2. Fork this repository
3. In your fork, create [GitHub Actions secrets](https://docs.github.com/en/actions/how-tos/security-for-github-actions/security-guides/using-secrets-in-github-actions) called [CLOUDFLARE_ACCOUNT_ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [CLOUDFLARE_API_TOKEN](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/). The token needs to have the basic workers' scopes.
4. In your fork, update `wrangler.jsonc` to remove the `routes` key or update it to a domain in a Cloudflare zone.

GitHub actions should now automatically deploy your site when you push to `main`!

## Usage with the Obsidian HTTP Link Plugin

While you can use the `Copy Obsidian URL` command and then manually generate the link by using the form found in [the web interface](https://obsidian-links.kennethchristensen.me), an even more convenient option is to install the Obsidian [HTTP Links Plugin](https://github.com/kennethac/obsidian-http-links-plugin), which adds a new command `Copy HTTP Obsidian URL` in all the same places as the default command, but which copies the HTTP version instead.

If you are running your own deployment of the HTTP Links project, you'll need to update your plugin settings in Obsidian to use your deployment.