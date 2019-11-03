# OpenClipArts, a work in progress

The [oca project](https://github.com/millette/oca) is an SVG browser for the original `openclipart` project. Since <https://openclipart.org/> has been down for over 6 months, I thought I'd give it a shot. You can have a look at the demo: <http://oca.waglo.com/>.

## Requirements

### GNU/Linux / Unix-like OS

This might work on MacOS and Microsoft Windows but I haven't tested it. Let me know!

### Node.js

You'll need Node.js. The quickest way to install it for your local user is the [n-install bash script](https://github.com/mklement0/n-install).

`git` and `curl` are required for `n-install`.

```sh
curl -L https://git.io/n-install | bash
```

This will install the latest LTS, which is 12.13.0 at the time of this writing. You should restart your shell before using `node` and `npm`.

### openclipart

The project is currently using SVGs found in the [openclipart 0.18 package](https://packages.debian.org/source/jessie/openclipart). There hasn't been an update in a while (the SVGs date back to 2005) which is why I'm pointing to Debian Jessie, but later versions are identical.

The original tarball weighs in at 86 MiB, occupying 258 MiB when decompressed. Save it somewhere outside the `oca` directory. The following will create a `openclipart-0.18+dfsg/` directory:

```sh
wget -o - http://deb.debian.org/debian/pool/main/o/openclipart/openclipart_0.18+dfsg.orig.tar.gz | tar xzf -
cd openclipart-0.18+dfsg/clipart/
pwd # Note the directory [CLIPART_DIR], we'll need it later.
```

## Installation

Move outside [CLIPART_DIR] and proceed with the installation.

```sh
git clone https://github.com/millette/oca.git
cd oca
npm install
ln -s [CLIPART_DIR] # From the `openclipart` requirement above.
ln -s ../README.md pages/readme.md # Link readme page.
node scripts/index # 2 minutes to generate `metadata.json` file.
```

At this point, your directory should look like this:

```sh
ls -1F
```

### From git

- components/
- lib/
- LICENSE.txt
- next.config.js
- package.json
- package-lock.json
- pages/
- public/
- README.md
- scripts/

### Generated

- clipart@
- node_modules/
- metadata.json

## Develop

```sh
npm run dev
```

Point your browser at <http://localhost:3000/> and edit files in `components/` and `pages/` and see them live-reload.

`CTRL-C` when you're done and want to generate a production build.

## Build

You'll need a production build at some point. First, make sure `dev mode` isn't running.

```sh
npm run build
```

This will generate a complete site instance with improved performance over the dev build.

## Run

Once you have a production build, you can start it with:

```sh
npm run start
```

Point your browser at <http://localhost:3000/> and voilà, a production build! You can now proxy with through Nginx, Apache http, Caddy or your preferred web server and you're in business.

## Comments? Suggestions?

First, see if there's already a [GitHub issue](https://github.com/millette/oca/issues). You can also [email me](http://robin.millette.info/contact) if you prefer that.

Find out more about the project at our [about](/about) page.

## License

### Software

AGPL-v3 2019 © [Robin Millette](http://robin.millette.info/).

### Clip arts

Public domain 2005 by [various creators](https://openclipart.org/).
